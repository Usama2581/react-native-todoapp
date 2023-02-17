// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios'


export default function App() {

  const [id, setId] = useState('')
  const [editMode, setEditMode] = useState('')
  const [text, setText] = useState('')
  const [todo, setTodo] = useState([])

  const addTodo = () => {
    if (!text) {
      alert("Enter a task")
    }
    else {
      axios.post('https://fair-pear-tadpole-garb.cyclic.app/todo/insert', { text })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    setText("")
  }

  useEffect(() => {
    axios.get('https://fair-pear-tadpole-garb.cyclic.app/todo/')
      .then(res => setTodo(res.data))
      .catch(err => console.log(err))
  }, [todo])


  const deleteToDo = (id) => {
    //  console.log(id)
    axios.delete(`https://fair-pear-tadpole-garb.cyclic.app/todo/delete/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const update = (id, text) => {
    setEditMode(true)
    setId(id)
    // console.log(uid)
    setText(text)
  }
  console.log(id)

  const updateTodo = () => {
    axios.put(`https://fair-pear-tadpole-garb.cyclic.app/todo/update/${id}`, { text })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    setText('')
    setEditMode(false)
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />
      <View style={styles.todobox}>
        <Text style={styles.task}>Task-{todo.length}</Text>
        {
          todo.map(item => {
            return <View style={styles.itembox}>
              <Text>{item.text}</Text>
              <View style={styles.iconbox}>
              <TouchableOpacity onPress={() => deleteToDo(item._id)}>
                <Image source={require('./assets/trash.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => update(item._id, item.text)}>
                <Image source={require('./assets/edit.png')}></Image>
              </TouchableOpacity>
            </View>
             </View>
          })
        }
      </View>
      <View style={styles.inputbox}>
        <TextInput style={styles.input}
          onChangeText={(e) => setText(e)}
          value={text}
        />
        {/* <Image></Image> */}
        {
          editMode ?
            <TouchableOpacity style={styles.updatebox} onPress={updateTodo}>
              <Image source={require('./assets/update.png')} style={styles.update}></Image>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.addbox}
              onPress={addTodo}
            >
              <Text style={styles.add}>+</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8EAED',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  todobox: {
    width: '90%',
    // borderWidth: 1,
    height: '50%',
  },
  itembox: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center'
  },
  inputbox: {
    width: '90%',
    position: 'absolute',
    bottom: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    // borderWidth: 1,
    width: '75%',
    height: 55,
    borderRadius: 10,
    fontSize: 17,
    padding: 5,
    backgroundColor: 'white'
  },
  addbox: {
    height: 60,
    width: '18%',
    backgroundColor: 'crimson',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  updatebox: {
    height: 60,
    width: '18%',
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add: {
    fontSize: 30,
    color: 'white'
  },
  task: {
    fontSize: 25,
    fontWeight: '500',
    alignSelf: 'flex-start',
    paddingBottom: 10
  },
  iconbox: {
    width: '25%',
    position: 'absolute',
    right: 0,
    // bottom: '50%',
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    // height: 100
  },
  update: {
    width: 25
  }
});
