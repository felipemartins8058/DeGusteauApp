import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {Screen, Navigator} = createNativeStackNavigator();

import {HomeScreen} from '../screens/HomeScreen';
import {SelectIngredientsScreen} from '../screens/SelectIngredientsScreen';
import {RecipeScreen} from '../screens/RecipeScreen';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';
import { PreferenciasScreen } from '../screens/PreferenciasScreen';
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
        <Screen name="HomeRoute" component={TabRoutes} />
      </Navigator>
    )
  );
}
