import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import DataGrid from "devextreme-react/data-grid";

import "devextreme/data/odata/store";
import { Column } from "devextreme/ui/data_grid";
import { DataGridManager } from "./model/DataGridManager";
import useEvent from "../../hooks/useEvent";
import useForceUpdate from "../../hooks/useForceUpdate";

export type TableViewMutation = {
  changeColumnName: (fieldName?: string, name?: string) => void;
  removeColumn: (fieldName?: string) => void;
  addColumn: (value: Column) => void;
};

type TableScheme = {
  dataField: string;
  dataType: string;
  caption?: string;
  format?: string;
  alignment?: string;
};

type TableViewerProps = {
  setDataGridManager: (manager: DataGridManager) => void;
  onChangeColumns: (columns: Column[]) => void;
  columnsScheme: TableScheme[];
  dataSource: any[];
  keyExpr: string;
};

function DataGridColumnsManipulator({
  columnsScheme,
  dataSource,
  keyExpr,
  setDataGridManager,
  onChangeColumns,
}: TableViewerProps) {
  const dataGrid = useRef<DataGrid>(null!);
  const dataGridManager = useMemo(() => new DataGridManager(), []);

  const forceUpdate = useForceUpdate();

  const notifyColumns = useEvent(() => {
    onChangeColumns(dataGridManager.getNativeInstance().getVisibleColumns());
    forceUpdate();
  });

  useEffect(() => {
    dataGridManager.setNativeInstance(dataGrid.current.instance);

    dataGridManager.subscribe(notifyColumns);
    return () => dataGridManager.unsubscribe(notifyColumns);
  }, []);
  useEffect(notifyColumns, []);

  useImperativeHandle(setDataGridManager, () => dataGridManager, []);

  return (
    <DataGrid
      ref={dataGrid}
      defaultColumns={columnsScheme}
      keyExpr={keyExpr}
      dataSource={dataSource}
    />
  );
}

export default memo(DataGridColumnsManipulator);
