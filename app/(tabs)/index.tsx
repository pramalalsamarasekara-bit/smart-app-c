// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import Svg, { Polygon, Rect } from 'react-native-svg';
import {
  Search,
  Camera,
  QrCode,
  Barcode,
  Mic,
  Bot,
  Heart,
  HelpCircle,
  Settings,
  Info,
  ShoppingCart,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Store } from 'lucide-react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageModal from '../../components/LanguageModal';
import AdBanner from '../../components/AdBanner';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // 🟢 LANGUAGE CONTEXT
  const { t, isRTL, isReady, languages, lang } = useLanguage();
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    console.log('HomeScreen mounted, lang:', lang);
  }, [lang]);

  if (!isReady) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>{t('loading') || 'Loading...'}</Text>
      </View>
    );
  }

  const handleButtonPress = (route: string) => router.push(route as any);
  const currentLangName =
    languages.find(l => l.key === lang)?.name ?? t('language') ?? 'Language';

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <StatusBar
          backgroundColor="#1E88E5"
          barStyle="light-content"
          translucent={false}
        />
      )}

      {/* Background */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 100 200"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Rect x="0" y="0" width="100" height="60" fill="#2196F3" />
          <Polygon points="0,43 100,86 100,136 0,93" fill="#FFD600" />
          <Polygon points="0,93 100,136 100,200 0,200" fill="#2196F3" />
        </Svg>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 160, 200) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerSection}>
          <Text style={[styles.welcomeText, isRTL && styles.welcomeTextRTL]}>
            {t('welcomeTitle')}
          </Text>

          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://i.postimg.cc/KmrhHbnp/icon.png' }}
              style={[
                styles.logoImage,
                Platform.OS === 'android' && styles.logoImageAndroid,
              ]}
              contentFit="contain"
            />
            <Text
              style={[styles.subtitleText, isRTL && styles.subtitleTextRTL]}
            >
              {t('welcomeSubtitle')}
            </Text>
          </View>

          {/* Language Button */}
          <TouchableOpacity
            style={[styles.languageButton, isRTL && styles.languageButtonRTL]}
            onPress={() => setShowLang(true)}
          >
            <Text style={styles.languageButtonText}>
              🌐 {currentLangName}
            </Text>
          </TouchableOpacity>
        </View>

        {/* MAIN ACTIONS */}
        <View style={styles.actionsSection}>
          <View style={styles.buttonGrid}>
            {/* SEARCH */}
            <TouchableOpacity
              style={[styles.actionButton, styles.searchButton]}
              onPress={() => handleButtonPress('/(tabs)/search')}
            >
              <Search size={40} color="#FFFFFF" />
              <Text
                style={[styles.buttonText, isRTL && styles.buttonTextRTL]}
              >
                {t('search')}
              </Text>
            </TouchableOpacity>

            {/* VOICE + IMAGE */}
            <View style={[styles.buttonRow, isRTL && styles.buttonRowRTL]}>
              <TouchableOpacity
                style={[styles.actionButton, styles.voiceButton]}
                onPress={() => handleButtonPress('/(tabs)/voice-order')}
              >
                <Mic size={40} color="#FFFFFF" />
                <Text
                  style={[styles.buttonText, isRTL && styles.buttonTextRTL]}
                >
                  {t('voiceSearch')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.imageButton]}
                onPress={() => handleButtonPress('/scan-image')}
              >
                <Camera size={40} color="#FFFFFF" />
                <Text
                  style={[styles.buttonText, isRTL && styles.buttonTextRTL]}
                >
                  {t('scanImage')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* COMBINED SCANNER */}
            <View style={[styles.buttonRow, isRTL && styles.buttonRowRTL]}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.scanButton,
                  {
                    flex: 1,
                    backgroundColor: '#FF9800',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  },
                ]}
                onPress={() => handleButtonPress('/(tabs)/scan')}
              >
                <Barcode size={35} color="#FFFFFF" />
                <QrCode size={35} color="#FFFFFF" />
                <Text
                  style={[styles.buttonText, isRTL && styles.buttonTextRTL]}
                >
                  {t('scanQr')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* AI Assistant */}
            <TouchableOpacity
              style={[styles.actionButton, styles.aiButton]}
              onPress={() => handleButtonPress('/(tabs)/assistant')}
            >
              <Bot size={40} color="#FFFFFF" />
              <Text
                style={[styles.buttonText, isRTL && styles.buttonTextRTL]}
              >
                {t('aiAssistant')}
              </Text>
            </TouchableOpacity>

            {/* MARKET */}
            <TouchableOpacity
              style={[styles.actionButton, styles.marketButton]}
              onPress={() => handleButtonPress('/(tabs)/market')}
            >
              <Store size={40} color="#FFFFFF" />
              <Text
                style={[styles.buttonText, isRTL && styles.buttonTextRTL]}
              >
                {t('marketplace')}
              </Text>
            </TouchableOpacity>

            {/* ADS */}
            <View style={{ marginTop: 14 }}>
              <AdBanner />
            </View>
          </View>
        </View>

        {/* QUICK ACCESS */}
        <View style={styles.quickAccessSection}>
          <Text
            style={[styles.sectionTitle, isRTL && styles.sectionTitleRTL]}
          >
            ⚡ {t('quickAccess') || 'Quick Access'}
          </Text>

          <View style={styles.quickAccessGrid}>
            <QuickPill
              icon={<ShoppingCart size={20} color="#16A34A" />}
              label={t('cart')}
              onPress={() => handleButtonPress('/cart')}
            />
            <QuickPill
              icon={<Heart size={20} color="#E91E63" />}
              label={t('favorites')}
              onPress={() => handleButtonPress('/favorites')}
            />
            <QuickPill
              icon={<HelpCircle size={20} color="#2196F3" />}
              label={t('helpAndSupport')}
              onPress={() => handleButtonPress('/help')}
            />
            <QuickPill
              icon={<Settings size={20} color="#607D8B" />}
              label={t('settings')}
              onPress={() => handleButtonPress('/settings')}
            />
            <QuickPill
              icon={<Info size={20} color="#795548" />}
              label={t('aboutApp')}
              onPress={() => handleButtonPress('/settings/about')}
            />
          </View>
        </View>
      </ScrollView>

      {/* LANGUAGE MODAL */}
      <LanguageModal
        visible={showLang}
        onClose={() => setShowLang(false)}
      />
    </View>
  );
}

