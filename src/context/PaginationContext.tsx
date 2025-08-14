import { createContext, useContext } from 'react';


interface PaginationContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

export const PaginationProvider = PaginationContext.Provider;
