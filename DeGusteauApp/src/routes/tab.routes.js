import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

import { ScreenA } from '../screens/ScreenA';
import { ScreenB } from '../screens/ScreenB';

export function TabRoutes(){
    return(
        <Navigator>
            <Screen name="ScreenA" component={ScreenA} />
            <Screen name="ScreenB" component={ScreenB} />
        </Navigator>
    )
}