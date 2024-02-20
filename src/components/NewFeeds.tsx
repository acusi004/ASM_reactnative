import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchCamera } from "react-native-image-picker";

// @ts-ignore
export function NewFeeds({navigation}){
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');





  // @ts-ignore
  const DangTin=()=>{
    fetch('https://65d06e41ab7beba3d5e315e1.mockapi.io/product',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        {
          title: title,
          price: price,
          description: description,
          image: image
        }
      )
    })

      .then((res)=>{
        return res.json();

      })
      .then((json)=>{
        console.log(json);
      })
  }

  return(
    <View style={styles.container}>
      {/*<View style={{flexDirection:'row', padding:10}}>*/}
      {/*  <TouchableOpacity  style={styles.camera}>*/}
      {/*    <Text style={{color:'black'}}>Upload from camera</Text>*/}
      {/*    <Icon color={'black'} size={25} name={'camera'}/>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.gallery}>*/}
      {/*    <Text style={{color:'black'}}>Upload from gallery</Text>*/}
      {/*    <Icon color={'black'} size={25} name={'picture-o'}/>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}

     <Image style={styles.img} source={{uri: image}}/>
      <TextInput
        label="Title"
        mode="outlined"
        style={{ margin: 10, width: "80%" }}
        cursorColor={"black"}
        activeOutlineColor={"black"}
        outlineStyle={{ borderRadius: 15 }}
        onChangeText={setTitle}
      />

      <TextInput
        label="Image"
        mode="outlined"
        style={{ margin: 10, width: "80%" }}
        cursorColor={"black"}
        activeOutlineColor={"black"}
        outlineStyle={{ borderRadius: 15 }}
        onChangeText={setImage}
      />
      <TextInput
        label="Price"
        mode="outlined"
        style={{ margin: 10, width: "80%" }}
        cursorColor={"black"}
        activeOutlineColor={"black"}
        outlineStyle={{ borderRadius: 15 }}
        onChangeText={setPrice}
        keyboardType={'number-pad'}
      />

      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        cursorColor={"black"}
        activeOutlineColor={"black"}
        outlineStyle={{ borderRadius: 15 }}
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
        label="description"
        mode="outlined"
        onChangeText={setDescription}
      />
      <TouchableOpacity onPress={()=>{
        DangTin();
        setPrice('');
        setDescription('');
        setTitle('');
        setImage('');
        navigation.goBack();
        ToastAndroid.show('Them thanh cong', ToastAndroid.SHORT);

      }} style={styles.post}>
        <Text style={{fontWeight:'bold'}}>POST</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  img:{
    width:'70%',
    height:250,
    borderRadius:20,

  },
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textArea:{
    height:150,
    width:'80%',

  },
  post:{
    backgroundColor:'orange',
    width:'70%',
    height:60,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
  },
  camera: {
    flexDirection:'column-reverse',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:15,
    width:'50%',
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    padding:10,
    marginRight:10
  },
  gallery: {
    flexDirection:'column-reverse',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:15,
    width:'50%',
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    padding:10,
  }

});
