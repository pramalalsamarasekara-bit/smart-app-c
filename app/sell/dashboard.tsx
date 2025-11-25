import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard(){
  const router = useRouter();
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#F6F7FB'}}>
      <ScrollView contentContainerStyle={{padding:16,paddingBottom:32}}>
        <View style={s.row}>
          <Text style={s.title}>Seller Dashboard</Text>
          <TouchableOpacity onPress={()=>router.push('/sell/product-new')}><Text style={s.link}>+ Add Product</Text></TouchableOpacity>
        </View>
        {[
          {k:'Total Revenue', v:'$12,450'},
          {k:'Total Sales', v:'156'},
          {k:'Product Views', v:'8,920'},
          {k:'Average Rating', v:'4.7/5'},
        ].map(card=>(
          <View key={card.k} style={s.card}>
            <Text style={s.k}>{card.k}</Text>
            <Text style={s.v}>{card.v}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const s=StyleSheet.create({
  row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  title:{fontSize:22,fontWeight:'800',color:'#111827'},
  link:{color:'#1E88E5',fontWeight:'800'},
  card:{backgroundColor:'#fff',borderRadius:14,borderWidth:1,borderColor:'#E5E7EB',padding:12,marginTop:12},
  k:{color:'#6B7280'}, v:{color:'#111827',fontWeight:'800',fontSize:18},
});
