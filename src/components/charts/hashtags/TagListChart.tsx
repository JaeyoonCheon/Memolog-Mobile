import React, {ComponentType} from 'react';
import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';

import RankCard from '../../cards/RankCard';

interface TagList {
  id: string;
  name: string;
}
interface TagListChartProps {
  data: TagList[];
  title: string;
}

const TagListChart = ({data, title}: TagListChartProps) => {
  return (
    <View style={styles.block}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>
          TOP <Text style={styles.titleNumber}>10</Text>
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item, index}) =>
          index < 3 ? (
            <RankCard
              isPrimary
              rankNumber={index + 1}
              label={'#' + item.name}></RankCard>
          ) : (
            <RankCard rankNumber={index + 1} label={'#' + item.name}></RankCard>
          )
        }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
        scrollEnabled={false}></FlatList>
    </View>
  );
};

export default TagListChart;

const styles = StyleSheet.create({
  block: {
    paddingVertical: 12,

    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#EFF1F1',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  titleBlock: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  titleNumber: {
    fontSize: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#22BCCE',
  },
});
