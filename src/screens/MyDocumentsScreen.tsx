import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useInfiniteQuery} from '@tanstack/react-query';

import Header from '@components/headers/Header';
import CardList from '@components/cards/CardList';
import FlatCardList from '@components/cards/FlatCardList';
import {getDocuments} from '@api/document';
import {
  MaterialIconButton,
  MaterialCommunityIconButton,
} from '@components/buttons/IconButton';
import Dropdown from '@components/dropdowns/Dropdown';
import ToggleButton from '@components/buttons/ToggleButton';
import useDropdown from '@hooks/useDropdown';
import {RootStackParamList} from 'navigation';
import {CardItemProps} from 'card';
import {useAppSelector} from '@/redux/hooks';

const MyDocumentsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {user} = useAppSelector(state => state.user);

  const sortItems = [
    {label: '작성일', value: 'created_at'},
    {label: '마지막 수정', value: 'updated_at'},
    {label: '제목', value: 'title'},
  ];
  const {
    isOpened: sortOpened,
    selected: sortSelected,
    handleSelected: handleSort,
    handleIsOpened: handleSortOpened,
    setLayout: setSortLayout,
    dropdownButtonRef: sortRef,
    dropdownButtonFrame: sortFrame,
  } = useDropdown(sortItems);

  const orderItems = [
    {label: 'arrow-down-thin', value: 'DESC'},
    {label: 'arrow-up-thin', value: 'ASC'},
  ];
  const {selected: orderSelected, handleSelected: handleOrder} =
    useDropdown(orderItems);
  const [layout, setLayout] = useState('grid');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: documents,
    isStale,
    status,
    fetchStatus,
    isFetched,
    refetch,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['Documents', sortSelected.value, orderSelected.value],
    queryFn: ({pageParam = {id: '', cursor: ''}}) => {
      console.log(pageParam);
      return getDocuments(pageParam, sortSelected.value, orderSelected.value);
    },
    getNextPageParam: (lastPage, pages) => {
      console.log('call getNextPage');
      console.log(lastPage);
      return lastPage.length !== 0
        ? {
            id: lastPage[lastPage.length - 1].id,
            cursor:
              lastPage[lastPage.length - 1][
                `${sortSelected.value}` as keyof CardItemProps
              ],
          }
        : undefined;
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    retry: false,
    notifyOnChangeProps: ['data'],
  });

  console.log(isStale);
  console.log(status);
  console.log(`hasNextPage?? : ${hasNextPage}`);
  console.log(`hasPreviousPage?? : ${hasPreviousPage}`);

  const onPressSearch = () => {
    navigation.navigate('Search');
  };
  const onPressLayout = (style: string) => {
    setLayout(style);
  };
  const onPressCard = (id: number) => {
    navigation.navigate('Detail', {id});
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const onEndReachFetch = async () => {
    console.log('End reached');
    if (hasNextPage) {
      console.log('Has next fetch');
      await fetchNextPage();
    }
  };

  return (
    <View style={styles.block}>
      <Header
        title="내 기록"
        rightButtons={
          <>
            <MaterialCommunityIconButton
              onPress={() => navigation.navigate('Write')}
              iconName="feather"
              size={24}
              color="#000000"
              containerStyle={{marginRight: 2}}></MaterialCommunityIconButton>
            <MaterialIconButton
              onPress={onPressSearch}
              iconName="search"
              size={24}
              color="#000000"></MaterialIconButton>
          </>
        }></Header>
      <View style={styles.toolbar}>
        <View style={styles.sortOrder}>
          <Dropdown
            items={sortItems}
            selected={sortSelected}
            isOpened={sortOpened}
            setIsOpened={handleSortOpened}
            setSelected={handleSort}
            setLayout={setSortLayout}
            dropdownButtonRef={sortRef}
            dropdownButtonFrame={sortFrame}></Dropdown>
          <ToggleButton
            items={orderItems}
            selected={orderSelected}
            handleSelection={handleOrder}
            size={32}></ToggleButton>
        </View>
        <View style={styles.layout}>
          <MaterialIconButton
            containerStyle={styles.layoutButton}
            onPress={() => onPressLayout('grid')}
            iconName="grid-view"
            size={24}
            color="#000000"></MaterialIconButton>
          <MaterialIconButton
            containerStyle={styles.layoutButton}
            onPress={() => onPressLayout('list')}
            iconName="list"
            size={24}
            color="#000000"></MaterialIconButton>
        </View>
      </View>
      <View style={styles.itemsWrapper}>
        {layout === 'grid' ? (
          <CardList
            data={documents?.pages.flat() || []}
            onPressCard={onPressCard}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReachFetch}></CardList>
        ) : (
          <FlatCardList
            data={documents?.pages.flat() || []}
            onPressCard={onPressCard}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReachFetch}></FlatCardList>
        )}
      </View>
    </View>
  );
};

export default MyDocumentsScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  sortOrder: {
    flexDirection: 'row',
  },
  layout: {
    flexDirection: 'row',
  },
  layoutButton: {marginLeft: 4},
  itemsWrapper: {
    flex: 1,
    marginTop: 16,
  },
});
