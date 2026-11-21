declare global {
  interface Window {
    __UIFORGE_ENV__: 'development' | 'production' | 'test';
  }
}

declare module 'react' {
  export const useState: any;
  export const forwardRef: any;
  export interface ButtonHTMLAttributes<T> {}
  export interface HTMLAttributes<T> {}
}

export {};
