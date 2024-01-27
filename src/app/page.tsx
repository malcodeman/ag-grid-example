"use client";
import { Box, Container } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { faker } from "@faker-js/faker";

type Column = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
};

const makeInitialData = () => {
  return Array.from({ length: 1000 }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.gender(),
    email: faker.internet.email(),
  }));
};

export default function Home() {
  const [rowData, setRowData] = useState<Column[]>([]);
  const [columnDefs, _setColumnDefs] = useState<ColDef[]>([
    {
      field: "firstName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: "lastName" },
    { field: "gender" },
    { field: "email" },
  ]);
  const defaultColDef = useMemo(
    () => ({
      editable: true,
    }),
    []
  );

  useEffect(() => {
    setRowData(makeInitialData());
  }, []);

  return (
    <Box style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container
        className="ag-theme-quartz-dark"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination
          suppressRowClickSelection
        />
      </Container>
    </Box>
  );
}
