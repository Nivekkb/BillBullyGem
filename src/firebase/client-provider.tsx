'use client';

import React, { useMemo, type ReactNode } from 'react';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    const services = initializeFirebase();
    const appCheckKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (typeof window !== 'undefined' && appCheckKey) {
      try {
        initializeAppCheck(services.firebaseApp, {
          provider: new ReCaptchaV3Provider(appCheckKey),
          isTokenAutoRefreshEnabled: true,
        });
      } catch (error) {
        console.warn('App Check initialization failed:', error);
      }
    }

    return services;
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
