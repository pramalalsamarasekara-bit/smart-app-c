import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function HelpScreen() {
  const router = useRouter();

  const handleEmail = () => {
  Linking.openURL('mailto:info.smartshop@gmail.com?subject=Smart%20Shopping%20Help&body=Hello%20support%2C');
};
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>
          If you need help, contact our support team via email or check out the FAQ in the app settings.
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleEmail}>
            <Text style={styles.primaryText}>Email Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/settings')}>
            <Text style={styles.secondaryText}>Open Settings / FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostBtn} onPress={() => router.back()}>
            <Text style={styles.ghostText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12, color: '#111' },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 22 },
  actions: { marginTop: 28, width: '100%', gap: 12 },
  primaryBtn: { backgroundColor: '#1E88E5', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondaryBtn: { backgroundColor: '#FFE082', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  secondaryText: { color: '#3a3a3a', fontSize: 16, fontWeight: '600' },
  ghostBtn: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  ghostText: { color: '#666', fontSize: 14, fontWeight: '500' },
});
