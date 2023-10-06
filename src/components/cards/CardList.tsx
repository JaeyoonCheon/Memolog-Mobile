import {StyleSheet, FlatList, View} from 'react-native';
import React from 'react';

import Card from './Card';
import {CardListProps} from 'card';

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
    onEndReachedThreshold={0.75}
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
