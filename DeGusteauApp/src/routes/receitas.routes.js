import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Screen, Navigator} = createNativeStackNavigator();

import {HomeScreen} from '../screens/HomeScreen';
import {RecipeScreen} from '../screens/RecipeScreen';
import {IngredientPrice} from '../screens/IngredientPrice';

export const StackReceitas = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="HomeScreen" component={HomeScreen} />
            <Screen name="RecipeScreen" component={RecipeScreen} />
            <Screen name="IngredientPrice" component={IngredientPrice} />
        </Navigator>
    )
}