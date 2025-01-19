// AuthPage.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View ,TouchableOpacity} from 'react-native';
import {auth, store} from '../firebaseConfig';
// import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthStackParamList } from './auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, setDoc, doc } from "firebase/firestore";
import { Icon } from '@rneui/themed';


type SignUpScreen = NativeStackScreenProps<AuthStackParamList,'Login'>;

const SignUp: React.FC<SignUpScreen> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [Error,setError] = useState(null);
  const [success,setSuccess] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      setUser(userCredential.user.uid);
      setSuccess("Successfull");
      navigation.navigate('Detail', {userId: userCredential.user.uid});
      // const newCollection = await collection(store,userCredential.user.uid);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleLogin = async() =>  {
    navigation.navigate('Login')
  }

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
          <Button title="Sign Up" onPress={handleSignup} />
          <Button title="already have a account" onPress={handleLogin} color={'grey'}/>
          {Error && <Text style={styles.error}>{Error}</Text>}
          {success && <Text style={styles.success}>SignUp Successfull</Text>}
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

export default SignUp;
