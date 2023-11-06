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

  const myHashtagQuery = useQuery(['MyHashtag'], () => getHashtagFrequency());
  const hashtagQuery = useQuery(['Hashtag'], () => getHashtagTrends());

  const {data: myTagData, isSuccess: myHashtagSuccess} = myHashtagQuery;
  const {data: tagData, isSuccess: hashtagSuccess} = hashtagQuery;

  /* TagChart의 데이터가 없는 경우 아예 렌더링 되지 않는 방식.
  추후 skeleton을 추가해 falsy한 data일 경우에도 Chart 자체가 렌더링될 수 있도록 변경 예정. */
  return (
    <View style={styles.block}>
      <Header title="통계"></Header>
      <ScrollView style={styles.contents}>
        <View style={styles.container}>
          {myHashtagSuccess && (
            <TagListChart title="내 태그" data={myTagData}></TagListChart>
          )}
        </View>
      </ScrollView>
      <ScrollView style={styles.contents}>
        <View style={styles.container}>
          {hashtagSuccess && (
            <TagListChart title="이달의 태그" data={tagData}></TagListChart>
          )}
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
