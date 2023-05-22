import React, { createContext, useState, PropsWithChildren } from 'react';
import { useDataQuery } from '../query';
import { DataRes } from '../types';

const DataContext = createContext<DataRes>(undefined!);

const DataContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: dataResponse } = useDataQuery();
  return (
    <DataContext.Provider value={dataResponse!}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
