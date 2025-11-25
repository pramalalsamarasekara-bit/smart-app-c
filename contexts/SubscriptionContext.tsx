import React, { createContext, useContext, useState, ReactNode } from 'react';

type SubscriptionState = {
  expiresAt?: string;
  setPlan: (p: any) => void;
  showPaywall: (reason?: string) => void;
};

const SubscriptionContext = createContext<SubscriptionState | null>(null);

export function useSubscription(): SubscriptionState {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  // plan variable and logic removed
  const [expiresAt, setExpiresAt] = useState<string | undefined>(undefined);

  // setPlan is a no-op, for backward compatibility
  const setPlan = () => {};

  // showPaywall does nothing
  const showPaywall = () => {};

  const value = {
    expiresAt,
    setPlan,
    showPaywall,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}