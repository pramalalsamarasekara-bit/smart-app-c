import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Platform, Image, ActionSheetIOS } from 'react-native';
import { User, Settings, Heart, Search, HelpCircle, LogOut, LogIn, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const { colors } = useTheme();
  const [isGuest, setIsGuest] = useState(true); // In a real app, this would come from auth state
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const handleMenuPress = (action: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    switch (action) {
      case 'settings':
        router.push('/settings');
        break;
      case 'favorites':
        router.push('/favorites');
        break;
      case 'history':
        router.push('/orders');
        break;
      case 'help':
        router.push('/help');
        break;
      case 'signout':
        handleSignOut();
        break;
      case 'signin':
        handleSignIn();
        break;
      default:
        console.log(`${action} pressed`);
    }
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleSignOut = () => {
    Alert.alert(
      t('signOut'),
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: t('signOut'),
          style: 'destructive',
          onPress: () => {
            setIsGuest(true);
            setProfileImage(null);
            router.push('/(tabs)');
            setTimeout(() => {
              Alert.alert('Signed Out', 'You have been signed out successfully.');
            }, 500);
          }
        }
      ]
    );
  };

  const showImagePickerOptions = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const options = ['Take Photo', 'Choose from Gallery', 'Cancel'];
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex: 2, title: 'Select Profile Photo' },
        (buttonIndex) => {
          if (buttonIndex === 0) handleTakePhoto();
          else if (buttonIndex === 1) handleChooseFromGallery();
        }
      );
    } else {
      Alert.alert(
        'Select Profile Photo',
        'Choose how you want to set your profile photo',
        [
          { text: 'Take Photo', onPress: handleTakePhoto },
          { text: 'Choose from Gallery', onPress: handleChooseFromGallery },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status: currentStatus } = await ImagePicker.getCameraPermissionsAsync();
      if (currentStatus !== 'granted') {
        const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Camera Permission Required', 'This app needs camera access to take photos. Please enable camera permission in your device settings.', [{ text: 'OK' }]);
          return;
        }
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Camera Error', 'Failed to open camera. Please make sure the camera is available and try again.', [{ text: 'OK' }]);
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      const { status: currentStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (currentStatus !== 'granted') {
        const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Photo Library Permission Required', 'This app needs photo library access to select images. Please enable photo library permission in your device settings.', [{ text: 'OK' }]);
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
      }
    } catch (error) {
      console.error('Error choosing from gallery:', error);
      Alert.alert('Gallery Error', 'Failed to open photo library. Please try again.', [{ text: 'OK' }]);
    }
  };

  const menuItems = [
    { icon: <Settings size={Platform.select({ android: 22, default: 24 })} color={colors.text} />, title: t('settings'), onPress: () => handleMenuPress('settings') },
    { icon: <Heart size={Platform.select({ android: 22, default: 24 })} color={colors.text} />, title: t('favorites'), onPress: () => handleMenuPress('favorites') },
    { icon: <Search size={Platform.select({ android: 22, default: 24 })} color={colors.text} />, title: t('searchHistory'), onPress: () => handleMenuPress('history') },
    { icon: <HelpCircle size={Platform.select({ android: 22, default: 24 })} color={colors.text} />, title: t('helpSupport'), onPress: () => handleMenuPress('help') },
    { icon: <LogOut size={Platform.select({ android: 22, default: 24 })} color={colors.error} />, title: t('signOut'), onPress: () => handleMenuPress('signout') },
  ];

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: Platform.select({ android: 20, default: 16 }) },
    title: { fontSize: Platform.select({ android: 22, default: 24 }), fontWeight: Platform.select({ android: '800', default: 'bold' }), color: colors.text },
    titleRTL: { textAlign: 'right' },
    profileSection: { alignItems: 'center', padding: Platform.select({ android: 20, default: 24 }), backgroundColor: colors.cardBackground, marginHorizontal: Platform.select({ android: 12, default: 16 }), marginBottom: Platform.select({ android: 20, default: 24 }), borderRadius: Platform.select({ android: 12, default: 16 }), elevation: Platform.select({ android: 3, default: 0 }), shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: Platform.select({ android: 0, default: 0.2 }), shadowRadius: Platform.select({ android: 0, default: 2 }) },
    avatarContainer: { width: Platform.select({ android: 105, default: 100 }), height: Platform.select({ android: 105, default: 100 }), borderRadius: Platform.select({ android: 52.5, default: 50 }), backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: Platform.select({ android: 18, default: 16 }), position: 'relative', overflow: 'hidden', elevation: Platform.select({ android: 2, default: 0 }) },
    profileImage: { width: Platform.select({ android: 105, default: 100 }), height: Platform.select({ android: 105, default: 100 }), borderRadius: Platform.select({ android: 52.5, default: 50 }) },
    cameraIconContainer: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: Platform.select({ android: 14, default: 12 }), width: Platform.select({ android: 28, default: 24 }), height: Platform.select({ android: 28, default: 24 }), justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.white, elevation: Platform.select({ android: 2, default: 0 }) },
    userName: { fontSize: Platform.select({ android: 18, default: 20 }), fontWeight: Platform.select({ android: '800', default: 'bold' }), color: colors.text, marginBottom: 4 },
    userNameRTL: { textAlign: 'center' },
    userEmail: { fontSize: Platform.select({ android: 13, default: 14 }), color: colors.textSecondary },
    userEmailRTL: { textAlign: 'center' },
    guestMessage: { fontSize: Platform.select({ android: 13, default: 14 }), color: colors.textSecondary, marginBottom: Platform.select({ android: 18, default: 16 }), textAlign: 'center' },
    guestMessageRTL: { textAlign: 'center' },
    signInButton: { backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Platform.select({ android: 22, default: 20 }), paddingVertical: Platform.select({ android: 14, default: 12 }), borderRadius: 25, gap: Platform.select({ android: 10, default: 8 }), elevation: Platform.select({ android: 3, default: 0 }), shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: Platform.select({ android: 0, default: 0.2 }), shadowRadius: Platform.select({ android: 0, default: 2 }) },
    signInButtonText: { color: colors.white, fontSize: Platform.select({ android: 15, default: 16 }), fontWeight: Platform.select({ android: '700', default: '600' }) },
    menuSection: { paddingHorizontal: Platform.select({ android: 12, default: 16 }) },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cardBackground, padding: Platform.select({ android: 18, default: 16 }), marginBottom: Platform.select({ android: 10, default: 8 }), borderRadius: Platform.select({ android: 8, default: 12 }), elevation: Platform.select({ android: 2, default: 0 }), shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: Platform.select({ android: 0, default: 0.1 }), shadowRadius: Platform.select({ android: 0, default: 1 }), minHeight: Platform.select({ android: 56, default: 48 }) },
    menuItemRTL: { flexDirection: 'row-reverse' },
    menuText: { fontSize: Platform.select({ android: 15, default: 16 }), color: colors.text, marginLeft: Platform.select({ android: 18, default: 16 }), fontWeight: Platform.select({ android: '600', default: '500' }) },
    menuTextRTL: { marginLeft: 0, marginRight: Platform.select({ android: 18, default: 16 }), textAlign: 'right' },
    signOutText: { color: colors.error },
    footer: { paddingHorizontal: Platform.select({ android: 20, default: 16 }), paddingVertical: Platform.select({ android: 20, default: 16 }), alignItems: 'center', marginTop: 'auto' },
    footerText: { fontSize: Platform.select({ android: 11, default: 12 }), color: colors.textSecondary, textAlign: 'center', fontWeight: '300' },
    footerTextRTL: { textAlign: 'center' },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, isRTL && styles.titleRTL]}>
          {t('profile')}
        </Text>
      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer} onPress={showImagePickerOptions} activeOpacity={0.8}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <User size={Platform.select({ android: 55, default: 60 })} color={colors.white} />
          )}
          <View style={styles.cameraIconContainer}>
            <Camera size={Platform.select({ android: 14, default: 16 })} color={colors.white} />
          </View>
        </TouchableOpacity>
        {isGuest ? (
          <>
            <Text style={[styles.userName, isRTL && styles.userNameRTL]}>{t('guestUser')}</Text>
            <Text style={[styles.guestMessage, isRTL && styles.guestMessageRTL]}>{t('guestMessage')}</Text>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} activeOpacity={0.8}>
              <LogIn size={Platform.select({ android: 18, default: 20 })} color={colors.white} />
              <Text style={styles.signInButtonText}>{t('signIn')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.userName, isRTL && styles.userNameRTL]}>John Doe</Text>
            <Text style={[styles.userEmail, isRTL && styles.userEmailRTL]}>john.doe@example.com</Text>
          </>
        )}
      </View>
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, isRTL && styles.menuItemRTL]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            {item.icon}
            <Text style={[
              styles.menuText,
              item.title === t('signOut') && styles.signOutText,
              isRTL && styles.menuTextRTL
            ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, isRTL && styles.footerTextRTL]}>
          Powered by Smart Shopping Team
        </Text>
      </View>
    </SafeAreaView>
  );
}