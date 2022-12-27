import {
  Accordion,
  Avatar,
  Box,
  createStyles,
  Group,
  MantineColor,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { TablerIcon } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

export type DrawerCategory = {
  key: React.Key;
  title: string;
  children: DrawerItem[];
};

export type DrawerItem = {
  key: React.Key;
  title: string;
  to: string;
  icon: TablerIcon;
  color?: MantineColor;
};

export type AppDrawerProps = {
  categories: readonly DrawerCategory[];
};

const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    textDecoration: 'none',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
  activeLink: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors[theme.primaryColor][6]
        : theme.colors[theme.primaryColor][4],
    color: theme.white,

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },
}));

const AppDrawer: FC<AppDrawerProps> = ({ categories }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const router = useRouter();

  // `useLocalStorage` doesn't allow passing in a function
  // for the `defaultValue` so we have to put this in `useMemo`
  // to avoid calling `categories.map()` every re-render.
  const allCategoryKeys = useMemo(
    () => categories.map((category) => category.key.toString()),
    [categories]
  );

  const [expandedItems, setExpandedItems] = useLocalStorage<string[]>({
    key: 'expanded-drawer-items',
    defaultValue: allCategoryKeys,
  });

  return (
    <Navbar p="md" pt={4} hiddenBreakpoint="sm" width={{ base: 300 }}>
      <Navbar.Section
        grow
        component={ScrollArea}
        mx="-xs"
        px="xs"
        pb="md"
        scrollHideDelay={500}
      >
        <Accordion
          multiple
          chevronPosition="left"
          variant="filled"
          value={expandedItems}
          onChange={setExpandedItems}
          styles={{
            content: {
              padding: 0,
            },
            item: {
              paddingRight: theme.spacing.xs,
              '&[data-active]': {
                background: 'transparent',
              },
            },
          }}
        >
          {categories.map((category) => (
            <Accordion.Item value={category.key.toString()} key={category.key}>
              <Accordion.Control>
                <Text weight={600}>{category.title}</Text>
              </Accordion.Control>

              <Accordion.Panel>
                <Stack spacing={4}>
                  {category.children.map((child) => {
                    const isActive =
                      router.pathname === child.to ||
                      router.asPath === child.to;

                    return (
                      <Box
                        component={Link}
                        className={cx(
                          classes.link,
                          isActive && classes.activeLink
                        )}
                        key={child.key}
                        href={child.to}
                      >
                        <Group>
                          <ThemeIcon
                            variant={isActive ? 'filled' : 'light'}
                            color={isActive ? 'primary.7' : child.color}
                          >
                            {React.createElement(child.icon, {
                              size: 18,
                            })}
                          </ThemeIcon>

                          <Text size="sm" weight={500}>
                            {child.title}
                          </Text>
                        </Group>
                      </Box>
                    );
                  })}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Navbar.Section>

      <Navbar.Section>
        <Group
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          <Avatar radius="xl" />
          <Box sx={{ flexGrow: 1 }}>
            <Text size="sm" weight={600} lh={1.2}>
              Admin
            </Text>
            <Text size="sm" color="dimmed" weight={500}>
              Point Service Center
            </Text>
          </Box>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppDrawer;
