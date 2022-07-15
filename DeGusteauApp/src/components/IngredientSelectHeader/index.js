import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export default function IngredientSelectHeader({navigation}) {
  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.back} onPress={()=> navigation.goBack()}>
          <Icon name="leftcircleo" color={'#F54749'} size={24} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Hora de cozinhar!</Text>
          <Text style={styles.text}>
            Escolha os ingredientes para mostrarmos novas receitas!
          </Text>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <Icon name="search1" color={'#444'} size={20} />
        <TextInput style={styles.input} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 24,
    paddingLeft: 12,
    paddingRight: 16,
    alignItems: 'flex-start',
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    color: '#444',
  },
  text: {
    color: '#444',
  },
  back: {
    paddingTop: 8,
    paddingRight: 8,
  },
  inputWrapper:{
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 5
  },
  inputIcon:{
    marginRight: 8
  },
  input: {
    flex: 1,
    color: "#000"
  }
});
