import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './login';
import SignUp from './Signup';
import Detail from './detail';
import ProfilePage from './profilePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Signup:undefined;
  Detail:  {userId: string};
  profile: {userId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Nav: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="profile" component={ProfilePage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
