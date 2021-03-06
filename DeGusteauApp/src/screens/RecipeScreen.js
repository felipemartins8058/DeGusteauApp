/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export function RecipeScreen({navigation,route, navigation: { goBack }}) {

  const [isLoadingReceita, setLoadingReceita] = useState(true);
  const [receitaData, setReceitaData] = useState([]);
  
  const [isLoadingReceitaIngredientes, setLoadingReceitaIngredientes] = useState(true);
  const [receitaIngredientesData, setReceitaIngredientesData] = useState([]);

  const [isLoadingMedia, setLoadingMedia] = useState(true);
  const [mediaData, setMediaData] = useState([]);
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
      
      {isLoadingReceitaIngredientes ? (
        <ActivityIndicator /> 
        ) : ( 
                
        <FlatList style={{color: '#444'}} 
          ListHeaderComponent={
            <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 14 }}>
              {isLoadingReceita ? <ActivityIndicator/> : (

                <FlatList 
                  // DADOS DA RECEITA
                  data={receitaData }
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <>
                    <View style={{ flex: 1, width: '100%', flexDirection: 'row',alignItems: 'flex-start', paddingBottom: 8}}>
                      <TouchableHighlight style={{ borderRadius: 50, padding: 8}} underlayColor="#FFEECA" activeOpacity={0.8} onPress={() => goBack()}>  
                          <Icon name='leftcircleo' color={'#F54749'} size={24} />
                      </TouchableHighlight>

                      <View style={{flex: 1, paddingLeft: 8}}>
                        <Text style={styles.title}>{item.nome}</Text>
                      </View>
                      
                    </View>

                    <Text><Icon name='clockcircleo' /> {item.tempo_preparo}</Text>

                    <View style={{width: '100%', paddingVertical: 24}}>
                      <Image style={styles.image} source={{ uri: `http://18.230.138.105:5000/image/${item.filename}`, }}/>
                    </View>

                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                      <View style={styles.iconFrame}>
                        <Image style={styles.icon} source={require('../images/icons/chef-hat.png')}/>
                      </View>
                      <Text style={styles.subtitle}> Ingredientes:</Text>
                    </View>
                    </>
                  )}
                />
              )}
            </View>

            
          }
          
          data={receitaIngredientesData}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => 
          // INGREDIENTES - QUANTIDADES
            <>
              <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24}}>
                <Text style={{color: '#444', flex: 1 }}>??? {item.nome[0].toUpperCase() + item.nome.substring(1)} : {item.quantidade} {item.unidade}</Text>
                
                <TouchableHighlight style={{ borderRadius: 30, padding: 4}} underlayColor="#FFEECA"  activeOpacity={0.8} onPress={() =>
                    navigation.navigate('IngredientPrice', { 
                      id_ingrediente: item.id,
                      nome_ingrediente: item.nome,
                    })}>
                    <View style={styles.nextBtn}>
                      <Text style={{color: '#Fff', fontSize: 12}}><Icon name='pushpino' color={'#Fff'} size={14} /> Ver lojas</Text>
                    </View>
                </TouchableHighlight>
              </View>
            </>
          }
          
          ListFooterComponent={
            <View style={{flex: 1, paddingHorizontal: 24, paddingVertical:14 }}> 
                    
              <Text style={styles.subtitle}><Icon name='linechart' color={'#F54749'} size={18} /> M??dias de valores:</Text>
              
              {isLoadingMedia ? <ActivityIndicator/> : (

                <FlatList 
                  // INGREDIENTES - VALORES
                  data={mediaData}
                  style={{ flex: 1, width:'100%',flexDirection: 'row', flexWrap:'wrap',justifyContent:'space-around'}}
                  keyExtractor={({ nome }, index) => nome}
                  listKey={({ nome }, index) => nome}
                  renderItem={({ item }) => (
                    <>
                      <View style={{flex:1, alignItems: 'center', paddingRight: 24, paddingTop: 14}}>
                          <Text style={styles.corpo}>{item.nome[0].toUpperCase() + item.nome.substring(1)}</Text>
                          <Text style={styles.corpo}>R${item.media}</Text>
                          <Text style={styles.corpo}>{item.unidade}</Text>
                      </View>
                    </>
                  )}
                />
              )}
              <View style={{flex: 1, paddingVertical: 28 }}>
                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                  <View style={styles.iconFrame}>
                    <Image style={styles.icon} source={require('../images/icons/preparo.png')}/>
                  </View>
                  <Text style={styles.subtitle}> Modo de preparo:</Text>
                </View>
                {isLoadingReceita ? <ActivityIndicator/> : (

                  <FlatList 
                    // MODO DE PREPARO
                    data={receitaData }
                    keyExtractor={({ id }, index) => id}
                    listKey={({ id }, index) => id}
                    renderItem={({ item }) => (
                      <>
                      <View style={{flex: 1, paddingVertical: 14 }}>
                        <Text style={styles.corpo}>{item.modo_preparo}</Text>
                      </View>
                      </>
                    )}
                  />
                )}
              </View>
            </View>
      
          }
        />
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper:{
      flex: '1'
  },
  title:{
      fontSize: 32,
      color: '#444'
  },
  subtitle:{
    fontSize: 22,
    color: '#444'
  },
  corpo:{
    fontSize: 14,
    color: '#444'
  },
  iconFrame: {
    width:'5%',
    aspectRatio: 1
  },
  icon: {
    width:'100%',
    height:'100%'
  },
  nextBtn:{
    backgroundColor: '#F54749',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30
  },
  image: {
    flex: 0,
    height: 160,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
})