import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Mic, MicOff, Trash2, Send, Info } from 'lucide-react-native';


import { useLanguage } from '../../contexts/LanguageContext';

import colors from '@/constants/colors';

export default function VoiceOrderScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLanguage();

  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');

  // NOTE:
  // Real voice recognition later addකරගන්න. දැන්
  // “Voice” library use නැති නිසා error එක නැතිව app run වෙනවා.
  const handleToggleRecording = () => {
    if (!isRecording) {
      // Start dummy recording
      setIsRecording(true);
    } else {
      // Stop dummy recording
      setIsRecording(false);
    }
  };

  const handleClear = () => {
    setText('');
  };

  const handleSend = () => {
    if (!text.trim()) {
      return;
    }

    // මෙතනින් පස්සේ order details වෙන screen එකකට යන්න පුළුවන්.
    // දැන්ට නම් simple alert / console log වගේ එකක් use කරන්න.
    console.log('Voice order text:', text);
    router.push('/cart');
  };

  const directionStyle = isRTL ? styles.rtl : null;

  return (
    <>
      <Stack.Screen
        options={{
          title: t('voiceOrder.title') || 'Voice Order',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Info / Welcome */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Info size={22} color={colors.primary} />
            <Text style={[styles.infoTitle, directionStyle]}>
              {t('voiceOrder.welcome') || 'Order with your voice'}
            </Text>
          </View>
          <Text style={[styles.infoText, directionStyle]}>
            {t('voiceOrder.description') ||
              'Tap the microphone button and speak your product name, quantity, and other details. You can edit the text before sending the order.'}
          </Text>
        </View>

        {/* Recording state */}
        <View style={styles.recordStateContainer}>
          <View
            style={[
              styles.recordStateDot,
              isRecording && styles.recordStateDotActive,
            ]}
          />
          <Text style={[styles.recordStateText, directionStyle]}>
            {isRecording
              ? t('voiceOrder.listening') || 'Listening... speak now'
              : t('voiceOrder.tapToStart') || 'Tap the mic to start recording'}
          </Text>
        </View>

        {/* Text area */}
        <View style={styles.textAreaContainer}>
          <Text style={[styles.label, directionStyle]}>
            {t('voiceOrder.orderTextLabel') || 'Order details'}
          </Text>
          <TextInput
            style={[styles.textArea, directionStyle]}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={text}
            onChangeText={setText}
            placeholder={
              t('voiceOrder.placeholder') ||
              'Example: 2kg Basmati Rice, 1L Sunflower Oil, 6 Cola cans...'
            }
            placeholderTextColor={colors.lightGray}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[
              styles.micButton,
              isRecording && styles.micButtonActive,
            ]}
            onPress={handleToggleRecording}
          >
            {isRecording ? (
              <MicOff size={26} color={colors.white} />
            ) : (
              <Mic size={26} color={colors.white} />
            )}
            <Text style={styles.micButtonText}>
              {isRecording
                ? t('voiceOrder.stop') || 'Stop'
                : t('voiceOrder.start') || 'Start'}
            </Text>
          </TouchableOpacity>

          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={handleClear}>
              <Trash2 size={22} color={colors.primary} />
              <Text style={styles.iconButtonText}>
                {t('voiceOrder.clear') || 'Clear'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.iconButton,
                text.trim().length === 0 && styles.iconButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={text.trim().length === 0}
            >
              <Send
                size={22}
                color={
                  text.trim().length === 0
                    ? colors.lightGray
                    : colors.primary
                }
              />
              <Text
                style={[
                  styles.iconButtonText,
                  text.trim().length === 0 && styles.iconButtonTextDisabled,
                ]}
              >
                {t('voiceOrder.send') || 'Send'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  rtl: {
    textAlign: 'right',
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
  },
  recordStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordStateDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginRight: 8,
  },
  recordStateDotActive: {
    backgroundColor: 'red',
  },
  recordStateText: {
    fontSize: 14,
    color: colors.text,
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textArea: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: colors.white,
    color: colors.text,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  micButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  micButtonActive: {
    backgroundColor: '#D32F2F',
  },
  micButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  rightButtons: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 8,
  },
  iconButtonDisabled: {
    opacity: 0.5,
  },
  iconButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  iconButtonTextDisabled: {
    color: colors.lightGray,
  },
});
