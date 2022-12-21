import { createContext, useContext } from 'react';
import { TableState } from 'react-stately';

export type TableContextProps = {
  state: TableState<object>;
};

export const TableContext = createContext<TableContextProps>(
  {} as TableContextProps
);

export const useTableContext = () => useContext(TableContext);
