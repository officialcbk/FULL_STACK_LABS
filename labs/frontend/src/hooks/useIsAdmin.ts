import { useOrganization } from '@clerk/clerk-react';

export const useIsAdmin = (): boolean => {
  const { membership } = useOrganization();
  return membership?.role === 'org:admin';
};