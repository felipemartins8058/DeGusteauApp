import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

import { ScreenA } from '../screens/ScreenA';
import { ScreenB } from '../screens/ScreenB';
import { OnBoardingScreen } from '../screens/OnBoardingScreen';

export function TabRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="OnBoardingScreen" component={OnBoardingScreen} />
            <Screen name="ScreenA" component={ScreenA} />
            <Screen name="ScreenB" component={ScreenB} />
        </Navigator>
    )
}