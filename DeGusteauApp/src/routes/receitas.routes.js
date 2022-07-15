import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Screen, Navigator} = createNativeStackNavigator();

import {HomeScreen} from '../screens/HomeScreen';
import {RecipeScreen} from '../screens/RecipeScreen';
import {IngredientPrice} from '../screens/IngredientPrice';
import { PreferenciasScreen } from '../screens/PreferenciasScreen';
import { IngredientsResultScreen } from '../screens/IngredientsResultScreen';

export const StackReceitas = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="PreferenciasScreen" component={PreferenciasScreen} />
            <Screen name="HomeScreen" component={HomeScreen} />
            <Screen name="RecipeScreen" component={RecipeScreen} />
            <Screen name="IngredientPrice" component={IngredientPrice} />
            <Screen name="IngredientsResultScreen" component={IngredientsResultScreen} />
        </Navigator>
    )
}