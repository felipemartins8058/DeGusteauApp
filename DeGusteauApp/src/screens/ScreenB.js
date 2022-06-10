import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function ScreenB({navigation}) {
  function handleNavigateToScreenA() {
    navigation.navigate('ScreenA');
  }


  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <Text>Screen B</Text>
      <Button title="Go to Screen B" onPress={handleNavigateToScreenA} />
    </View>
  );
}