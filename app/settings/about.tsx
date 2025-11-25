import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.logoContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={s.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={s.appName}>Smart Shopping</Text>
      <Text style={s.version}>Version 1.0.0</Text>

      <View style={s.card}>
        <Text style={s.sectionTitle}>About This App</Text>
        <Text style={s.desc}>
          Smart Shopping helps you find, buy, and sell products easily and securely. Enjoy advanced search, barcode/QR scanning, and a seamless shopping experience.
        </Text>
      </View>

      <View style={s.card}>
        <Text style={s.sectionTitle}>Contact & Support</Text>
        <Text style={s.desc}>
          For help or support, contact us at:{'\n'}
          <Text
            style={s.link}
            onPress={() => Linking.openURL('mailto:shoppingsmart296@gmail.com')}
          >
            shoppingsmart296@gmail.com
          </Text>
        </Text>
      </View>

      <View style={s.card}>
        <Text style={s.sectionTitle}>Developer</Text>
        <Text style={s.desc}>
          Rathna Samarasekara
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7F9' },
  content: { padding: 18, paddingBottom: 36 },
  logoContainer: { alignItems: 'center', marginBottom: 14 },
  logo: { width: 100, height: 100, borderRadius: 14, marginBottom: 0 },
  appName: { fontSize: 22, fontWeight: '800', color: '#1E88E5', marginBottom: 3, textAlign: 'center' },
  version: { color: '#6B7280', fontSize: 14, marginBottom: 12, textAlign: 'center' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderColor: '#E5E7EB',
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  desc: { color: '#6B7280', fontSize: 14, lineHeight: 20 },
  link: { color: '#1E88E5', textDecorationLine: 'underline' },
});