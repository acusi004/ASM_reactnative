import {
  ActivityIndicator, Alert,
  FlatList,
  Image, Modal, Pressable, RefreshControl,
  SafeAreaView,
  StyleSheet, ToastAndroid,
  TouchableOpacity, TouchableWithoutFeedback,
  View
} from "react-native";

import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import * as url from "url";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";


import { createStackNavigator } from "@react-navigation/stack";
import { Popular } from "./Popular.tsx";
// @ts-ignore
export function TrangChu({navigation}) {

  const [product, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoadding] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const Stack = createStackNavigator();

  const New = ()=>{
    navigation.navigate('NewFeed');
  }


  const images = [
    require("../../Image/banner1.png"),
    require("../../Image/banner2.png"),
    require("../../Image/banner3.png"),
    require("../../Image/banner4.png")
  ];

  useEffect(() => {
    getListDataPopular();
    getListDataCategories();
    return () => {
    };
  }, []);



  const getListDataCategories = () => {
    const apiURL = "https://raw.githubusercontent.com/acusi004/Lab3_Ph35761/master/categories.json";
    fetch(apiURL)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        setCategories(data);
        console.log(data);
      }).catch((err)=>{
        console.log(err);
    }).finally(()=> setLoadding(false));
  }
  const getListDataPopular = () => {
    const apiURL = "https://65d06e41ab7beba3d5e315e1.mockapi.io/product";
    fetch(apiURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoadding(false)
        setProducts(data);
        console.log(data);
      }).catch((err) => {
      console.log(err);
    }).finally(() => setLoadding(false));
  };


  // categories
  // @ts-ignore
  function renderItemCategories({ item}) {

    return (
      <TouchableOpacity >
        <View style={[styles.card_categories, styles.shadowProp]}>
          <Image style={{width:40, height:40}} source={{ uri: item.image }} />
          <View style={{ flexDirection: "column" }}>

          </View>
        </View>
      </TouchableOpacity>

    );
  }


  // popular
  // @ts-ignore
  function renderItemPopular({ item }) {
    const detail = ()=>{
      navigation.navigate('Popular', {...item});
    }
    const deleteProduct=()=>{
      const  apiURl = 'https://65d06e41ab7beba3d5e315e1.mockapi.io/product/'+ item.id;
      fetch(apiURl,{
        method:"DELETE",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res)=>{
          return res.json();
            getListDataPopular()
        })
        .then((json)=>{
          console.log(json)
          getListDataCategories();
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    return (
      <TouchableOpacity  onPress={detail} onLongPress={()=>{
        Alert.alert(
          "Xóa sản phẩm",
          "Bạn có chắc chắn muốn xóa sản phẩm này?",
          [
            {
              text: "Không",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Có", onPress: () => {
                deleteProduct();
               getListDataPopular();
                ToastAndroid.show('xoa thanh cong', ToastAndroid.SHORT);
              } }
          ],
          { cancelable: false }
        )
      }}>
        <View style={[styles.card2, styles.shadowProp]}>
          <Image style={styles.products_img} source={{ uri: item.image }} />
          <View>
           <View style={{flexDirection:'row',}}>
             <Text style={styles.popular_titile}>{item.title}</Text>

           </View>
           <View style={{height:'100%', marginTop:10,}}>
             <Text style={{width:"80%"}}>{item.description}</Text>
             <Text style={{width:'100%',fontWeight:'bold' ,marginTop:8 }}>{item.price + " VND"}</Text>
           </View>
          </View>
        </View>
      </TouchableOpacity>

    );
  }

  const PullRfresh=()=>{
    setRefreshing(true);
    getListDataPopular();
    setRefreshing(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant={"titleMedium"} style={styles.title}>Hi, Hieu</Text>
            <Text variant={"titleMedium"}>Order & Eat</Text>
            <Swiper
              autoplay={true}
              autoplayTimeout={3}
              showsPagination={false}
            >
              {images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={image} style={styles.image} />
                </View>
              ))}
            </Swiper>
          </View>

          <View style={styles.nav}>

            <View>
              <Text variant={"titleMedium"} style={{ marginTop: 7, fontSize: 18, marginBottom: 14 }}>
                Categories
              </Text>


              {isLoading ? <ActivityIndicator /> : (
                <FlatList horizontal={true} data={categories} renderItem={renderItemCategories} showsHorizontalScrollIndicator={false}/>
              )}

             <View style={{flexDirection:'row', justifyContent:'space-between'}}>
               <Text variant={"titleMedium"} style={{ marginTop: 17, fontSize: 18, marginBottom: 14,}}>
                 Popular
               </Text>
               <TouchableOpacity onPress={New} style={{marginTop:7, width:50, height:50, backgroundColor:'white', borderRadius:20, justifyContent:'center', alignItems:'center', marginBottom:10}}>
                 <Icon color={'black'} size={20} name={'pencil'}/>
               </TouchableOpacity>
             </View>
              {
                isLoading ? <ActivityIndicator/> :(
                  <FlatList data={product} renderItem={renderItemPopular} showsVerticalScrollIndicator={false}
                            refreshing={refreshing}
                            onRefresh={PullRfresh}
                  />
                )}

            </View>


          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 10
  },
  header: {
    width: "100%",
    height: 250
  },
  title: {
    color: "orange",
    fontWeight: "bold"
  },
  slide: {
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 20
  },
  nav: {}, card: {
    padding: 10,
    width: 150,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    height: 170,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  products_img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    alignSelf:'center'
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5

  },
  card2: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    height: 150,
    flexDirection:'row'
  },
  card_categories: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height:80,
    width:80,
    margin:10
  },
  popular_titile:{
    fontWeight:'700',
    fontSize:20,
    marginTop:10,

  }


});
