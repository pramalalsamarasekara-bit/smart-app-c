import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, Bell, MessageSquare, ShoppingCart, Tag } from 'lucide-react-native';

const STORAGE = {
  NOTIF: '@settings_notifs',
  ORDER: '@notif_order_updates',
  PROMO: '@notif_promotions',
  NEWP:  '@notif_new_products',
  PRICE: '@notif_price_alerts',
};

const colors = {
  background: '#F6F7F9',
  primary:   '#1E88E5',
  text:      '#111827',
  white:     '#FFFFFF',
  border:    '#E5E7EB',
  shadow:    '#000000',
  lightGray: '#E5E7EB',
};

export default function NotificationsScreen() {
  const router = useRouter();

  const [master, setMaster]             = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions]     = useState(false);
  const [newProducts, setNewProducts]   = useState(true);
  const [priceAlerts, setPriceAlerts]   = useState(false);

  const readOrInit = async (key: string, def: boolean, setter: (v: boolean)=>void) => {
    const v = await AsyncStorage.getItem(key);
    if (v == null) {
      await AsyncStorage.setItem(key, def ? 'true' : 'false');
      setter(def);
    } else {
      setter(v === 'true');
    }
  };

  useEffect(() => {
    (async () => {
      await readOrInit(STORAGE.NOTIF, master, setMaster);
      await readOrInit(STORAGE.ORDER, orderUpdates, setOrderUpdates);
      await readOrInit(STORAGE.PROMO, promotions, setPromotions);
      await readOrInit(STORAGE.NEWP, newProducts, setNewProducts);
      await readOrInit(STORAGE.PRICE, priceAlerts, setPriceAlerts);

      // snapshot log (mount වෙද්දි බලාගන්න)
      const snapshot = {
        master: await AsyncStorage.getItem(STORAGE.NOTIF),
        order:  await AsyncStorage.getItem(STORAGE.ORDER),
        promo:  await AsyncStorage.getItem(STORAGE.PROMO),
        newp:   await AsyncStorage.getItem(STORAGE.NEWP),
        price:  await AsyncStorage.getItem(STORAGE.PRICE),
      };
      console.log('NOTIF_PREF', snapshot);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // DEBUG: save + log (QR window එකේ පේනවා)
  const save = async (key: string, v: boolean) => {
    console.log('NOTIF_PREF', key, v);
    await AsyncStorage.setItem(key, v ? 'true' : 'false');
  };

  const settingRows = [
    {
      icon: <ShoppingCart size={24} color={colors.primary} />,
      title: 'Order Updates',
      subtitle: 'Get notified about order status changes',
      value: orderUpdates,
      onToggle: async (v: boolean) => { setOrderUpdates(v); await save(STORAGE.ORDER, v); },
    },
    {
      icon: <Tag size={24} color={colors.primary} />,
      title: 'Promotions & Offers',
      subtitle: 'Receive special deals and discounts',
      value: promotions,
      onToggle: async (v: boolean) => { setPromotions(v); await save(STORAGE.PROMO, v); },
    },
    {
      icon: <MessageSquare size={24} color={colors.primary} />,
      title: 'New Products',
      subtitle: 'Be the first to know about new arrivals',
      value: newProducts,
      onToggle: async (v: boolean) => { setNewProducts(v); await save(STORAGE.NEWP, v); },
    },
    {
      icon: <Bell size={24} color={colors.primary} />,
      title: 'Price Alerts',
      subtitle: 'Get notified when prices drop',
      value: priceAlerts,
      onToggle: async (v: boolean) => { setPriceAlerts(v); await save(STORAGE.PRICE, v); },
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Notification Settings',
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.settingItem, { marginBottom: 18 }]}>
            <View style={styles.settingItemLeft}>
              <Bell size={24} color={colors.primary} />
              <View style={styles.settingItemText}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive notifications on your device</Text>
              </View>
            </View>
            <Switch
              value={master}
              onValueChange={async (v) => { setMaster(v); await save(STORAGE.NOTIF, v); }}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={master ? colors.white : colors.lightGray}
            />
          </View>

          {settingRows.map((setting, index) => (
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
                disabled={!master}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={setting.value ? colors.white : colors.lightGray}
              />
            </View>
          ))}

          {!master && (
            <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 12 }}>
              Enable Push Notifications to manage individual preferences.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: colors.background },
  backButton:      { padding: 8, marginLeft: -8 },
  scrollContainer: { flex: 1 },
  content:         { padding: 16 },
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
  settingItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingItemText: { marginLeft: 16, flex: 1 },
  settingTitle:    { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 2 },
  settingSubtitle: { fontSize: 14, color: '#666' },
});
