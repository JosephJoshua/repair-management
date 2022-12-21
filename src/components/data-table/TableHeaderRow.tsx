import { GridNode } from '@react-types/grid';
import { FC, PropsWithChildren, useRef } from 'react';
import { useTableHeaderRow } from 'react-aria';
import { useTableContext } from './Context';

export type TableHeaderRowProps = PropsWithChildren<{
  row: GridNode<object>;
}>;

const TableHeaderRow: FC<TableHeaderRowProps> = ({
  row,
  children,
}: TableHeaderRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const { state } = useTableContext();
  const { rowProps } = useTableHeaderRow({ node: row }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className="table-row-border">
      {children}
    </tr>
  );
};

export default TableHeaderRow;
