import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';

import Video from 'react-native-video';

device_width = Dimensions.get('window').width;
device_height = Dimensions.get('window').height;

images_data = [
  {
    description: 'KABA',
    path: require('./assets/SampleJPGImage_10mbmb.jpg'),
    type: 'image',
  },
  {
    description: 'KASA',
    path: require('./assets/SamplePNGImage_10mbmb.png'),
    type: 'image',
  },
  {description: 'KAKAKA', path: require('./assets/fsfs.mp4'), type: 'video'},
  {
    description: 'AMCA',
    path: require('./assets/sample-jpg-file-for-testing.jpg'),
    type: 'image',
  },
  {
    description: 'DAYI',
    path: require('./assets/SampleJPGImage_10mbmb.jpg'),
    type: 'image',
  },
  {
    description: 'FENA',
    path: require('./assets/SamplePNGImage_10mbmb.png'),
    type: 'image',
  },
  {
    description: 'CANO',
    path: require('./assets/sample-jpg-file-for-testing.jpg'),
    type: 'image',
  },
  {
    description: 'KİLO',
    path: require('./assets/SampleJPGImage_10mbmb.jpg'),
    type: 'image',
  },
  {
    description: 'ELEK',
    path: require('./assets/SamplePNGImage_10mbmb.png'),
    type: 'image',
  },
  {
    description: 'KELEK',
    path: require('./assets/sample-jpg-file-for-testing.jpg'),
    type: 'image',
  },
  {description: 'AAAAAAAA', path: require('./assets/fsfs.mp4'), type: 'video'},
];

function MainScreen(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchLayout, setsearchLayout] = useState(false);

  function Swiper(props) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}>
        <View style={styles.wrap}>
          <Image
            resizeMode="stretch"
            style={styles.wrap}
            source={props.firstImage}
          />
        </View>
        <View style={styles.wrap}>
          <Image
            resizeMode="stretch"
            style={styles.wrap}
            source={props.secondImage}
          />
        </View>
      </ScrollView>
    );
  }

  function VideoComponent(props) {
    return (
      <Video
        source={props.moduleVideo}
        resizeMode="stretch"
        paused={false}
        style={{width: device_width, height: device_height * 0.3}}
        repeat={true}
      />
    );
  }

  function GridImage(props) {
    return (
      <View style={{flex: 1 / 3, height: device_height * 0.1}}>
        <Image
          style={{height: device_height * 0.1, width: device_width / 3}}
          source={props.imageList}
        />
      </View>
    );
  }

  function GridVideoComponent(props) {
    return (
      <Video
        source={props.moduleVideo}
        resizeMode="stretch"
        paused={false}
        style={{flex: 1 / 3, height: device_height * 0.1}}
        repeat={true}
      />
    );
  }

  const ItemView = ({item, index}) => {
    flag = 0;
    item.type == 'image' ? (flag = 0) : (flag = 1);
    return flag ? (
      <VideoComponent moduleVideo={item.path}></VideoComponent>
    ) : (
      <Swiper firstImage={item.path} secondImage={item.path}></Swiper>
    );
  };

  const GridItemView = ({item, index}) => {
    flag = 0;
    item.type == 'image' ? (flag = 0) : (flag = 1);
    console.log(item);
    return flag ? (
      <GridVideoComponent moduleVideo={item.path} />
    ) : (
      <GridImage imageList={item.path} />
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{height: 20, width: '100%', backgroundColor: 'white'}}></View>
    );
  };

  let newData;

  function startFilter(item) {
    if (item == '') {
      setsearchLayout(false);
      setSearch('');
    } else {
      setsearchLayout(true);
      searchFilter(item);
      setFilteredData(newData);
    }
  }
  const searchFilter = text => {
    console.log('Text :', text);
    if (text) {
      newData = images_data.filter(item => {
        let itemData;
        if (item.type === 'image') {
          itemData = item.description
            ? item.description.toUpperCase()
            : ''.toUpperCase();
        } else {
          return true;
        }
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 0.4,
          marginTop: 8,
          marginBottom: 20,
          borderRadius: 15,
          marginHorizontal: 16,
          textAlign: 'center',
        }}
        value={search}
        placeholder="Search Here"
        underlineColorAndroid="transparent"
        onChangeText={text => startFilter(text)}
      />
      {searchLayout ? (
        <FlatList
          data={filteredData}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={GridItemView}
          showsVerticalScrollIndicator={false}
          key={3}></FlatList>
      ) : (
        <FlatList
          data={images_data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}></FlatList>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {width: device_width, height: device_height * 0.3},
});

export {MainScreen};
