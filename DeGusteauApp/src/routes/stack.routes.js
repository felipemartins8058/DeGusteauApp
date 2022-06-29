import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {Screen, Navigator} = createNativeStackNavigator();

import {ScreenA} from '../screens/ScreenA';
import {ScreenB} from '../screens/ScreenB';
import {ScreenC} from '../screens/ScreenC';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';

import { TabRoutes } from './tab.routes'

export function StackRoutes() {
  [isAppFirstLauched, setIsAppFirstLauched] = React.useState(null);
  React.useEffect(() => {
    async function isFirstLaunch() {
      const appData = await AsyncStorage.getItem('isAppFirstLauched');
      if (appData == null) {
        setIsAppFirstLauched(true);
        AsyncStorage.setItem('isAppFirstLauched', 'false')
      } else {
        setIsAppFirstLauched(false);
      }
    }

    isFirstLaunch()
  }, []);

  return (
    isAppFirstLauched != null && (
      <Navigator screenOptions={{headerShown: false}}>
        {isAppFirstLauched && (
          <Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        )}
        <Screen name="Home" component={TabRoutes} />
      </Navigator>
    )
  );
}
