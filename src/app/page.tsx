"use client";
import { Box, Container, Table } from "@mantine/core";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { getLatestRates } from "./api/queries";
import { HeaderCell } from "./components/HeaderCell";

type Column = {
  title: string;
  amount: string;
};

const columnHelper = createColumnHelper<Column>();
const columns = [
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const initialData = [
  { title: "Rent", amount: "1000" },
  { title: "Food", amount: "120" },
];

export default function Home() {
  // const latestRates = useQuery({
  //   queryKey: ["latestRates"],
  //   queryFn: getLatestRates,
  // });
  const [data, setData] = useState(initialData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box style={{ paddingTop: "2rem" }}>
      <Container>
        <Table striped highlightOnHover>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell key={header.id} header={header} />
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
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
