import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import colors from '@/constants/colors';

type ActionButtonProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: Platform.select({ android: 12, default: 16 }),
    padding: Platform.select({ android: 18, default: 16 }),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Platform.select({ android: 8, default: 6 }),
    width: '100%',
    height: Platform.select({ android: 85, default: 80 }),
    elevation: Platform.select({ android: 4, default: 0 }),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.select({ android: 0, default: 0.2 }),
    shadowRadius: Platform.select({ android: 0, default: 3 }),
    flexDirection: 'row',
    gap: Platform.select({ android: 14, default: 12 }),
  },
  buttonText: {
    fontSize: Platform.select({ android: 17, default: 18 }),
    fontWeight: Platform.select({ android: '700', default: '600' }),
    color: colors.text,
  },
});

export default ActionButton;