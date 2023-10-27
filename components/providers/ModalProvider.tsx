"use client"

import CreateServerModal from '@/components/modals/CreateServerModal';
import { useEffect, useState } from 'react';
import InviteModal from '@/components/modals/InviteModal';

interface ModalProviderProps {
  username: string;
};

function ModalProvider({ 
  username
}: ModalProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal username={username} />
      <InviteModal />
    </>
  );
}

export default ModalProvider;
