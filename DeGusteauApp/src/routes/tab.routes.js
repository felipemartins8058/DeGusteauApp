import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Iconic from 'react-native-vector-icons/MaterialCommunityIcons'

const {Screen, Navigator} = createBottomTabNavigator();

import {StackReceitas} from './receitas.routes';

import {HomeScreen} from '../screens/HomeScreen';
import {SelectIngredientsScreen} from '../screens/SelectIngredientsScreen';
import {RecipeScreen} from '../screens/RecipeScreen';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';
import {FridgeScreen} from '../screens/FridgeScreen'

import IconMenu from '../components/IconMenu';

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          elevation: 0
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
          tabBarLabel:'',
          tabBarIcon: ({size, color}) => (
            <IconMenu/>
          ),
        }}
      />

      <Screen name='Geladeira' component={FridgeScreen} options={{tabBarIcon:({size,color}) => (<Iconic name='fridge-industrial-outline' color={color} size={size} />)}} />
    </Navigator>
  );
}
