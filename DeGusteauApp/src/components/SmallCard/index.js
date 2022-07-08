import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export default function SmallCard({navigation, nome, tempo_preparo, id}) {
  return (
    <TouchableOpacity
      style={styles.smallcard}
      onPress={() =>
        navigation.navigate('RecipeScreen', {id_receita: id})
      }>
      <Image
        style={styles.imageRecipe}
        source={require('../../images/imagem.png')}
      />
      <View style={styles.contentRecipe}>
        <Text>{nome} {id}</Text>
        <Text>
          <Icon name="clockcircle" />
          <Text>{tempo_preparo}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

styles = StyleSheet.create({
  smallcard: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  imageRecipe: {
    flex: 1,
    width: '100%',
    height: 100,
  },
  contentRecipe: {
    flex: 1,
    backgroundColor: '#FDC65E',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});
