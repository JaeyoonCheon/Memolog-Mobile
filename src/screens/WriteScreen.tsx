import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from 'navigation';
import Header from '@components/headers/Header';
import {writeDocument} from '@api/document';
import {MaterialIconButton} from '@components/buttons/IconButton';
import useUser from '@/hooks/useUser';

const imgRegex = /<img.*?src=["|'](.*?)["|']/gm;
const hashtagRegex = /#([0-9a-zA-Z가-힣]*)/g;

const WriteScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  const richText = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);

  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [hashtagString, setHashtagString] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const user = useUser();

  const {mutate: writeMutate, isLoading} = useMutation(writeDocument, {
    onSuccess: () => {
      setIsSubmit(false);
      console.log('Finished!');
      queryClient.invalidateQueries(['Documents']);
      navigation.navigate('MainTab');
    },
    onError: () => {
      console.log('error');
    },
  });

  const onPressAddImage = useCallback(async () => {
    const image = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: Platform.OS === 'android',
    });
    if (!image.assets || !richText.current) {
      return;
    }
    richText.current.insertImage(image.assets[0].uri, 'image');
  }, [richText]);

  let handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];

    richText.current?.setFontSize(5);
  }, []);

  useEffect(() => {
    if (isSubmit === true) {
      const scope = isPrivate ? 'private' : 'public';

      // 타입 에러만 처리한 임시 수정
      writeMutate({
        title,
        form: contents,
        userId: String(user?.user.id),
        scope,
        thumbnail_url: thumbnailUrl,
        created_at: new Date(),
        hashtags,
      });
    }
  }, [isSubmit]);

  const onSubmit = async () => {
    const usedImageNodes = contents.match(imgRegex);
    const matchedHashtags = hashtagString.match(hashtagRegex);
    const hashtagsArray =
      matchedHashtags && matchedHashtags.map(tag => tag.slice(1));

    const hashtagsUnique = hashtagsArray
      ? hashtagsArray
          .filter((v, i) => hashtagsArray.indexOf(v) === i)
          .filter(tag => !!tag)
      : [];

    setHashtags(hashtagsUnique);

    try {
      if (usedImageNodes) {
        const usedImages = usedImageNodes.map(x =>
          x.replace(/.*src="([^"]*)".*/, '$1'),
        );
        const imageUrls: string[] = [];

        await Promise.all(
          usedImages.map(async imagePath => {
            const fileNameRegex = /\/([^/]+)$/;
            const matchedFileName = imagePath.match(fileNameRegex);
            if (matchedFileName) {
              const fileName = matchedFileName[1];
              const uploadImageRef = storage().ref(fileName);

              await uploadImageRef.putFile(imagePath);
              const downloadUrl = await uploadImageRef.getDownloadURL();
              imageUrls.push(downloadUrl);

              setContents(contents.replace(imagePath, downloadUrl));
            }
          }),
        );

        setThumbnailUrl(imageUrls[0]);
      }
      setIsSubmit(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeHTML = (html: string) => {
    setContents(html);
  };

  // 에디터 스크롤을 위한 커서 조정
  const handleCursorPosition = useCallback((scrollY: number) => {
    scrollRef.current &&
      scrollRef.current.scrollTo({
        y: scrollY - 30,
        animated: true,
      });
  }, []);

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
        rightButtons={
          <TouchableOpacity onPress={() => onSubmit()}>
            <Text>등록</Text>
          </TouchableOpacity>
        }></Header>
      <ScrollView
        style={styles.editorWrapper}
        ref={scrollRef}
        nestedScrollEnabled={true}
        keyboardDismissMode={'none'}>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력해주세요."
          value={title}
          onChangeText={setTitle}></TextInput>
        <RichEditor
          style={styles.editor}
          editorStyle={{contentCSSText: `padding-left:16px; font-size:16px`}}
          ref={richText}
          initialContentHTML={contents}
          initialHeight={600}
          placeholder="내용을 입력해주세요."
          useContainer={true}
          onChange={onChangeHTML}
          onCursorPosition={handleCursorPosition}
          originWhitelist={['file://']}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
        />
      </ScrollView>
      <View style={styles.footerToast}>
        <TextInput
          style={styles.hashtagInput}
          placeholder="해시태그 추가 (#단어)"
          value={hashtagString}
          onChangeText={setHashtagString}></TextInput>
        <BouncyCheckbox
          style={styles.checkbox}
          size={20}
          fillColor="#22BCCE"
          text="비밀글"
          iconStyle={{borderRadius: 5}}
          innerIconStyle={{borderRadius: 5}}
          textStyle={{textDecorationLine: 'none', fontSize: 16}}
          textContainerStyle={{
            marginLeft: 8,
          }}
          isChecked={isPrivate}
          onPress={() => setIsPrivate(!isPrivate)}></BouncyCheckbox>
      </View>
      <RichToolbar
        editor={richText}
        onPressAddImage={onPressAddImage}
        actions={[
          actions.undo,
          actions.redo,
          actions.insertVideo,
          actions.insertImage,
          actions.setStrikethrough,
          actions.checkboxList,
          actions.insertOrderedList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.code,
          actions.line,
          actions.foreColor,
          actions.hiliteColor,
          actions.heading1,
          actions.heading4,
        ]}
        fontSize={handleFontSize}></RichToolbar>
    </View>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  editorWrapper: {
    flex: 1,
  },
  titleInput: {
    height: 60,
    paddingHorizontal: 16,

    fontSize: 21,
  },
  editor: {
    flex: 1,
  },
  footerToast: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',

    borderTopWidth: 1,
    borderColor: '#C4C7C7',
  },
  hashtagInput: {
    flex: 1,
    padding: 8,
  },
  checkbox: {
    paddingHorizontal: 12,
    marginVertical: 4,
  },
});
