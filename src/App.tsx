import React from 'react';
import {
 StyleSheet, View, ScrollView, Text
} from 'react-native';
import {
 Root, Container, Header
} from 'native-base';
import {
 NativeRouter, Route, Redirect, Link
} from "react-router-native";
import { Weight } from './pages/Weight';
import { Payment } from './pages/Payment';
import { WeightValue } from './components/Weight';
import { AppContext } from './context/App';

function App() {
  const [weightValues, setWeightValues] = React.useState<WeightValue[]>(
    // Testing with set of data
    // Array.from({length: 120}).map((_, idx) => ({
    //   id: idx,
    //   value: Math.round(Math.random() * 100)
    // })),
    []
  );

  return (
    <NativeRouter>
      <AppContext.Provider value={{
        weights: weightValues,
        setWeights: setWeightValues,
      }}>
        <Route path="/weight" component={Weight} />
        <Route path="/payment" component={Payment} />
        <Redirect to="/weight" />
      </AppContext.Provider>
    </NativeRouter>
  );
}

export default () => (
  <Root><App /></Root>
);
