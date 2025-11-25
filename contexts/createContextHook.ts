import React, { createContext, useContext } from 'react';

export function createContextHook<T>(name: string) {
  const Ctx = createContext<T | undefined>(undefined);

  function useHook() {
    const v = useContext(Ctx);
    if (v === undefined) {
      throw new Error(`${name} must be used within its Provider`);
    }
    return v;
  }

  return [Ctx, useHook] as const;
}