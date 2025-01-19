import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import SignUp from './Signup';
import Detail from './detail';
import ProfilePage from './profilePage';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Detail: { userId: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default AuthStack;
