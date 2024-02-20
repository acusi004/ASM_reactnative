import { Alert, Button, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
// @ts-ignore
export function DangKy({navigation}){

  const [Data, setData] = useState([]);
  const [showPass, setPass] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPassWord] = useState('');
  const [rePass, setRePass] = useState('');
  const toggleShowPassword = () => {
    setPass(!showPass);
  };
  const dangNhap=()=>{
    navigation.navigate('DangNhap');
  }
  const getAllUser=()=>{
    const apiURL = "https://65d06e41ab7beba3d5e315e1.mockapi.io/userr";
    fetch(apiURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      }).catch((err) => {
      console.log(err);
    })
  }
  const PostUser=()=>{
    fetch('https://65d06e41ab7beba3d5e315e1.mockapi.io/userr',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        {
          username: user,
          password: pass
        }
      )
    })
      .then(res=>res.json())
      .then(()=> Alert.alert('Successfully'))
  }
  return(
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          label="Username"
          left={<TextInput.Icon icon={"account"} />}
          mode="outlined"
          style={{ margin: 10, width: "80%" }}
          cursorColor={"black"}
          activeOutlineColor={"black"}
          outlineStyle={{ borderRadius: 15 }}
          onChangeText={setUser}
        />
        <TextInput
          label="Password"
          left={<TextInput.Icon icon={"lock"} />}
          mode="outlined"
          style={{ margin: 10, width: "80%" }}
          right={<TextInput.Icon icon={showPass ? "eye-off" : "eye"} onPress={()=>toggleShowPassword()} />}
          secureTextEntry={!showPass}
          activeOutlineColor={"black"}
          outlineStyle={{ borderRadius: 15 }}
          onChangeText={setPassWord}
        />
        <TextInput
          label="RePassword"
          left={<TextInput.Icon icon={"lock"} />}
          mode="outlined"
          style={{ margin: 10, width: "80%" }}
          right={<TextInput.Icon icon={showPass ? "eye-off" : "eye"} onPress={()=>toggleShowPassword()}/>}
          secureTextEntry={!showPass}
          activeOutlineColor={"black"}
          outlineStyle={{ borderRadius: 15 }}
          onChangeText={setRePass}
        />

        <TouchableOpacity style={styles.btn_getStart} onPress={()=> {
          if(rePass != pass){
            ToastAndroid.show('mat khau nhap lai khong dung', ToastAndroid.SHORT);
          }else {
            PostUser();
            setUser('');
            setPassWord('');
            setRePass('');
            dangNhap();
          }

        }}>
          <Text style={styles.btn_title}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 100
  },
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  btn_getStart: {
    backgroundColor: "#FF8B02",
    height: 60,
    width: "60%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  btn_title: {
    fontWeight: "bold",
    color: "white"

  },
})
