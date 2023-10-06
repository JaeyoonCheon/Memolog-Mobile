import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHTML from 'react-native-render-html';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList, RootTabParamList} from 'navigation';
import Header from '@components/headers/Header';
import KebabButton from '@components/buttons/KebabButton';
import {getDocument, deleteDocument} from '@api/document';
import {MaterialIconButton} from '@components/buttons/IconButton';
import useUser from '@/hooks/useUser';

const DocumentDetailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const queryCilent = useQueryClient();
  const {width} = useWindowDimensions();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const {id} = params;

  const user = useUser();

  let kebabItems = [{label: '검색', value: 'Search', action: () => {}}];

  const {
    data: contents,
    isSuccess,
    isFetched,
  } = useQuery(['Document', id], () => getDocument(id));
  const {mutate: deleteMutate} = useMutation(deleteDocument, {
    onSuccess: () => {
      queryCilent.invalidateQueries(['Documents']);
      navigation.navigate('MainTab');
    },
    onError: () => {
      console.log('error');
    },
  });

  if (isSuccess) {
    console.log(contents);

    if (user && Number(contents.userId) === user.user.id) {
      kebabItems = [
        {label: '검색', value: 'Search', action: () => {}},
        {
          label: '편집',
          value: 'Modify',
          action: () =>
            navigation.navigate('Modify', {
              id: id,
              documentData: contents,
            }),
        },
        {
          label: '삭제',
          value: 'Delte',
          action: () => deleteMutate(id),
        },
      ];
    }
  }

  return (
    <View style={styles.block}>
      <Header
        leftButtons={
          <MaterialIconButton
            iconName="arrow-back"
            size={24}
            color="#000000"
            onPress={() => navigation.goBack()}></MaterialIconButton>
        }
        rightButtons={<KebabButton items={kebabItems}></KebabButton>}></Header>
      <ScrollView style={styles.contentBlock}>
        <View style={styles.topIndicator}>
          <MaterialIcons
            style={styles.scope}
            name="lock-outline"
            size={20}
            color="#000000"></MaterialIcons>
        </View>
        <Text style={styles.title}>{contents?.title}</Text>
        {isSuccess && (
          <View style={styles.form}>
            <RenderHTML
              baseStyle={{fontSize: 16, color: '#000000'}}
              contentWidth={width}
              source={{html: contents.form}}></RenderHTML>
          </View>
        )}
        <View style={styles.footer}>
          <View style={styles.hashtagBlock}>
            {isSuccess &&
              contents?.hashtags &&
              contents?.hashtags.map(hashtag => (
                <Text
                  style={styles.hashtag}
                  key={hashtag}>{`#${hashtag}`}</Text>
              ))}
          </View>
          <Text style={styles.createdAt}>
            {isSuccess && new Date(contents.created_at).toISOString()}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DocumentDetailScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  contentBlock: {
    marginBottom: 32,
    paddingHorizontal: 16,

    backgroundColor: '#FFFFFF',
  },
  topIndicator: {},
  scope: {
    alignSelf: 'flex-end',
  },
  title: {
    marginVertical: 4,

    fontSize: 21,
    color: '#000000',
  },
  form: {
    paddingVertical: 4,
    marginBottom: 16,
  },
  footer: {},
  hashtagBlock: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  hashtag: {
    marginRight: 4,

    color: '#22BCCE',
  },
  createdAt: {
    fontSize: 12,
  },
});
