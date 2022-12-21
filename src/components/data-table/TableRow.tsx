import { GridNode } from '@react-types/grid';
import clsx from 'clsx';
import { FC, PropsWithChildren, useRef } from 'react';
import { mergeProps, useFocusRing, useTableRow } from 'react-aria';
import { useTableContext } from './Context';

export type TableRowProps = PropsWithChildren<{
  row: GridNode<object>;
}>;

const TableRow: FC<TableRowProps> = ({ row, children }: TableRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const { state } = useTableContext();
  const { rowProps, isPressed } = useTableRow({ node: row }, state, ref);

  const isSelected = state.selectionManager.isSelected(row.key);

  // The row will have the focus background colour if any row inside it is focused,
  const { focusProps: focusWithinProps, isFocusVisible: isFocusVisibleWithin } =
    useFocusRing({ within: true });

  // and will have a indicator on the left if it itself is focused.
  const { focusProps, isFocusVisible } = useFocusRing();

  const bgClass = (() => {
    if (isPressed) return 'bg-blue-50';
    if (isFocusVisible || isFocusVisibleWithin) return 'bg-blue-50/75';
    if (isSelected) return 'bg-gray-50';

    return '';
  })();

  return (
    <tr
      {...mergeProps(rowProps, focusProps, focusWithinProps)}
      ref={ref}
      className={clsx(
        // `state.collection.rows` contains all the rows
        // in the table including the header row, which is why
        // we have to subtract it from 2 to get the last row's index.
        row.index != null &&
          row.index < state.collection.rows.length - 2 &&
          'table-row-border',
        isFocusVisible ? 'border-l-primary' : 'border-l-transparent',
        bgClass,
        'border-l-2 outline-0'
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
