import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DangNhap } from "./DangNhap.tsx";


// @ts-ignore
export function ManHinhChao({navigation}){

  const chuyenManHinh=()=>{
    navigation.navigate(DangNhap)
  }

  return(
    <View style={styles.container}>
      <View style={styles.bg_manHinhChao}>
        <Image style={styles.bg_logo} source={require('../../Image/logo_fastfood.jpg')}/>
      </View>

      <View style={{flexDirection:'row', flex:1, alignItems:'center',justifyContent:'center' }}>

        <TouchableOpacity  style={styles.btn_getStart} onPress={chuyenManHinh}>
          <Text style={styles.btn_title}>GET STARTED</Text>
        </TouchableOpacity>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  bg_manHinhChao:{
    backgroundColor:'#FF8B02',
    height:'78%',
    borderBottomEndRadius:50,
    borderBottomStartRadius:50,
    justifyContent:'center',
    alignItems:'center'
  },
  bg_logo:{
    width:270,
    height:270,
    borderRadius:42,


  }, btn_getStart:{
    backgroundColor:'#FF8B02',
    height:60,
    width:'60%',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  },
  btn_title:{
    fontWeight:'bold',
    color:'white',

  }


});
