import {StyleSheet, FlatList, FlatListProps, View} from 'react-native';
import React, {ReactElement} from 'react';

import Card, {CardItemProps} from './Card';

export interface CardListProps {
  data: CardItemProps[];
  onPressCard: (k: number) => void;
  onEndReached: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const CardList = ({
  data,
  onPressCard,
  onEndReached,
  onRefresh,
  refreshing,
}: CardListProps) => (
  <FlatList
    style={styles.cardList}
    contentContainerStyle={{paddingHorizontal: 8}}
    refreshing={refreshing}
    onRefresh={onRefresh}
    onEndReached={onEndReached}
    data={data}
    renderItem={({item}) => <Card item={item} onPress={onPressCard}></Card>}
    numColumns={2}
    ListEmptyComponent={
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}></View>
    }
  />
);

export default CardList;

const styles = StyleSheet.create({
  cardList: {
    flex: 1,
  },
});
