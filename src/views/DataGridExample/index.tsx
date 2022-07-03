import React, { useCallback, useRef, useState } from "react";
import "devextreme/data/odata/store";
import { Column } from "devextreme/ui/data_grid";

import useEvent from "../../hooks/useEvent";

import UpdateColumn from "./UpdateColumn";
import DataGridColumnsManipulator from "./DataGridColumnsManipulator";
import { DataGridManager } from "./DataGridColumnsManipulator/model/DataGridManager";
import RenameAction from "./RenameAction";

const columnScheme = [
  {
    alignment: "right",
    dataField: "Hello",
    dataType: "string",
    caption: "Hello Text",
  },
];

const dataSource = [{ ID: 1, Hello: 123 }];

type UpdateColumnComponentProps = {
  column: Column;
  dataGridManager: DataGridManager;
};

function UpdateColumnComponent({
  column,
  dataGridManager,
}: UpdateColumnComponentProps) {
  const onDelete = useCallback(
    () => dataGridManager.removeColumn(column.dataField),
    [column.dataField]
  );

  const onChangeCaption = useCallback(
    (newName: string) =>
      dataGridManager.changeColumnName(column.dataField, newName),
    [column.dataField]
  );

  return (
    <div style={{ paddingBottom: 10 }}>
      <UpdateColumn
        fieldName={column.caption}
        onDelete={onDelete}
        onSuccess={onChangeCaption}
      />
    </div>
  );
}

export default function Task() {
  const dataGridManagerRef = useRef<DataGridManager>({} as any);
  const [columns, setColumns] = useState<Array<Column>>([]);

  const setDataGridManager = useEvent(
    (dataGridManager) => (dataGridManagerRef.current = dataGridManager)
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 3, padding: 10 }}>
        <DataGridColumnsManipulator
          dataSource={dataSource}
          keyExpr="ID"
          columnsScheme={columnScheme}
          onChangeColumns={setColumns}
          setDataGridManager={setDataGridManager}
        />
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <div style={{ paddingBottom: 10 }}>
          {columns.map((item, index) => (
            <UpdateColumnComponent
              column={item}
              dataGridManager={dataGridManagerRef.current}
              key={index}
            />
          ))}
        </div>

        <RenameAction
          actionText="Добавить колонку"
          cancelText="Отмена"
          successText="Добавить"
          onSubmit={dataGridManagerRef.current.addColumn}
        />
      </div>
    </div>
  );
}
