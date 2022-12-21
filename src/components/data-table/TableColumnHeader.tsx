import { GridNode } from '@react-types/grid';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import { mergeProps, useHover, useTableColumnHeader } from 'react-aria';
import { useTableContext } from './Context';

export type TableColumnHeaderProps = {
  cell: GridNode<object>;
};

const TableColumnHeader: FC<TableColumnHeaderProps> = ({
  cell,
}: TableColumnHeaderProps) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const { state } = useTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: cell,
    },
    state,
    ref
  );

  const colSpan = cell.colspan ?? 1;
  const isDisabled = state.disabledKeys.has(cell.key);

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const SortIndicator = (() => {
    if (
      state.sortDescriptor == null ||
      state.sortDescriptor.column !== cell.key
    )
      return IconSelector;

    return state.sortDescriptor.direction === 'ascending'
      ? IconChevronUp
      : IconChevronDown;
  })();

  return (
    <th
      {...mergeProps(columnHeaderProps, hoverProps)}
      colSpan={colSpan}
      ref={ref}
      className={clsx(
        colSpan > 1 ? 'text-center' : 'text-left',
        isHovered && 'bg-gray-100',
        isDisabled && 'outline-0',
        !isDisabled && 'cursor-pointer',
        'table-header transition duration-200'
      )}
    >
      <div className="flex justify-between gap-2">
        {cell.rendered}
        {cell.props?.allowsSorting && (
          <span aria-hidden="true" className="flex items-center justify-center">
            <SortIndicator className="h-5 w-5" />
          </span>
        )}
      </div>
    </th>
  );
};

export default TableColumnHeader;
