import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {Screen, Navigator} = createNativeStackNavigator();

import {ScreenA} from '../screens/ScreenA';
import {ScreenB} from '../screens/ScreenB';
import {OnBoardingScreen} from '../screens/OnBoardingScreen';

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
      <Navigator>
        {isAppFirstLauched && (
          <Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        )}
        <Screen name="ScreenA" component={ScreenA} />
        <Screen name="ScreenB" component={ScreenB} />
      </Navigator>
    )
  );
}
