import Link from 'next/link';
import React, { FC } from 'react';

type DrawerItemProps = {
  title: string;
  to: string;
  icon: React.ElementType;
};

const DrawerItem: FC<DrawerItemProps> = ({
  icon,
  to,
  title,
}: DrawerItemProps) => {
  const iconElement = React.createElement(icon);
  return (
    <Link href={to} className="flex items-center">
      <div className="w-[20px] h-[20px]">{iconElement}</div>{' '}
      <span>{title}</span>
    </Link>
  );
};

export default DrawerItem;
