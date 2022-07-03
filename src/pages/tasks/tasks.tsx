import React, { useRef, useState } from "react";
import "devextreme/data/odata/store";
import TableViewer, { TableViewMutation } from "../../components/TableViewer";

import RenameAction from "../../components/RenameAction";
import { Column } from "devextreme/ui/data_grid";
import UpdateColumn from "./UpdateColumn";

export default function Task() {
  const tableViewMutator = useRef<TableViewMutation>({} as any);
  const [columns, setColumns] = useState<Array<Column>>([]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 3, padding: 10 }}>
        <TableViewer
          dataSource={[{ ID: 1, Hello: 123 }]}
          keyExpr="ID"
          columnsScheme={[
            {
              alignment: "right",
              dataField: "Hello",
              dataType: "string",
              caption: "Hello Text",
            },
          ]}
          onChangeColumns={setColumns}
          setTableViewMutator={(mutation) =>
            (tableViewMutator.current = mutation)
          }
        />
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <div style={{ paddingBottom: 10 }}>
          {columns.map((item, index) => (
            <div style={{ paddingBottom: 10 }}>
              <UpdateColumn
                fieldName={item.caption}
                key={index}
                onDelete={() =>
                  tableViewMutator.current.removeColumn(item.dataField)
                }
                onSuccess={(newName) =>
                  tableViewMutator.current.changeColumnName(
                    item.dataField,
                    newName
                  )
                }
              />
            </div>
          ))}
        </div>

        <RenameAction
          actionText="Добавить колонку"
          cancelText="Отмена"
          successText="Добавить"
          onSubmit={tableViewMutator.current.addColumn}
        />
      </div>
    </div>
  );
}
