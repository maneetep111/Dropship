'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type SelectionState = {
  selectedDraftId?: string;
  selectedProductId?: string;
  selectedCustomerId?: string;
  selectedOrderId?: string;
  setSelectedDraftId: (id?: string) => void;
  setSelectedProductId: (id?: string) => void;
  setSelectedCustomerId: (id?: string) => void;
  setSelectedOrderId: (id?: string) => void;
};

const SelectionContext = createContext<SelectionState | undefined>(undefined);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedDraftId, setSelectedDraftId] = useState<string>();
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>();
  const [selectedOrderId, setSelectedOrderId] = useState<string>();

  const value = useMemo(
    () => ({
      selectedDraftId,
      selectedProductId,
      selectedCustomerId,
      selectedOrderId,
      setSelectedDraftId,
      setSelectedProductId,
      setSelectedCustomerId,
      setSelectedOrderId
    }),
    [selectedDraftId, selectedProductId, selectedCustomerId, selectedOrderId]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used inside SelectionProvider');
  }
  return context;
}
