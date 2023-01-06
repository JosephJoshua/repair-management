import { useShortcutContext } from '@/core/contexts/ShortcutContext';
import {
  ActionIcon,
  Button,
  Group,
  Popover,
  Text,
  Tooltip,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';
import { FC, useState } from 'react';

export type DeleteButtonProps = {
  onDelete?: () => void;
  message: string;
  isDeleting?: boolean;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  onDelete,
  message,
  isDeleting,
}) => {
  const { shortcuts } = useShortcutContext();
  const [popupOpened, setPopupOpened] = useState<boolean>(false);

  // Close the popup when a shortcut is pressed.
  const handleKeyDown = getHotkeyHandler(
    shortcuts.map((shortcut) => [shortcut, () => setPopupOpened(false)])
  );

  return (
    <Popover
      trapFocus
      shadow="xs"
      position="top"
      transition="pop"
      opened={popupOpened}
      onChange={setPopupOpened}
    >
      <Popover.Target>
        <Tooltip label="Hapus">
          <ActionIcon
            color="red"
            onClick={() => setPopupOpened((opened) => !opened)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>

      <Popover.Dropdown onKeyDown={handleKeyDown}>
        <Text weight={500}>{message}</Text>
        <Group spacing={6} mt="xs" position="right">
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              setPopupOpened(false);
              onDelete?.();
            }}
            loading={isDeleting}
          >
            Ya
          </Button>

          <Button
            size="xs"
            data-autofocus
            onClick={() => setPopupOpened(false)}
          >
            Tidak
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeleteButton;
