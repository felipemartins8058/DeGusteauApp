import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function SelectIngredientsScreen({navigation}) {
  function handleNavigateToHomeScreen() {
    navigation.navigate('HomeScreen');
  }


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Estou em Selecionar Ingredientes</Text>
      <Button title="Go to Home" onPress={handleNavigateToHomeScreen} />
    </View>
  );
}