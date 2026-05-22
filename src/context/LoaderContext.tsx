"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface LoaderContextValue {
  isComplete: boolean;
  completeLoader: () => void;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

interface LoaderProviderProps {
  children: ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [isComplete, setIsComplete] = useState(false);

  const completeLoader = useCallback(() => {
    setIsComplete(true);
  }, []);

  const value = useMemo(
    () => ({ isComplete, completeLoader }),
    [isComplete, completeLoader]
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export function useLoader(): LoaderContextValue {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
}
