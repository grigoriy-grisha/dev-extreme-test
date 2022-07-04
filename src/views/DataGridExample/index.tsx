import React, { useCallback, useMemo, useRef, useState } from "react";
import "devextreme/data/odata/store";
import { Column } from "devextreme/ui/data_grid";

import DataGridColumnsManipulator from "./DataGridColumnsManipulator";
import { DataGridManager } from "./DataGridColumnsManipulator/model/DataGridManager";
import CreateColumnGrid from "./CreateColumnGrid";
import UpdateColumnGridWrapper from "./UpdateColumnGridWrapper";
import useLoadMockData from "./hooks/useLoadMockData";

const columnsScheme = [
  {
    alignment: "right",
    dataField: "CompanyName",
    dataType: "string",
    caption: "CompanyName",
  },
  {
    alignment: "right",
    dataField: "City",
    dataType: "string",
    caption: "City",
  },
  {
    alignment: "right",
    dataField: "Country",
    dataType: "string",
    caption: "Country",
  },
  {
    alignment: "right",
    dataField: "Phone",
    dataType: "string",
    caption: "Phone",
  },
];

function getColumnsNames(column: Column) {
  return column.dataField as string;
}

function getColumns(dataGridManager: DataGridManager) {
  if (!dataGridManager.getNativeInstance) return [];
  return dataGridManager.getNativeInstance().getVisibleColumns();
}

export default function DataGridExample() {
  const dataGridManagerRef = useRef<DataGridManager>({} as any);
  const [columns, setColumns] = useState<Array<Column>>([]);

  const setDataGridManager = useCallback((dataGridManager: DataGridManager) => {
    dataGridManagerRef.current = dataGridManager;
  }, []);

  const visibleColumns = getColumns(dataGridManagerRef.current);
  const dataFieldNames = useMemo(() => visibleColumns.map(getColumnsNames), [visibleColumns]);

  const mockData = useLoadMockData();

  return (
    <div className="d-flex p-10">
      <div className="p-10 w-75">
        <DataGridColumnsManipulator
          dataSource={mockData}
          keyExpr="id"
          columnsScheme={columnsScheme}
          onChangeColumns={setColumns}
          setDataGridManager={setDataGridManager}
        />
      </div>
      <div className="p-10 w-25">
        <div className="pb-10">
          {columns.map((item, index) => (
            <UpdateColumnGridWrapper
              column={item}
              dataGridManager={dataGridManagerRef.current}
              key={index + String(item.dataField)}
            />
          ))}
        </div>
        <CreateColumnGrid
          actionText="Добавить колонку"
          cancelText="Отмена"
          successText="Добавить"
          onSubmit={dataGridManagerRef.current.addColumn}
          dataFieldNames={dataFieldNames}
        />
      </div>
    </div>
  );
}
