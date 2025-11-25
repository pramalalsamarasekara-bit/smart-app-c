import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { handleMigrationError } from '@/store/languageStore';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
    
    // Handle migration errors specifically
    if (error.message && (
      error.message.includes('migrate') || 
      error.message.includes('storage') ||
      error.message.includes('persist')
    )) {
      console.warn('Handling migration error in ErrorBoundary');
      handleMigrationError().then(() => {
        // Reset error state after handling
        setTimeout(() => {
          this.setState({ hasError: false, error: undefined });
        }, 500);
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});