import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Screen, Navigator} = createNativeStackNavigator();

import {ScreenA} from '../screens/ScreenA';
import {ScreenC} from '../screens/ScreenC';

export const StackReceitas = () => {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="ScreenA" component={ScreenA} />
            <Screen name="ScreenC" component={ScreenC} />
        </Navigator>
    )
}