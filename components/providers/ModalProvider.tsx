"use client"

import CreateServerModal from '@/components/modals/CreateServerModal';
import { useEffect, useState } from 'react';

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
    </>
  );
}

export default ModalProvider;
