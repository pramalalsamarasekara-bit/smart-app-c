import React, { PropsWithChildren, useMemo, useState, createContext, useContext } from 'react';

type SubscriptionState = {
 
  expiresAt?: string;
  setPlan: (p: SubscriptionState['plan']) => void;
};

const SubscriptionContext = createContext<SubscriptionState | null>(null);

export function useSubscription(): SubscriptionState {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

export function SubscriptionProvider({ children }: PropsWithChildren) {
  const [plan, setPlan] = useState<SubscriptionState['plan']>('free');
  const [expiresAt, setExpiresAt] = useState<string | undefined>(undefined);

  const value = useMemo(
    () => ({ 
      plan, 
      expiresAt,
      setPlan 
    }),
    [plan, expiresAt]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}