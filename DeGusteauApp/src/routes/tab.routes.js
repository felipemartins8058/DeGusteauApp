import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const {Screen, Navigator} = createBottomTabNavigator();

import {StackReceitas} from './receitas.routes';

import {HomeScreen} from '../screens/HomeScreen';
import {SelectIngredientsScreen} from '../screens/SelectIngredientsScreen';
import {RecipeScreen} from '../screens/RecipeScreen';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        },
        tabBarActiveTintColor: 'red',
      }}
      style>
      <Screen
        name="Receitas"
        component={StackReceitas}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="SelectIngredientsScreen"
        component={SelectIngredientsScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="box" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
