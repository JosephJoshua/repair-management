import { GridNode } from '@react-types/grid';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  VisuallyHidden,
} from 'react-aria';
import { Checkbox } from '../checkbox';
import { useTableContext } from './Context';

export type TableSelectAllCellProps = {
  cell: GridNode<object>;
};

const TableSelectAllCell: FC<TableSelectAllCellProps> = ({
  cell,
}: TableSelectAllCellProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const { state } = useTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    { node: cell },
    state,
    ref
  );

  const { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <th
      {...columnHeaderProps}
      ref={ref}
      className={clsx('table-header', 'w-5')}
    >
      {/*
        The checkbox will be hidden in single selection mode,
        so to avoid leaving a column header with no accessible content,
        we include the aria-label from the checkbox, which will be
        'Select' in single selection mode.
      */}
      {state.selectionManager.selectionMode === 'multiple' ? (
        <Checkbox {...checkboxProps} />
      ) : (
        <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
      )}
    </th>
  );
};

export default TableSelectAllCell;
