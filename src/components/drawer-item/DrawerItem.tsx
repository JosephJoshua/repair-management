import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC } from 'react';

export type DrawerItemProps = {
  title: string;
  to: string;
  icon: React.ElementType | IconDefinition;
};

const DrawerItem: FC<DrawerItemProps> = ({
  icon,
  to,
  title,
}: DrawerItemProps) => {
  const iconElement =
    typeof icon === 'object' && 'iconName' in icon ? (
      <FontAwesomeIcon icon={icon} />
    ) : (
      React.createElement(icon)
    );

  return (
    <Link
      href={to}
      className="flex items-center gap-x-2.5 rounded-xl p-4 transition-all duration-200 hover:bg-primary/10"
    >
      <div className="h-5 w-5 text-secondary">{iconElement}</div>
      <span>{title}</span>
    </Link>
  );
};

export default DrawerItem;
