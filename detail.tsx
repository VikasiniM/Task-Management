import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "./navigatorpage";
import { StyleSheet,View,TextInput, Button } from "react-native";
import { collection, setDoc, doc } from "firebase/firestore";
import { store } from "../firebaseConfig";
import { Detailsdoc } from "./DetailStructure";



type DetailScreen = NativeStackScreenProps<RootStackParamList,'Detail'>;

const Detail : React.FC<DetailScreen> =({route,navigation})=>{
    const {userId,} = route.params;
    // const userId = 'sample';
    const [name,setname] = useState('');
    const envs = [];
    const NoOfTask = 0;
    const RemainTask = 0;
    const [data,setdata]= useState<Detailsdoc | null>(null);

    const setDetail = async ()=>{
        try{
            if(name!=''){
                const docRef = doc(store, userId , 'Details');
                const tempdata: Detailsdoc = {
                    Personal: {name},
                    Account: {userId},
                    createdAt: new Date(),
                    Doc: {envs,NoOfTask,RemainTask},
                };

                setdata(tempdata)
                await setDoc(docRef,tempdata);
                navigation.navigate('profile',{userId: userId});
        }
        }
        catch(error){
            console.error(error.message)
        }
    }
    
    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setname}/>
            <Button title="Submit" 
            onPress={setDetail}/>
        </View>
    )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    textTransform:'capitalize',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
export default Detail;