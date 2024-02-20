import { Alert, Image, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export function Popular({ route }) {
  const { title, price, description, image, id } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <View style={{flex:2}}>
        <Image style={styles.img} source={{ uri: image }} resizeMode={"stretch"} />
        <View style={styles.content}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.text}>{title}</Text>
            <Text style={[styles.gia]}>{price+ " VND"}</Text>
          </View>
          <View>
            <Text style={{color:'black', paddingTop:20, fontSize:16}}>{description}</Text>
          </View>

        </View>

      </View>
      <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress={()=> ToastAndroid.show('Thêm thành công'+ " "+title , ToastAndroid.SHORT )} style={styles.btnCart}>
          <Text style={{fontWeight:'bold'}}>ADD CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  img: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  content: {
    flex: 1,
    padding:15,

  },
  text:{
    fontSize:27,
    fontWeight:'bold',
    color:'black',
    width:'70%'
  },
  gia:{
    fontSize:18,
    color:'orange',
    fontWeight:'bold',
    marginTop:8,
    width:'30%'
  },
  btnCart:{
    backgroundColor:'orange',
    width:'70%',
    height:60,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'

  }
});
