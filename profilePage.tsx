import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox , Icon} from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDoc, doc, addDoc, collection, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { store } from "../firebaseConfig";
import { getAuth, signOut } from 'firebase/auth';
import { RootStackParamList } from './navigatorpage';
import { Detailsdoc, Env, Task } from './DetailStructure';


type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'profile'>;

const ProfilePage: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [details, setDetails] = useState<Detailsdoc | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [envName, setEnvName] = useState<string>('');
  const [taskNames, setTaskNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const docRef = doc(store, userId, 'Details');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetails(docSnap.data() as Detailsdoc);
        } else {
          console.log('No such document!');
        }
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching document: ', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userId]);

  const handleAddEnv = async () => {
    try {
      if(envName==undefined || envName.trim()==''){
        setEnvName('');
        throw console.warn("invalid Task Name");
      }
      const newEnv: Env = {
        id: envName,
        name: envName,
        NoOfTaskEnv: 0,
        RemainTaskEnv: 0,
        tasks: [],
      };

      if (details) {
        const updatedEnv = [...details.Doc.envs, newEnv];
        const updatedDetails = { ...details, Doc: { ...details.Doc, envs: updatedEnv, NoOfTask: details.Doc.NoOfTask, RemainTask: details.Doc.RemainTask } };

        const docRef = doc(store, userId, 'Details');
        await setDoc(docRef, updatedDetails);

        setDetails(updatedDetails);
        setEnvName('');
      }
    } catch (error: any) {
      console.warn('Error adding environment:');
      // setError(error.message);
    }
  };

  const handleDeleteEnv = async (envId: string) => {
    let delTask = 0;
    let delRemain = 0;
    try {
      if (details) {
        details.Doc.envs.forEach(env => {
          if (envId === env.id) {
            delTask = env.NoOfTaskEnv; 
            delRemain = env.RemainTaskEnv;
          }
        });
        
        const updatedEnv = details.Doc.envs.filter(env => env.id !== envId);
        
        const updatedDetails = { ...details, Doc: { ...details.Doc, envs: updatedEnv, NoOfTask: details.Doc.NoOfTask - delTask, RemainTask: details.Doc.RemainTask - delRemain } };
        const docRef = doc(store, userId, 'Details');
        await setDoc(docRef, updatedDetails);

        setDetails(updatedDetails);
      }
    } catch (error: any) {
      console.error('Error deleting environment:');
      setError(error.message);
    }
  };

  const handleAddTask = async (envId: string) => {
    try {
      if(taskNames[envId]==undefined || taskNames[envId].trim()==''){
        taskNames[envId]='';
        throw console.warn("invalid Task Name");
        
      }
        const newTask: Task = {
          taskName: taskNames[envId],
          isCompleted: false,
        };
        if (details) {
          const updatedEnv = details.Doc.envs.map(env => {
            if (env.id === envId || !taskNames[envId] || taskNames[envId].trim() == '') {
              const taskExists = env.tasks.some(task => task.taskName === taskNames[envId]);
              if (taskExists) {
                // console.warn("task already exist");
                return { ...env, tasks: [...env.tasks] };
              }
              else{
                env.RemainTaskEnv += 1;
                env.NoOfTaskEnv += 1;
                return { ...env, tasks: [...env.tasks, newTask] };
              }
            }
            return env;
          });

          const updatedDetails = { ...details, Doc: { ...details.Doc, envs: updatedEnv, NoOfTask: details.Doc.NoOfTask + 1, RemainTask: details.Doc.RemainTask + 1 } };

          const docRef = doc(store, userId, 'Details');
          await setDoc(docRef, updatedDetails);

          setDetails(updatedDetails);
          setTaskNames(prevState => ({ ...prevState, [envId]: '' }));
        
      };

    } catch (error: any) {
      console.warn('Error adding task:');
      // setError(error.message);
    }
  };

  const handleDeleteTask = async (envId: string, taskName: string) => {
    let delTaskStatus = 0;
    try {
      if (details) {
        const updatedEnv = details.Doc.envs.map(env => {
          if (env.id === envId) {
            const task = env.tasks.find(task => task.taskName === taskName);
            if (task && !task.isCompleted) {
              delTaskStatus = 1;
            }

            return { ...env, NoOfTaskEnv: env.NoOfTaskEnv - 1, RemainTaskEnv: env.RemainTaskEnv - delTaskStatus, tasks: env.tasks.filter(task => task.taskName !== taskName) };
          }
          return env;
        });

        const updatedDetails = { ...details, Doc: { ...details.Doc, envs: updatedEnv, NoOfTask: details.Doc.NoOfTask - 1, RemainTask: details.Doc.RemainTask - delTaskStatus } };

        const docRef = doc(store, userId, 'Details');
        await setDoc(docRef, updatedDetails);

        setDetails(updatedDetails);
      }
    } catch (error: any) {
      console.error('Error deleting task');
      setError(error.message);
    }
  };
  const handleLogOut = async() =>{
    navigation.navigate('Login');
  }

  const toggleTaskCompletion = async (envId: string, taskName: string, isCompleted: boolean) => {
    try {
      if (details) {
        const updatedEnv = details.Doc.envs.map(env => {
          if (env.id === envId) {
            return {
              ...env,
              tasks: env.tasks.map(task => {
                if (task.taskName === taskName) {
                  if (isCompleted) {
                    details.Doc.RemainTask -= 1;
                  } else {
                    details.Doc.RemainTask += 1;
                  }
                  return { ...task, isCompleted: !task.isCompleted };
                }
                return task;
              })
            };
          }
          return env;
        });

        const updatedDetails = {
          ...details,
          Doc: {
            ...details.Doc,
            envs: updatedEnv,
            RemainTask: updatedEnv.reduce((total, env) => total + env.tasks.filter(task => !task.isCompleted).length, 0)
          }
        };

        const docRef = doc(store, userId, 'Details');
        await setDoc(docRef, updatedDetails);

        setDetails(updatedDetails);
      }
    } catch (error: any) {
      console.error('Error toggling task completion:', error.message);
      setError(error.message);
    }
  };

  const handleTaskNameChange = (envId: string, text: string) => {
    
    setTaskNames(prevState => ({ ...prevState, [envId]: text }));

  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.safeZone}>
      <View style={styles.detailContainer}>
        <View style={styles.detailName}>
          <Text style={styles.detailTextName}>{details.Personal.name}</Text>
          <Text style={styles.detailTextNo}>{(details.Doc.NoOfTask - details.Doc.RemainTask)}/{details.Doc.NoOfTask}</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={{ ...styles.progressBar, width: `${((details.Doc.NoOfTask - details.Doc.RemainTask) / details.Doc.NoOfTask) * 100}%` }} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Environment Name"
            value={envName}
            onChangeText={setEnvName}
          />
          <Button title="Add Environment" onPress={handleAddEnv}/>
          {details ? (
            <>
              {details.Doc.envs.map((env, index) => (
                <View key={index} style={{ ...styles.envContainer, backgroundColor: index % 2 === 0 ? '#e0f7fa' : '#ffe0b2' }}>
                  <View style={styles.envNameContainer}>
                    <Text style={styles.envName}>{env.name}</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEnv(env.id)}>
                      <Icon name="trash-outline" type='ionicon'></Icon>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Task Name"
                    value={taskNames[env.id]}
                    onChangeText={text => handleTaskNameChange(env.id, text)}
                  />
                  <Button title="Add Task" onPress={() => handleAddTask(env.id)} />
                  {env.tasks.map((task, taskIndex) => (
                    <View key={taskIndex} style={styles.taskContainer}>
                      <Text style={styles.taskNameContainer}>{task.taskName}</Text>
                      <CheckBox
                        style={styles.checkbox}
                        checked={task.isCompleted}
                        onPress={() => toggleTaskCompletion(env.id, task.taskName, task.isCompleted)}
                        containerStyle={{ backgroundColor: 'transparent'}}
                      />
                      <TouchableOpacity style={styles.deleteButtonTask} onPress={() => handleDeleteTask(env.id, task.taskName)}>
                        <Icon name="trash-outline" type='ionicon'></Icon>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ))}
            </>
          ) : (
            <Text>No Details Found</Text>
          )}
          <Button title='LogOut' color={'red'} onPress={()=>handleLogOut()}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeZone: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // paddingTop: '10%',
  },
  detailContainer: {
    paddingTop:'10%',
    justifyContent: 'flex-start',
    backgroundColor:'#CCCCCC'
  },
  detailName: {
    flexDirection: 'row',
  },
  detailTextName: {
    textTransform:"capitalize",
    flex: 0.9,
    alignContent: 'flex-start',
    paddingLeft: 10,
    fontSize: 30,
  },
  detailTextNo: {
    flex: 0.1,
    alignContent: 'flex-end',
    paddingTop: '5%',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
  },
  progressContainer: {
    height: 20,
    backgroundColor: '476AF7',
    margin:10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0938F7',
  },
  container: {
    justifyContent: 'center',
    alignContent:'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  envContainer: {
    flex:1,
    marginBottom: 10,
    marginTop:10,
    padding: 10,
    borderRadius: 5,
  },
    envNameContainer:{
      paddingTop:2,
      paddingBottom:2,
      flexDirection:'row',
    },
      envName:{
        flex:0.9,
        fontSize:20,
        fontWeight:"500"
      },
      deleteButton: {
        flex:0.1,
      },
      editButton: {
        flex:0.1,
      },
    taskContainer: {
      paddingTop:2,
      flex:1,
      flexDirection: 'row',
    },
      taskNameContainer:{
        padding:10,
        flex:1,
        fontSize:15
      },
      checkbox: {
        flex:0.05,
        backgroundColor: 'transparent',
      },
      deleteButtonTask: {
        padding:10,
        flex:0.1,
      },
  
});

export default ProfilePage;
