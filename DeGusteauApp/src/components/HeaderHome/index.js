import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export default function HeaderHome({navigation}) {
  return (
    <>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>
            Olá, <Text style={{color: '#F54749'}}>Martins</Text>
          </Text>
          <Text style={styles.subtitle}>O que vamos comer hoje?</Text>
        </View>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('PreferenciasScreen')}>
            <Icon style={styles.iconAbsolute} name="smileo" size={50} />
            <View style={styles.gearWrapper}>
              <Icon name="setting" size={20} color={'#444'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <Icon name="search1" color={"#444"} size={20} />
        <TextInput style={styles.input} />
      </View>
      <Text style={styles.listTitle}>Susgestões para <Text  style={styles.markup} >você!</Text> </Text>
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 16
  },
  headerContent: {
    flex: 0,
  },
  title: {
    fontSize: 32,
    color: '#444',
  },
  subtitle: {
    color: '#444',
    fontSize: 16,
  },
  listTitle:{
    fontSize: 24,
    color: "#444",
    paddingHorizontal: 24,
    marginBottom: 16
  },
  markup:{
    color: "#F54749"
  },
  profileBtn: {
    backgroundColor: '#F54749',
    width: 80,
    height: 80,
    borderRadius: 50,
    elevation: 5,
    position: 'relative',
  },
  iconAbsolute: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  gearWrapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 6,
    borderRadius: 50,
    padding: 2,
    bottom: 0,
    right: 0,
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
