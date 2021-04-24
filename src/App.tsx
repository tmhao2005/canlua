import React, { useContext } from 'react';
import {
 NativeRouter, Route, Redirect, Link
} from "react-router-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Weight } from './pages/Weight';
import { Payment } from './pages/Payment';
import { WeightValue } from './components/Weight';
import { AppContext } from './context/App';
import { Theme } from './components/Theme';

const Stack = createStackNavigator();

function App() {
  const {colors} = useContext(Theme);
  const [weightValues, setWeightValues] = React.useState<WeightValue[]>(
    // Testing with set of data
    Array.from({length: 120}).map((_, idx) => ({
      id: idx,
      value: Math.round(Math.random() * 100)
    })),
    // []
  );

  // router version
  // return (
  //   <NativeRouter>
  //     <AppContext.Provider value={{
  //       weights: weightValues,
  //       setWeights: setWeightValues,
  //     }}>
  //       <Route path="/weight" component={Weight} />
  //       <Route path="/payment" component={Payment} />
  //       <Redirect to="/weight" />
  //     </AppContext.Provider>
  //   </NativeRouter>
  // );

  // stack navigation version
  return (
    <AppContext.Provider value={{
        weights: weightValues,
        setWeights: setWeightValues,
      }}>
      
      <Stack.Navigator>
        <Stack.Screen
          name="Weight"
          component={Weight}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: colors.success },
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ 
            // headerStyleInterpolator: forFade 
          }}
        />
      </Stack.Navigator>
    </AppContext.Provider>
  )
}

export default () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
);
