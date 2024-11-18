import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Router/routing';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Routing />
    </QueryClientProvider>
  </React.StrictMode>
);
