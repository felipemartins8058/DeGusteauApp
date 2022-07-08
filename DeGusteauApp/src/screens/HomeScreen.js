/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, FlatList, ActivityIndicator, StatusBar, ScrollView} from 'react-native';

import ExpandableCard from '../components/ExpandableCard'
import FooterHome from '../components/FooterHome';
import HeaderHome from '../components/HeaderHome';

export function HomeScreen({navigation}) {
  function handleNavigateToSelectIngredientsScreen() {
    navigation.navigate('SelectIngredientsScreen');
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
      const response = await fetch('http://18.230.138.105:5000/preferencias');
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
     const response = await fetch('http://18.230.138.105:5000/receitas', {
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
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 0, overflow: 'visible'}}>
      <Text>Estou na Home</Text>
      {/* <View style={{flex: 1}}>
        <Text style={{color: '#444'}}>Todas as preferencias</Text>
        {isLoadingPref ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={prefData}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Text style={{color: '#444'}}>
                {item.id}. {item.nome}
              </Text>
            )}
          />
        )}
      </View> */}

      {/* <View style={{flex: 1}}>
        <Text>
          Todas as receitas usando como base um array fake de preferências 1 e 2
          (japonesa e brasileira)
        </Text>
        {isLoadingReceitas ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={receitasData}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <>
                <Text style={{color: '#444'}}>
                  {item.id}.{item.nome}
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate('RecipeScreen', {id_receita: item.id})
                  }
                  title="ir para a receita"
                />
              </>
            )}
          />
        )}
      </View> */}

      {isLoadingReceitas ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={<HeaderHome/>}
          ListFooterComponent={<FooterHome receitasDataArray={receitasData} navigation={navigation} />}
          data={receitasData}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => <ExpandableCard {...item} navigation={navigation} />}
        />
      )}
    </View>
  );
}
