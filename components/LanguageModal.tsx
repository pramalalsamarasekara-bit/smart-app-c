import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useLanguage, LANG_OPTIONS } from '../contexts/LanguageContext';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LanguageModal({ visible, onClose }: Props) {
  const { lang, changeLanguage, isRTL } = useLanguage();

  const handleSelect = async (key: any) => {
    try {
      await changeLanguage(key);
    } catch (e) {
      console.log('changeLanguage error', e);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        {/* outside touch to close */}
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.card, isRTL && styles.cardRTL]}>
          <Text style={[styles.title, isRTL && styles.titleRTL]}>
            Select language
          </Text>

          {LANG_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.option,
                option.key === lang && styles.optionActive,
              ]}
              onPress={() => handleSelect(option.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.optionText,
                  isRTL && styles.optionTextRTL,
                  option.key === lang && styles.optionTextActive,
                ]}
              >
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: '80%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    elevation: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
    }),
  },
  cardRTL: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 14,
    textAlign: 'center',
  },
  titleRTL: {
    textAlign: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 6,
  },
  optionActive: {
    backgroundColor: 'rgba(33,150,243,0.08)',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  optionTextRTL: {
    textAlign: 'right',
  },
  optionTextActive: {
    fontWeight: '700',
    color: '#2196F3',
  },
  closeBtn: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  closeText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
  },
});
