import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export function ScreenA({navigation}) {
  function handleNavigateToScreenB() {
    navigation.navigate('ScreenB');
  }

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>Screen A</Text>
      <Button title="Go to Screen B" onPress={handleNavigateToScreenB} />
    </View>
  );
}
