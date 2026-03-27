"use client";

import { createContext, useContext } from "react";

interface TransitionContextValue {
  loaderDone: boolean;
  navigate: (href: string) => void;
}

export const TransitionContext = createContext<TransitionContextValue>({
  loaderDone: false,
  navigate: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);
