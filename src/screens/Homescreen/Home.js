// Home.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.png";

const Home = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const onPressSignOut = () => {
    navigation.navigate("Login");
  };

  const addTask = () => {
    if (taskText.trim() !== '') {
      const updatedTasks = [...tasks, { text: taskText, id: Date.now() }];
      setTasks(updatedTasks);
      setTaskText('');
    }
  };

  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskText(taskToEdit.text);
    }
  };

  const updateTask = () => {
    if (taskText.trim() !== '') {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: taskText } : task
      );
      setTasks(updatedTasks);
      setTaskText('');
      setEditingTaskId(null);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setEditingTaskId(null); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskBox}>
        {editingTaskId === item.id ? (
          <TextInput
            style={styles.input}
            value={taskText}
            onChangeText={(text) => setTaskText(text)}
          />
        ) : (
          <Text style={styles.taskText}>{item.text}</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        {editingTaskId === item.id ? (
          <TouchableOpacity onPress={updateTask}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => editTask(item.id)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: 50, width: 50 }]}
        source={Logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
      />
      <Button text="Sign Out" type="TERTIARY" onPress={onPressSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#040D12",
  },

  logo: {
    marginBottom: 20,
  },

  input: {
    height: 40,
    width: "80%",
    borderColor: 'gray',
    backgroundColor: "#93B1A6",
    borderWidth: 1,
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 30,
    padding: 10,
    color: '#000',
  },

  addButton: {
    padding: 10,
    marginLeft: 120,
    backgroundColor: '#183D3D',
  },

  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '86%',
  },

  taskBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white', 
    padding: 10,
  },

  taskText: {
    color: 'black', 
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  editText: {
    color: 'yellow', 
    marginTop: 10,
    marginRight: 25,
    marginLeft: 50,
  },

  updateText: {
    color: 'green', 
    marginRight: 10,
  },

  deleteText: {
    color: 'red',
    backgroundColor: 'pink', 
    borderRadius: 20, 
    padding: 10, 
  },
});

export default Home;
