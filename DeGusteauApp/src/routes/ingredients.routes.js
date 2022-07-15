import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Screen, Navigator} = createNativeStackNavigator();

import {SelectIngredientsScreen} from '../screens/SelectIngredientsScreen';
import {IngredientsResultScreen} from '../screens/IngredientsResultScreen';
import { RecipeScreen } from '../screens/RecipeScreen';
import {IngredientPrice} from '../screens/IngredientPrice'

export const StackIngredients = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="SelectIngredientsScreen"
        component={SelectIngredientsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => <IconMenu />,
        }}
      />
      <Screen
        name="IngredientsResultScreen"
        component={IngredientsResultScreen}
      />
      <Screen name="RecipeScreen" component={RecipeScreen} />
      <Screen name="IngredientPrice" component={IngredientPrice} />
    </Navigator>
  );
};
