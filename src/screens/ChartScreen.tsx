import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';

import {RootStackParamList} from 'navigation';
import Header from '@components/headers/Header';
import {getHashtagFrequency, getHashtagTrends} from '@api/statistics';
import TagListChart from '@components/charts/hashtags/TagListChart';

const ChartScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {data: myTagData} = useQuery(['MyHashtag'], () =>
    getHashtagFrequency(),
  );
  const {data: tagData} = useQuery(['Hashtag'], () => getHashtagTrends());

  console.log(myTagData);
  console.log(tagData);

  return (
    <View style={styles.block}>
      <Header title="통계"></Header>
      <ScrollView style={styles.contents}>
        <View style={styles.container}>
          <TagListChart
            title="내 해시태그"
            data={myTagData.result}></TagListChart>
        </View>
      </ScrollView>
      <ScrollView style={styles.contents}>
        <View style={styles.container}>
          <TagListChart
            title="이달의 해시태그"
            data={tagData.result}></TagListChart>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  contents: {},
  container: {
    paddingVertical: 12,
    marginHorizontal: 12,
  },
});
