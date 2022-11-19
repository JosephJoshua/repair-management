import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  enableSelection?: boolean;
  enableMultiSelect?: boolean;
};

const DataTable = <T,>({
  className,
  data,
  columns,
  enableSelection,
  enableMultiSelect,
}: DataTableProps<T>) => {
  const table = useReactTable<T>({
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={`table ${className}`}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {enableSelection && (
              <th key="selection-checkbox" className="h-full w-5">
                {/* Only render the checkbox if multi-select is enabled. */}
                {enableMultiSelect && (
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="checkbox w-5 h-5"
                      checked={table.getIsAllPageRowsSelected()}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                    />
                  </div>
                )}
              </th>
            )}

            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                  className="py-3 normal-case text-base font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="hover">
              {enableSelection && (
                <td key="selection-checkbox" className="h-full">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="checkbox w-5 h-5"
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </div>
                </td>
              )}

              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
