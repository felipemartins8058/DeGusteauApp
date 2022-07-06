import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function SelectIngredientsScreen({navigation}) {
  function handleNavigateToHomeScreen() {
    navigation.navigate('HomeScreen');
  }


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Screen B</Text>
      <Button title="Go to Screen B" onPress={handleNavigateToHomeScreen} />
    </View>
  );
}