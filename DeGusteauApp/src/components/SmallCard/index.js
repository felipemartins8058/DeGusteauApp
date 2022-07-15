import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export default function SmallCard({navigation, nome, tempo_preparo, id, filename}) {
  return (
    <TouchableOpacity
      style={styles.smallcard}
      onPress={() =>
        navigation.navigate('RecipeScreen', {id_receita: id})
      }>
      <Image
        style={styles.imageRecipe}
        source={{ uri: `http://18.230.138.105:5000/image/${filename}`, }}
      />
      <View style={styles.contentRecipe}>
        <Text>{nome}</Text>
        <Text>
          <Icon name="clockcircle" />
          <Text> {tempo_preparo}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

styles = StyleSheet.create({
  smallcard: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
