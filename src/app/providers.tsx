import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Loader } from '@/shared/ui/loader';

import { ErrorBoundary } from './error-boundary';
import { persistor, store } from './store';

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}
