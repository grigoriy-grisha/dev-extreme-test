import React, { useCallback, useRef, useState } from "react";
import "devextreme/data/odata/store";
import { Column } from "devextreme/ui/data_grid";

import DataGridColumnsManipulator from "./DataGridColumnsManipulator";
import { DataGridManager } from "./DataGridColumnsManipulator/model/DataGridManager";
import CreateColumnGrid from "./CreateColumnGrid";
import UpdateColumnWrapper from "./UpdateColumnWrapper";

const columnScheme = [
  {
    alignment: "right",
    dataField: "Hello",
    dataType: "string",
    caption: "Hello Text",
  },
];

const dataSource = [{ ID: 1, Hello: 123 }];

export default function DataGridExample() {
  const dataGridManagerRef = useRef<DataGridManager>({} as any);
  const [columns, setColumns] = useState<Array<Column>>([]);

  const setDataGridManager = useCallback((dataGridManager: DataGridManager) => {
    dataGridManagerRef.current = dataGridManager;
  }, []);

  return (
    <div className="d-flex">
      <div className="p-10 w-75">
        <DataGridColumnsManipulator
          dataSource={dataSource}
          keyExpr="ID"
          columnsScheme={columnScheme}
          onChangeColumns={setColumns}
          setDataGridManager={setDataGridManager}
        />
      </div>
      <div className="p-10 w-25">
        <div className="pb-10">
          {columns.map((item, index) => (
            <UpdateColumnWrapper
              column={item}
              dataGridManager={dataGridManagerRef.current}
              key={index}
            />
          ))}
        </div>
        <CreateColumnGrid
          actionText="Добавить колонку"
          cancelText="Отмена"
          successText="Добавить"
          onSubmit={dataGridManagerRef.current.addColumn}
        />
      </div>
    </div>
  );
}
