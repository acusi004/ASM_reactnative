import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput, Text } from "react-native-paper";
import {
  Alert,
  ImageBackground, StatusBar,
  StyleSheet, ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { DangKy } from "../../src/components/DangKy.tsx";
import { ManHinhChinh } from "../components/ManHinhChinh.tsx";


// @ts-ignore
export function DangNhap({ navigation }) {
  const [userError, setUserError] = useState(false);
  const [showPass, setPass] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const toggleShowPassword =  () => {
    setPass(!showPass);
  };
  const register=()=>{
    navigation.navigate('DangKy')
  }
  const MainActivitty=()=>{
    navigation.navigate('ManHinhChinh')
  }
  const Login=()=>{

  }
  const getDataUser=()=>{
    const ApiURL = "https://65d06e41ab7beba3d5e315e1.mockapi.io/userr";
    fetch(ApiURL)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        console.log(data);
      }).catch((err)=>{
        console.log(err);
    })
  }
  return (

    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ImageBackground resizeMode={"contain"} style={styles.bg_img} source={require("../../Image/bg.jpg")}>

      </ImageBackground>
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
          onChangeText={setPassword}

        />


        <TouchableOpacity style={styles.btn_getStart} onPress={()=>MainActivitty()}>
          <Text style={styles.btn_title}>LOGIN</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ alignSelf: "flex-end", paddingTop: 15, paddingRight: 5 }}>bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={()=> register()}>
            <Text style={{ alignSelf: "flex-end", paddingTop: 15, fontWeight: "bold" }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
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
  user: {
    borderWidth: 1,
    borderRadius: 10,
    color: "black",
    width: "70%"

  },
  bg_img: {
    flex: 1,
    width: "100%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center"

  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 100
  }


});
