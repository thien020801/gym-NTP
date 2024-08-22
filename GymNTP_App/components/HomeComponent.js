import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { sliderImages } from '../constants/index'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }
  componentDidMount() {
    // Thiết lập interval để tự động thay đổi vị trí slider
    this.interval = setInterval(() => {
      const { currentPage } = this.state;
      let nextPage = currentPage + 1;
      if (nextPage >= sliderImages.length) {
        nextPage = 0; // Quay lại đầu nếu đến cuối danh sách
      }
      this.flatListRef.scrollToIndex({ animated: true, index: nextPage });
      this.setState({ currentPage: nextPage });
    }, 3000); // Đổi hình sau mỗi 3 giây (3000 milliseconds)
  }

  componentWillUnmount() {
    // Xóa interval khi component unmount để tránh memory leak
    clearInterval(this.interval);
  }
  renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.src} style={styles.image} />
    </View>
  );

  render() {
    return (
      <ImageBackground
        style={[styles.background, { backgroundColor: 'white' }]}
        blurRadius={70} source={require('./images/bg.png')}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style='dark' />

          {/* Slider Image */}
          <View style={styles.sliderContainer}>
            <FlatList
              ref={(ref) => { this.flatListRef = ref; }}
              data={sliderImages}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const contentOffsetX = event.nativeEvent.contentOffset.x;
                const currentPage = Math.floor(contentOffsetX / Dimensions.get('window').width);
                this.setState({ currentPage });
              }}
            />
          </View>

          {/* User Score */}
          <View style={styles.scoreContainer}>
            <FontAwesome name="fire" size={24} color="red" />
            <Text style={styles.scoreText}>Your score: 100</Text>
          </View>

          {/* About Us */}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>About Us</Text>
            <Text style={styles.aboutText}>
            Welcome to our gym! We are committed to bringing you the best workout experience.
            </Text>
          </View>

        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  sliderContainer: {
    height: Dimensions.get('window').height * 0.4,
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  scoreText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  aboutTitle: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
