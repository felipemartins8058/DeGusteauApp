/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';

export function RecipeScreen({navigation,route}) {
  function handleNavigateToHomeScreen() {
    navigation.navigate('HomeScreen');
  }

  const [isLoadingReceita, setLoadingReceita] = useState(true);
  const [receitaData, setReceitaData] = useState([]);
 
  const [isLoadingReceitaIngredientes, setLoadingReceitaIngredientes] = useState(true);
  const [receitaIngredientesData, setReceitaIngredientesData] = useState([]);

  const [isLoadingMedia, setLoadingMedia] = useState(true);
  const [mediaData, setMediaData] = useState([]);
  console.log(mediaData);
  
  const getReceita = async () => {
    try {
      const response = await fetch(`http://18.230.138.105:5000/receitas/${route.params.id_receita}`, {
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

  const getReceitaIngredientes = async () => {
    try {
      const response = await fetch(`http://18.230.138.105:5000/receitas/${route.params.id_receita}/ingredientes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }}
      );
      const json = await response.json();
      setReceitaIngredientesData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReceitaIngredientes(false);
    }
  };

  const getMedias = async () => {
    try {
      const response = await fetch(`http://18.230.138.105:5000/receitas/${route.params.id_receita}/ingredientes/medias`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }}
      );
      const json = await response.json();
      setMediaData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMedia(false);
    }
  };


  useEffect(() => {
    getReceita();
  }, []);

  useEffect(() => {
    getReceitaIngredientes();
  }, []);

  useEffect(() => {
    getMedias();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Estou na Tela da receita selecionada</Text>
      <Button title="Go to Home" onPress={handleNavigateToHomeScreen} />

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

      <View style={{ flex: 1, padding: 24 }}>
        <Text>Ingredientes:</Text>
        {isLoadingReceitaIngredientes ? <ActivityIndicator/> : (
          <FlatList
            data={receitaIngredientesData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <>
              <Text style={{color: '#444'}}>• {item.nome} : {item.quantidade} {item.unidade}</Text>
              <Button
                onPress={() =>
                  navigation.navigate('IngredientPrice', { 
                    id_ingrediente: item.id,
                    nome_ingrediente: item.nome,
                  })
                }
                title="ir para o ingrediente"
              />
              </>
            )}
          />
        )}
      </View>
      
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Medias de valores:</Text>
        {isLoadingMedia ? <ActivityIndicator/> : (
          <FlatList
            data={mediaData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <>
              <Text>{item.nome} - R${item.media}</Text>
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}