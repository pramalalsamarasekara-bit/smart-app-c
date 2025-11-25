import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Checkout(){
  const { plan } = useLocalSearchParams<{plan?:string}>();
  const price = plan==='14'?8:5;
  const days  = plan==='14'?14:7;
  const router = useRouter();

  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#F6F7FB'}}>
      <View style={{padding:16}}>
        <Text style={{fontSize:18,fontWeight:'800',color:'#111827'}}>Order Summary</Text>

        <View style={s.card}>
          <Text style={s.title}>{days} Days Plan</Text>
          <Text style={s.sub}>Enhanced visibility • Analytics • Support</Text>
          <View style={s.row}><Text style={s.k}>Total</Text><Text style={s.v}>${price}</Text></View>
        </View>

        <Text style={{marginTop:12,color:'#6B7280'}}>Payment Method</Text>
        <View style={s.card}><Text>Credit / Debit Card</Text></View>

        <TouchableOpacity style={s.pay} onPress={()=>router.replace('/sell/dashboard')}>
          <Text style={{color:'#fff',fontWeight:'800'}}>Pay ${price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const s=StyleSheet.create({
  card:{backgroundColor:'#fff',borderRadius:12,borderWidth:1,borderColor:'#E5E7EB',padding:12,marginTop:10},
  title:{fontWeight:'800',color:'#111827'},
  sub:{color:'#6B7280',marginTop:4},
  row:{flexDirection:'row',justifyContent:'space-between',marginTop:10},
  k:{color:'#6B7280'}, v:{color:'#1E88E5',fontWeight:'800'},
  pay:{marginTop:16,backgroundColor:'#1E88E5',borderRadius:12,alignItems:'center',paddingVertical:14},
});
