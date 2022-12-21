import { GridNode } from '@react-types/grid';
import { FC, useRef } from 'react';
import { useTableCell } from 'react-aria';
import { useTableContext } from './Context';

export type TableCellProps = {
  cell: GridNode<object>;
};

const TableCell: FC<TableCellProps> = ({ cell }: TableCellProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const { state } = useTableContext();
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);

  return (
    <td {...gridCellProps} ref={ref} className="table-cell">
      {cell.rendered}
    </td>
  );
};

export default TableCell;
