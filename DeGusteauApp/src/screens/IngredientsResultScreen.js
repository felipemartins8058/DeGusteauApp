import React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ExpandableCard from '../components/ExpandableCard';
import Icon from 'react-native-vector-icons/AntDesign';
import SmallCard from '../components/SmallCard';

export function IngredientsResultScreen({navigation, route}) {
  const {ingredientesArray} = route.params;
  // console.log(ingredientesArray)

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingAllRecipes, setIsLoadingAllRecipes] = React.useState(true);
  const [receitasData, setReceitasData] = React.useState([]);
  const [allReceitasData, setAllReceitasData] = React.useState([]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        'http://18.230.138.105:5000/receitas/resultados',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredientesArray: ingredientesArray,
          }),
        },
      );
      const recipesList = await response.json();
      setReceitasData(recipesList);
      console.log(receitasData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllRecipes = async () =>{
    try{
      const response = await fetch('http://18.230.138.105:5000/receitas/todas')
      const allRecipes = await response.json()
      setAllReceitasData(allRecipes)
    } catch(error){
      console.log(error)
    } finally {
      setIsLoadingAllRecipes(false)
    }
  }

  React.useEffect(() => {
    getRecipes();
    getAllRecipes();
  }, []);

  console.log(receitasData);

  return (
    <View style={{flex: 0}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.back} onPress={()=> navigation.goBack()} >
                <Icon name="leftcircleo" color={'#F54749'} size={24} />
              </TouchableOpacity>
              <Text style={styles.title} >Seus resultados</Text>
            </View>
          }
          data={receitasData}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <ExpandableCard {...item} navigation={navigation} />
          )}
          ListFooterComponent={
            <View>
              <Text style={styles.listTitle} >Outras Receitas</Text>
              {isLoadingAllRecipes ? <ActivityIndicator/> :
                <FlatList
                data={allReceitasData}
                numColumns={2}
                keyExtractor={({id}, index) => id}
                renderItem={({item}) => (
                  <SmallCard {...item} navigation={navigation} />
                )}
              />
              }
            </View>
          }
        />
      )}
      <Text style={{color: '#444'}}> Tela de merda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: '#444',
      },
      back: {
        paddingTop: 8,
        paddingRight: 8,
      },
      wrapper: {
        flexDirection: 'row',
        marginTop: 24,
        paddingLeft: 12,
        paddingRight: 16,
        alignItems: 'flex-start',
        marginBottom: 16
      },
      listTitle: {
        fontSize: 24,
        color: '#444',
        paddingHorizontal: 24,
        marginBottom: 16,
      },
});
