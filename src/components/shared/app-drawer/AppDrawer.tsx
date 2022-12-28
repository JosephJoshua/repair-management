import {
  Accordion,
  Avatar,
  Box,
  Group,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import useStyles from './AppDrawer.styles';
import { DrawerCategory } from './AppDrawer.types';

export type AppDrawerProps = {
  categories: readonly DrawerCategory[];
};

const AppDrawer: FC<AppDrawerProps> = ({ categories }) => {
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
          classNames={{ item: classes.categoryItem }}
          styles={{
            content: {
              padding: 0,
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
        <Group className={classes.userBar}>
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
