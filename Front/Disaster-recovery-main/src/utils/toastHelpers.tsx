// src/utils/toastHelpers.tsx
import { toast } from 'sonner';
import React from 'react';

export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: '#4BB543',
      color: 'white',
    },
    icon: <span className="text-xl">✓</span>,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    style: {
      background: '#DC3545',
      color: 'white',
    },
    icon: <span className="text-xl">❗</span>,
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    style: {
      background: '#17A2B8',
      color: 'white',
    },
  });
};
