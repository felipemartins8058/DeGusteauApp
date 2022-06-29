import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

import { StackReceitas } from './receitas.routes';

import { ScreenA } from '../screens/ScreenA';
import { ScreenB } from '../screens/ScreenB';
import { ScreenC } from '../screens/ScreenC'
import { OnBoardingScreen } from '../screens/OnBoardingScreen';

export function TabRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Receitas" component={StackReceitas} />
            {/* <Screen name="ScreenA" component={ScreenA} /> */}
            <Screen name="ScreenB" component={ScreenB} />
            {/* <Screen name="ScreenC" component={ScreenC} /> */}
        </Navigator>
    )
}