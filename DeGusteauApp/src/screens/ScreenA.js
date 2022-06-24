/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, FlatList, ActivityIndicator} from 'react-native';

export function ScreenA({navigation}) {
  function handleNavigateToScreenB() {
    navigation.navigate('ScreenB');
  }

  const [isLoadingPref, setLoadingPref] = useState(true);
  const [prefData, setPrefData] = useState([]);
  console.log(prefData);

  const [isLoadingReceitas, setLoadingReceitas] = useState(true);
  const [receitasData, setReceitasData] = useState([]);
  console.log(receitasData);
  const arrayTeste = [1,2];

  const getPreferencias = async () => {
     try {
      const response = await fetch('http://192.168.18.4:5000/preferencias');
      const json = await response.json();
      setPrefData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPref(false);
    }
  };

  const getReceitas = async () => {
    try {
     const response = await fetch('http://192.168.18.4:5000/receitas', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         preferenciasArray: arrayTeste,
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

  useEffect(() => {
    getPreferencias();
  }, []);

  useEffect(() => {
    getReceitas();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}}>
      <Text>Screen A</Text>
      <Button title="Go to Screen B" onPress={handleNavigateToScreenB} />
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Todas as preferencias</Text>
        {isLoadingPref ? <ActivityIndicator/> : (
          <FlatList
            data={prefData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.id}. {item.nome}</Text>
            )}
          />
        )}
      </View>

      <View style={{ flex: 1, padding: 24 }}>
        <Text>Todas as receitas usando como base um array fake de preferências 1 e 2 (japonesa e brasileira)</Text>
        {isLoadingReceitas ? <ActivityIndicator/> : (
          <FlatList
            data={receitasData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <>
              <Text>{item.id}.{item.nome}</Text>
              <Button
                onPress={() =>
                  navigation.navigate('ScreenC', { id_receita: item.id })
                }
                title="ir para a receita"
              />
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}
