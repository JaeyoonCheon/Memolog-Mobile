import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {CardProps} from 'card';

const Card = ({item, onPress}: CardProps) => {
  return (
    <TouchableOpacity style={styles.block} onPress={() => onPress(item.id)}>
      {item?.thumbnail_url && (
        <View style={styles.imageBlock}>
          <Image
            style={styles.image}
            source={{uri: item.thumbnail_url}}></Image>
        </View>
      )}
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
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  block: {
    flex: 0.5,
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: 'column',

    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
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
  imageBlock: {
    minHeight: 150,
    resizeMode: 'cover',
  },
  image: {
    flexGrow: 1,
  },
  contents: {
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,

    overflow: 'hidden',
  },
  titleBlock: {marginBottom: 4},
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
    width: 18,
    height: 18,
    marginRight: 8,

    borderRadius: 9,
    overflow: 'hidden',
  },
  profile: {
    fontSize: 18,
    lineHeight: 18,
    color: '#000000',
  },
});
