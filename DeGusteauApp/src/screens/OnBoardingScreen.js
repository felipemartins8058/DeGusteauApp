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
  ImageBackground
} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#444444', secondary: '#f5f5f5'};

const slides = [
  {
    id: '1',
    image: require('../images/1.png'),
    title: 'Nova Receita',
    subtitle: 'Para descobrir receitas basta\n clicar no botão do meio no menu.',
  },
  {
    id: '2',
    image: require('../images/2.png'),
    title: 'Geladeira e Lojas',
    subtitle: 'Basta pesquisar os ingredientes \npara vir uma chuva de ofertas!',
  },
  {
    id: '3',
    image: require('../images/3.png'),
    title: 'Outras funções',
    subtitle: 'Pronto! Acho que expliquei tanto \nque fiquei com fome. O que tem na geladeira?',
  },
];

const Slide = ({item}) => (
  <View style={{alignItems: 'center'}}>
    <Image
      source={item.image}
      style={{height: '45%', width, resizeMode: 'contain'}}
    />
    <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginTop: 60, color: "#444"}}>
      {item.title}
    </Text>
    <Text style={{fontSize: 16, textAlign: 'center', marginTop: 60, color: "#444"}}>
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
                backgroundColor: '#444',
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
              <Text>Pular</Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
              <Text>Próximo</Text>
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
    <ImageBackground source={require("../images/backonboard.png")} style={{flex: 1, backgroundColor: "#fff"}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={{height: 50}} />
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#F54749',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});
