// app/settings/privacy.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PrivacyScreen() {
  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <View style={s.card}>
        <Text style={s.title}>Policy</Text>
        <Text style={s.text}>
          This app only displays merchants and their offers. Any issues that arise from your
          purchases or interactions must be resolved directly with the respective merchants.
          Smart Shopping App assumes no responsibility or liability for those dealings.
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7F9' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderColor: '#E5E7EB',
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
});
