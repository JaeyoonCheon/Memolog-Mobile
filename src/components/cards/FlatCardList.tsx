import {StyleSheet, FlatList} from 'react-native';
import React from 'react';

import FlatCard from './FlatCard';
import {CardListProps} from 'card';

const FlatCardList = ({
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
    renderItem={({item}) => (
      <FlatCard item={item} onPress={onPressCard}></FlatCard>
    )}
  />
);

export default FlatCardList;

const styles = StyleSheet.create({
  cardList: {
    flex: 1,
  },
});
