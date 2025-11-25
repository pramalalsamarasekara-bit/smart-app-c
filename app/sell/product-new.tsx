import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProductNew() {
  const router = useRouter();
  return (
    <SafeAreaView style={s.container}>
      <View style={s.wrap}>
        <Text style={s.title}>Post an Ad</Text>
        <Text style={s.sub}>Simple placeholder form. Add fields later.</Text>

        <TouchableOpacity style={s.btn} onPress={()=>router.push('/sell/upgrade')}>
          <Text style={s.btnTxt}>Choose a Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#F6F7FB'},
  wrap:{padding:16},
  title:{fontSize:22,fontWeight:'800',color:'#111827'},
  sub:{color:'#6B7280',marginTop:6},
  btn:{marginTop:16,backgroundColor:'#1E88E5',borderRadius:12,alignItems:'center',paddingVertical:14},
  btnTxt:{color:'#fff',fontWeight:'800'},
});
