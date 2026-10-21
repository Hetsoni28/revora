'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Product } from '@/lib/therapies-data';

// The request form's code (and its animation) is only fetched the first time it opens.
const FormularyModal = dynamic(() => import('./formulary-modal').then((m) => m.FormularyModal), { ssr: false });

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  categoryName?: string;
}

/** Drop-in for FormularyModal that stays unloaded until first opened, then keeps it mounted for exit animations. */
export function LazyFormularyModal(props: Props) {
  const [opened, setOpened] = useState(false);
  if (props.isOpen && !opened) setOpened(true);
  return opened ? <FormularyModal {...props} /> : null;
}
