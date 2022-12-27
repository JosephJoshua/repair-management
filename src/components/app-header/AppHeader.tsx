import { Group, Header, Title } from '@mantine/core';
import { FC, ReactElement } from 'react';

export type AppHeaderProps = {
  side?: ReactElement;
};

const AppHeader: FC<AppHeaderProps> = ({ side }) => {
  return (
    <Header height={60}>
      <Group sx={{ height: '100%' }} pl={24} pr={20} position="apart">
        <Title
          order={1}
          size="h3"
          variant="gradient"
          fw={600}
          gradient={{ from: 'lava-pink.3', to: 'yellow.5', deg: 45 }}
          sx={{ userSelect: 'none' }}
        >
          ReMana
        </Title>

        <Group spacing={8}>{side}</Group>
      </Group>
    </Header>
  );
};

export default AppHeader;
