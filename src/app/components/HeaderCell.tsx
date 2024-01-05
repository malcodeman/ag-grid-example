import React from "react";
import { Button, Group, Menu, Popover, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { Header, flexRender } from "@tanstack/react-table";

type Props = {
  header: Header<any, unknown>;
};

export const HeaderCell = (props: Props) => {
  const { header } = props;
  const [isEdit, setIsEdit] = React.useState(false);

  if (isEdit) {
    return (
      <Popover
        defaultOpened
        position="bottom-start"
        width="222"
        onClose={() => setIsEdit(false)}
      >
        <Popover.Target>
          <Table.Th>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </Table.Th>
        </Popover.Target>
        <Popover.Dropdown>
          <Group justify="flex-end">
            <Button
              size="xs"
              variant="default"
              onClick={() => setIsEdit(false)}
            >
              Close
            </Button>
            <Button size="xs">Save</Button>
          </Group>
        </Popover.Dropdown>
      </Popover>
    );
  }

  return (
    <Menu position="bottom-start" width="222">
      <Menu.Target>
        <Table.Th>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Table.Th>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => setIsEdit(true)}
          leftSection={<IconEdit size="16" />}
        >
          Edit field
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
