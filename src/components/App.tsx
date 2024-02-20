/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ManHinhChao } from "../components/ManHinhChao.tsx";
import { DangNhap } from "../components/DangNhap.tsx";
import { View } from "react-native";
import { DangKy } from "./DangKy.tsx";
import { ManHinhChinh } from "./ManHinhChinh.tsx";





const Stack = createStackNavigator();

function EmptyScreen() {
  return (
    <View>

    </View>
  )
}
function MyStack(){
  const isLoggedIn = true;
  return(
    <Stack.Navigator initialRouteName={'ManHinhChao'}>
      {isLoggedIn ?(
        <Stack.Group>
          <Stack.Screen  options={{headerShown:false}} name="ManHinhChao" component={ManHinhChao}/>
          <Stack.Screen options={{headerShown:false}} name="DangNhap" component={DangNhap}/>
        </Stack.Group>
      ):(
        <Stack.Group>
          <Stack.Screen name={'dang nhap'} component={EmptyScreen}/>
          <Stack.Screen name={'dang ky'} component={EmptyScreen}/>
        </Stack.Group>
      )}
      <Stack.Group>
        <Stack.Screen options={{headerShown:false}} name={'DangKy'} component={DangKy}/>
        <Stack.Screen options={{headerShown:false}} name={'ManHinhChinh'} component={ManHinhChinh}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default function App(){
  return(
    <NavigationContainer>
      <MyStack/>

    </NavigationContainer>
  )
}
