import { FC } from 'react';
import { useTableRowGroup } from 'react-aria';

type TableRowGroupProps = React.PropsWithChildren<{
  type: 'thead' | 'tbody';
  className?: string;
}>;

const TableRowGroup: FC<TableRowGroupProps> = ({
  type: Element,
  className,
  children,
}: TableRowGroupProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element {...rowGroupProps} className={className || ''}>
      {children}
    </Element>
  );
};

export default TableRowGroup;
