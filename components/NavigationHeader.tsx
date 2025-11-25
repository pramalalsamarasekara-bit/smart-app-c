import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ArrowLeft, X, Home } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showHomeButton?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
  onHomePress?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export default function NavigationHeader({
  title,
  showBackButton = true,
  showCloseButton = false,
  showHomeButton = false,
  onBackPress,
  onClosePress,
  onHomePress,
  rightComponent,
  backgroundColor,
  textColor,
}: NavigationHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/' as any);
    }
  };

  const handleClosePress = () => {
    if (onClosePress) {
      onClosePress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/' as any);
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    } else {
      router.replace('/' as any);
    }
  };

  const headerBackgroundColor = backgroundColor || colors.background;
  const headerTextColor = textColor || colors.text;

  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top,
        backgroundColor: headerBackgroundColor,
        borderBottomColor: colors.border,
      }
    ]}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleBackPress}
              accessibilityLabel={t('goBack') || 'Go back'}
              testID="back-button"
            >
              <ArrowLeft size={24} color={headerTextColor} />
            </TouchableOpacity>
          )}
          {showCloseButton && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleClosePress}
              accessibilityLabel={t('close') || 'Close'}
              testID="close-button"
            >
              <X size={24} color={headerTextColor} />
            </TouchableOpacity>
          )}
          {showHomeButton && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleHomePress}
              accessibilityLabel={t('home') || 'Home'}
              testID="home-button"
            >
              <Home size={24} color={headerTextColor} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          {title && (
            <Text
              style={[
                styles.title,
                { color: headerTextColor }
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          )}
        </View>

        <View style={styles.rightSection}>
          {rightComponent}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});