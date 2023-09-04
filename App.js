import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaNotas from './screens/ListaNotas';
import DetalheNota from './screens/DetalheNota';
import EditarNota from './screens/EditarNota';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaNotas">
        <Stack.Screen name="ListaNotas" component={ListaNotas} />
        <Stack.Screen name="DetalheNota" component={DetalheNota} />
        <Stack.Screen name="EditarNota" component={EditarNota} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;