import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RootStackParamList } from './navigatorpage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';

type LoginScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;

const AuthPage: React.FC<LoginScreen> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('profile', { userId: userCredential.user.uid });
      setError(null);
      setSuccess("Login Successful");
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleSignUp = async () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            type='ionicon'
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Button title="Login" onPress={handleLogin} />
      <Button title="create account" onPress={handleSignUp} color={'grey'} />
      {Error && <Text style={styles.error}>{Error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width:'100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eyeIcon: {
    marginLeft:-35,
    marginBottom:10,
    alignContent:'center',
  },
  error:{
    color: 'red'
  },
  success:{
    color: 'green'
  },
});

export default AuthPage;
