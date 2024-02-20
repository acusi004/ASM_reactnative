import { View } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TrangChu } from "./TrangChu.tsx";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GioHang } from "./GioHang.tsx";
import { DonHang } from "./DonHang.tsx";
import { CaNhan } from "./CaNhan.tsx";
import { createStackNavigator } from "@react-navigation/stack";
import { Popular } from "./Popular.tsx";
import { NewFeeds } from "./NewFeeds.tsx";

const Tab = createMaterialBottomTabNavigator();
const  Stack = createStackNavigator();




// ham nay dung de tab lồng stack
const DetailProducts =()=>{
  return(
    <Stack.Navigator >
      <Stack.Screen options={{headerShown:false}} name="TrangChu" component={TrangChu}/>
      <Stack.Screen options={{headerShown:false}} name="Popular" component={Popular}/>
      <Stack.Screen options={{headerShown:false}} name="NewFeed" component={NewFeeds}/>
    </Stack.Navigator>
  )
}

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="TrangChu"
      activeColor="orange"
      inactiveColor="grey"
      labeled={false}
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="TrangChu"
        component={DetailProducts}
        options={{tabBarLabel: "Trang Chủ",tabBarIcon: ()=>(
          <MaterialCommunityIcons name={'home'} color={'black'} size={26}/>
          ),
        }}
        />

      <Tab.Screen
        name="GioHang"
        component={GioHang}
        options={{tabBarLabel: "Giỏ Hàng",tabBarIcon: ()=>(
            <MaterialCommunityIcons name={'cart'} color={'black'} size={26}/>
          ),
        }}
      />
      <Tab.Screen
        name="DonHang"
        component={DonHang}
        options={{tabBarLabel: "Đơn hàng",tabBarIcon: ()=>(
            <MaterialCommunityIcons name={'shopping'} color={'black'} size={26}/>
          ),
        }}
      />
      <Tab.Screen
        name="CaNhan"
        component={CaNhan}
        options={{tabBarLabel: "Cá nhân",tabBarIcon: ()=>(
            <MaterialCommunityIcons name={'account'} color={'black'} size={26}/>
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export function ManHinhChinh() {
  return (
   <MyTab/>
  );
}

