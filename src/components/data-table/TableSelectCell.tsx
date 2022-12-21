import { GridNode } from '@react-types/grid';
import { FC, useRef } from 'react';
import { useTableCell, useTableSelectionCheckbox } from 'react-aria';
import { Checkbox } from '../checkbox';
import { useTableContext } from './Context';

export type TableSelectCell = {
  cell: GridNode<object>;
};

const TableSelectCell: FC<TableSelectCell> = ({ cell }: TableSelectCell) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const { state } = useTableContext();
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);

  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey ?? -1 },
    state
  );

  const isDisabled =
    cell.parentKey == null || state.disabledKeys.has(cell.parentKey);

  return (
    <td {...gridCellProps} ref={ref} className="table-cell">
      {state.selectionManager.selectionMode !== 'none' && (
        <Checkbox
          {...(cell.parentKey != null ? checkboxProps : {})}
          isDisabled={isDisabled}
        />
      )}
    </td>
  );
};

export default TableSelectCell;
