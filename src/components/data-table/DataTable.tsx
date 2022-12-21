import { clsx } from 'clsx';
import { FC, useRef } from 'react';
import { AriaTableProps, useTable } from 'react-aria';
import {
  Cell as ReactStatelyCell,
  Column as ReactStatelyColumn,
  Row as ReactStatelyRow,
  TableBody as ReactStatelyBody,
  TableHeader as ReactStatelyHeader,
  TableStateProps,
  useTableState,
} from 'react-stately';
import { TableContext } from './Context';
import TableCell from './TableCell';
import TableColumnHeader from './TableColumnHeader';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';
import TableRowGroup from './TableRowGroup';
import TableSelectAllCell from './TableSelectAllCell';
import TableSelectCell from './TableSelectCell';

export type DataTableProps = AriaTableProps<object> &
  Omit<TableStateProps<object>, 'showSelectionCheckboxes'> & {
    className?: string;
  };

type DataTableType = FC<DataTableProps> & {
  Body: typeof ReactStatelyBody;
  Cell: typeof ReactStatelyCell;
  Column: typeof ReactStatelyColumn;
  Header: typeof ReactStatelyHeader;
  Row: typeof ReactStatelyRow;
};

const DataTable: DataTableType = ({ className, ...props }: DataTableProps) => {
  // Make the selection behavior default to 'replace'
  // when the selection mode is 'single'.
  const selectionBehavior =
    props.selectionBehavior ??
    (props.selectionMode === 'single' ? 'replace' : 'toggle');

  const ref = useRef<HTMLTableElement>(null);

  const state = useTableState({
    ...props,
    selectionBehavior,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });

  const { gridProps } = useTable({ ...props }, state, ref);
  const { collection } = state;

  return (
    <TableContext.Provider value={{ state }}>
      <table
        {...gridProps}
        ref={ref}
        className={clsx(className, 'border-collapse')}
      >
        <TableRowGroup type="thead">
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} row={headerRow}>
              {[...headerRow.childNodes].map((col) =>
                col.props?.isSelectionCell ? (
                  <TableSelectAllCell key={col.key} cell={col} />
                ) : (
                  <TableColumnHeader key={col.key} cell={col} />
                )
              )}
            </TableHeaderRow>
          ))}
        </TableRowGroup>

        <TableRowGroup type="tbody">
          {[...collection.body.childNodes].map((row) => (
            <TableRow key={row.key} row={row}>
              {[...row.childNodes].map((cell) =>
                cell.props?.isSelectionCell ? (
                  <TableSelectCell key={cell.key} cell={cell} />
                ) : (
                  <TableCell key={cell.key} cell={cell} />
                )
              )}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    </TableContext.Provider>
  );
};

DataTable.Body = ReactStatelyBody;
DataTable.Cell = ReactStatelyCell;
DataTable.Column = ReactStatelyColumn;
DataTable.Header = ReactStatelyHeader;
DataTable.Row = ReactStatelyRow;

export default DataTable;
