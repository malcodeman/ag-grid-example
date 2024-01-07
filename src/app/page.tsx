"use client";
import { Box, Container, Flex, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ColumnResizeMode,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type Column = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
};

const columnHelper = createColumnHelper<Column>();
const columns = [
  columnHelper.accessor("firstName", {
    header: () => "First name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gender", {
    header: () => "Gender",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];
const columnResizeMode: ColumnResizeMode = "onChange";

const makeInitialData = () => {
  return Array.from({ length: 100 }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.gender(),
    email: faker.internet.email(),
  }));
};

export default function Home() {
  const [data, setData] = useState<Column[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    setData(makeInitialData());
  }, []);

  return (
    <Box style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container>
        <Table
          striped
          highlightOnHover
          withColumnBorders
          style={{ width: table.getCenterTotalSize() }}
        >
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: "relative",
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <Flex
                        style={{
                          alignItems: "center",
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <IconChevronUp size="16" />,
                          desc: <IconChevronDown size="16" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    )}
                    <Box
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: "100%",
                        width: "5px",
                        backgroundColor: header.column.getIsResizing()
                          ? "white"
                          : "rgba(0, 0, 0, 0.5)",
                        cursor: "col-resize",
                        userSelect: "none",
                        touchAction: "none",
                        transform:
                          columnResizeMode === "onEnd" &&
                          header.column.getIsResizing()
                            ? `translateX(${
                                (table.options.columnResizeDirection === "rtl"
                                  ? -1
                                  : 1) *
                                (table.getState().columnSizingInfo
                                  .deltaOffset ?? 0)
                              }px)`
                            : "",
                      }}
                      onDoubleClick={() => header.column.resetSize()}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Container>
    </Box>
  );
}
