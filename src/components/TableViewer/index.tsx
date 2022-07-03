import React, { memo, useEffect, useImperativeHandle, useRef } from "react";
import DataGrid from "devextreme-react/data-grid";

import "devextreme/data/odata/store";
import { Column } from "devextreme/ui/data_grid";

export type TableViewMutation = {
  changeColumnName: (fieldName?: string, name?: string) => void;
  removeColumn: (fieldName?: string) => void;
  addColumn: (value: Column | string) => void;
};

type TableScheme = {
  dataField: string;
  dataType: string;
  caption?: string;
  format?: string;
  alignment?: string;
};

type TableViewerProps = {
  setTableViewMutator: (mutation: TableViewMutation) => void;
  onChangeColumns: (columns: Array<Column>) => void;
  columnsScheme: TableScheme[];
  dataSource: any[];
  keyExpr: string;
};

function DataGridManager({
  setTableViewMutator,
  onChangeColumns,
  columnsScheme,
  dataSource,
  keyExpr,
}: TableViewerProps) {
  const dataGrid = useRef<DataGrid>(null!);

  useImperativeHandle(
    setTableViewMutator,
    () => ({
      addColumn: (columnOptions) => {
        dataGrid.current.instance.addColumn(columnOptions);
        onChangeColumns(dataGrid.current.instance.getVisibleColumns());
      },
      changeColumnName: (prevColumnName, newColumnName) => {
        if (!prevColumnName || !newColumnName) return;
        const columnName = dataGrid.current.instance
          .getVisibleColumns()
          .find((d) => d.dataField === prevColumnName);
        if (!columnName) return;

        dataGrid.current.instance.deleteColumn(prevColumnName);
        dataGrid.current.instance.addColumn({
          ...columnName,
          caption: newColumnName,
        });
        onChangeColumns(dataGrid.current.instance.getVisibleColumns());
      },
      removeColumn: (columnName) => {
        if (!columnName) return;
        dataGrid.current.instance.deleteColumn(columnName);
        onChangeColumns(dataGrid.current.instance.getVisibleColumns());
      },
    }),
    []
  );

  useEffect(() => {
    onChangeColumns(dataGrid.current.instance.getVisibleColumns());
  }, []);

  return (
    <DataGrid
      ref={dataGrid}
      defaultColumns={columnsScheme}
      keyExpr={keyExpr}
      dataSource={dataSource}
    />
  );
}

export default memo(DataGridManager);
