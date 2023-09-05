import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

interface FlatCardProps {
  item: {
    id: number;
    title: string;
    form: string;
    profile_image_url?: string;
    nickname: string;
    thumbnail_url?: string;
  };
  onPress: () => void;
}

const FlatCard = ({item, onPress}: FlatCardProps) => {
  return (
    <TouchableOpacity style={styles.block} onPress={onPress}>
      <View style={styles.contents}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.bodyBlock}>
          <Text style={styles.body}>{item.form}</Text>
        </View>
        {item?.profile_image_url && (
          <View style={styles.profileBlock}>
            <Image
              style={styles.profileImage}
              source={{uri: item.profile_image_url}}></Image>
            <Text style={styles.profile}>{item.nickname}</Text>
          </View>
        )}
      </View>
      {item.thumbnail_url && (
        <Image style={styles.image} source={{uri: item.thumbnail_url}}></Image>
      )}
    </TouchableOpacity>
  );
};

export default FlatCard;

const styles = StyleSheet.create({
  block: {
    height: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',

    borderBottomWidth: 1,
    borderBottomColor: '#C4C7C7',
    backgroundColor: '#FFFFFF',
  },
  contents: {
    flex: 1,

    overflow: 'hidden',
  },
  titleBlock: {},
  title: {
    fontSize: 16,
    color: '#000000',
  },
  bodyBlock: {
    flexGrow: 1,
  },
  body: {
    fontSize: 12,
    color: '#000000',
  },
  profileBlock: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 16,
    height: 16,
    marginRight: 8,

    borderRadius: 8,
    overflow: 'hidden',
  },
  profile: {
    fontSize: 16,
    color: '#000000',
  },
  image: {
    width: 72,
    marginLeft: 12,
  },
});
