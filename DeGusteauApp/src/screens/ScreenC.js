/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';

export function ScreenC({navigation,route}) {
  function handleNavigateToScreenA() {
    navigation.navigate('ScreenA');
  }

  const [isLoadingReceita, setLoadingReceita] = useState(true);
  const [receitaData, setReceitaData] = useState([]);
  console.log(receitaData);

  const getReceita = async () => {
    try {
     const response = await fetch(`http://192.168.18.4:5000/receitas/${route.params.id_receita}`, {
       method: 'GET',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       }}
     );
     const json = await response.json();
     setReceitaData(json);
   } catch (error) {
     console.error(error);
   } finally {
    setLoadingReceita(false);
   }
 };

  useEffect(() => {
    getReceita();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <Text>Screen C</Text>
      <Button title="Go to Screen A" onPress={handleNavigateToScreenA} />

      <View style={{ flex: 1, padding: 24 }}>
        <Text>Receita:</Text>
        {isLoadingReceita ? <ActivityIndicator/> : (
          <FlatList
            data={receitaData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <>
              <Text>{item.nome}</Text>
              <Text>{item.tempo_preparo}</Text>
              <Text>{item.modo_preparo}</Text>
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}