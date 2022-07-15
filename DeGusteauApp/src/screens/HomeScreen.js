/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, FlatList, ActivityIndicator, StatusBar, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpandableCard from '../components/ExpandableCard'
import FooterHome from '../components/FooterHome';
import HeaderHome from '../components/HeaderHome';

export function HomeScreen({navigation}) {
  const [isLoadingArray, setLoadingArray] = useState(true);
  const [ArrayData, setArrayData] = useState();
  console.log(ArrayData)

  const [isLoadingReceitas, setLoadingReceitas] = useState(true);
  const [receitasData, setReceitasData] = useState([]);

  const [isLoadingTodasReceitas, setLoadingTodasReceitas] = useState(true);
  const [todasReceitasData, setTodasReceitasData] = useState([]);

  const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('ArrayPreferencia');
        const result = await JSON.parse(jsonValue).checked;
        setArrayData(await result);
        console.log(result)
        return jsonValue != null ? result : null;
    } catch(e) {

    } finally {
      setLoadingArray(false);
    }
  }

  const getReceitas = async () => {
    try {
      const prefArray = await getData();
      const response = await fetch('http://18.230.138.105:5000/receitas', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         preferenciasArray: prefArray,
       })}
     );
     const json = await response.json();
     setReceitasData(json);
   } catch (error) {
     console.error(error);
   } finally {
    setLoadingReceitas(false);
   }
  };

  const getTodasReceitas = async () => {
    try {
      const response = await fetch('http://18.230.138.105:5000/receitas/todas', {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       }}
     );
     const json = await response.json();
     setTodasReceitasData(json);
   } catch (error) {
     console.error(error);
   } finally {
    setLoadingTodasReceitas(false);
   }
  };

  useEffect(() => {
    getData();
    getReceitas();
    getTodasReceitas();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 0, overflow: 'visible'}}>

      {isLoadingReceitas ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={<HeaderHome navigation={navigation}/>}
          ListFooterComponent={<FooterHome receitasDataArray={todasReceitasData} navigation={navigation} />}
          data={receitasData}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => <ExpandableCard {...item} navigation={navigation} />}
        />
      )}
    </View>
  );
}