// QUICK ACCESS BUTTON COMPONENT
function QuickPill({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.quickAccessButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={styles.quickAccessText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------- STYLES (UNCHANGED) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2196F3' },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
  },
  loadingText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  scrollContainer: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.select({ android: 24, default: 40 }),
  },
  headerSection: { alignItems: 'center', marginBottom: 32 },
  welcomeText: {
    fontSize: Platform.select({ android: 34, default: 36 }),
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: Platform.select({ android: 20, default: 24 }),
    textAlign: 'center',
  },
  welcomeTextRTL: { textAlign: 'center' },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoImage: {
    height: Platform.select({ android: 180, default: 200 }),
    width: Platform.select({ android: 180, default: 200 }),
  },
  logoImageAndroid: { height: 250, width: 250, marginBottom: 12 },
  subtitleText: {
    fontSize: Platform.select({ android: 17, default: 18 }),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: Platform.select({ android: 10, default: 12 }),
  },
  subtitleTextRTL: { textAlign: 'center' },
  actionsSection: { marginBottom: 32 },
  buttonGrid: { gap: 16 },
  buttonRow: { flexDirection: 'row', gap: 16 },
  buttonRowRTL: { flexDirection: 'row-reverse' },
  actionButton: {
    flex: 1,
    height: Platform.select({ android: 110, default: 100 }),
    borderRadius: Platform.select({ android: 24, default: 20 }),
    justifyContent: 'center',
    alignItems: 'center',
    gap: Platform.select({ android: 14, default: 12 }),
    elevation: Platform.select({ android: 10, default: 0 }),
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    height: Platform.select({ android: 130, default: 120 }),
  },
  scanButton: { backgroundColor: '#FF9800' },
  voiceButton: { backgroundColor: '#FF5722' },
  imageButton: { backgroundColor: '#00BCD4' },
  aiButton: {
    backgroundColor: '#673AB7',
    height: Platform.select({ android: 130, default: 120 }),
  },
  marketButton: { backgroundColor: '#00BFA6', marginTop: 12 },
  quickAccessSection: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitleRTL: { textAlign: 'center' },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  quickAccessButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    minWidth: 100,
  },
  quickAccessText: { fontSize: 14, fontWeight: '600', color: '#333333' },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Platform.select({ android: 15, default: 16 }),
    fontWeight: '700',
    textAlign: 'center',
  },
  languageButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 6,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(30,136,229,0.2)',
  },
  languageButtonRTL: { flexDirection: 'row-reverse' },
  languageButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },
});
