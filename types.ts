import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export interface Option {
  id: string;
  label: string;
  code: string;
  description?: string;
  icon?: React.ReactNode;
  category?: 'single' | 'multi';
}

export interface Configuration {
  users: Option | null;
  biometric: Option[];
  card: Option | null;
  network: Option[];
  features: Option[];
}

export enum StepId {
  USERS = 0,
  BIOMETRIC = 1,
  CARD = 2,
  NETWORK = 3,
  FEATURES = 4,
  SUMMARY = 5,
}