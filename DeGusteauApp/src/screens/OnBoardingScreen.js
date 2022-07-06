import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#444444', secondary: '#f5f5f5'};

const slides = [
  {
    id: '1',
    image: require('../images/1.png'),
    title: 'Welcome to the app',
    subtitle: 'This is a subtitle',
  },
  {
    id: '2',
    image: require('../images/1.png'),
    title: 'Welcome to the app 2222',
    subtitle: 'This is a subtitle',
  },
  {
    id: '3',
    image: require('../images/1.png'),
    title: 'Welcome to the app 3333',
    subtitle: 'This is a subtitle',
  },
];

const Slide = ({item}) => (
  <View style={{alignItems: 'center'}}>
    <Image
      source={item.image}
      style={{height: '45%', width, resizeMode: 'contain'}}
    />
    <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}>
      {item.title}
    </Text>
    <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}>
      {item.subtitle}
    </Text>
  </View>
);

export function OnBoardingScreen({navigation}) {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(null);

  const Footer = () => (
    <View
      style={{
        height: height * 0.25,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: 'blue',
                width: 50,
              },
            ]}></View>
        ))}
      </View>
      <View>
        {currentSlideIndex == slides.length - 1 ? (
          <View style={{height: 70}}>
            <TouchableOpacity style={[styles.btn]} onPress={() => navigation.replace('HomeRoute')}>
              <Text>Vamos cozinhar!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.btn]} onPress={skip}>
              <Text>SKIP</Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
              <Text>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
    console.log(currentSlideIndex);
  };
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{height: height * 0.95}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 10,
    backgroundColor: 'red',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#1a1c1b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});
