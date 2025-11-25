import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';

interface NotificationContextType {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  showToast: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notificationsEnabled, setNotificationsState] = useState(true);

  useEffect(() => {
    loadNotificationPreference();
  }, []);

  const loadNotificationPreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem('notificationsEnabled');
      if (savedPreference !== null) {
        setNotificationsState(JSON.parse(savedPreference));
      }
    } catch (error) {
      console.error('Error loading notification preference:', error);
    }
  };

  const setNotificationsEnabled = async (enabled: boolean) => {
    try {
      setNotificationsState(enabled);
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(enabled));
      
      // Show feedback to user
      showToast(enabled ? 'Notifications enabled' : 'Notifications disabled');
    } catch (error) {
      console.error('Error saving notification preference:', error);
      showToast('Failed to save notification preference');
    }
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'web') {
      // For web, we can use a simple alert or implement a custom toast
      console.log('Toast:', message);
    } else {
      // For mobile, show a brief alert
      Alert.alert('', message, [{ text: 'OK' }], { 
        cancelable: true,
      });
    }
  };

  const value: NotificationContextType = {
    notificationsEnabled,
    setNotificationsEnabled,
    showToast,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};