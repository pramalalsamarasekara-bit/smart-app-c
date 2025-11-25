import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Smartphone, Zap, Volume2, Vibrate, Download } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function PreferencesScreen() {
  const router = useRouter();
  const [autoSync, setAutoSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const preferenceSettings = [
    {
      icon: <Zap size={24} color={colors.primary} />,
      title: 'Auto Sync',
      subtitle: 'Automatically sync data when connected',
      value: autoSync,
      onToggle: setAutoSync,
    },
    {
      icon: <Download size={24} color={colors.primary} />,
      title: 'Offline Mode',
      subtitle: 'Enable offline browsing capabilities',
      value: offlineMode,
      onToggle: setOfflineMode,
    },
    {
      icon: <Vibrate size={24} color={colors.primary} />,
      title: 'Haptic Feedback',
      subtitle: 'Feel vibrations when interacting with the app',
      value: hapticFeedback,
      onToggle: setHapticFeedback,
    },
    {
      icon: <Volume2 size={24} color={colors.primary} />,
      title: 'Sound Effects',
      subtitle: 'Play sounds for app interactions',
      value: soundEffects,
      onToggle: setSoundEffects,
    },
    {
      icon: <Smartphone size={24} color={colors.primary} />,
      title: 'Auto Download Images',
      subtitle: 'Download product images automatically',
      value: autoDownload,
      onToggle: setAutoDownload,
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'App Preferences',
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Customize your app experience</Text>
          
          {preferenceSettings.map((setting, index) => (
            <View key={index} style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                {setting.icon}
                <View style={styles.settingItemText}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
                </View>
              </View>
              
              <Switch
                value={setting.value}
                onValueChange={setting.onToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={setting.value ? colors.white : colors.lightGray}
              />
            </View>
          ))}

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Performance Tips</Text>
            <Text style={styles.infoText}>
              • Disable auto-sync to save battery life{'\n'}
              • Enable offline mode for better performance in low connectivity areas{'\n'}
              • Turn off haptic feedback to extend battery life{'\n'}
              • Disable auto-download to save mobile data
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});