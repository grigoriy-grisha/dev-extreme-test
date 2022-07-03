import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import DataGrid from "devextreme-react/data-grid";

import "devextreme/data/odata/store";
import { Column } from "devextreme/ui/data_grid";
import { DataGridManager } from "./model/DataGridManager";
import useForceUpdate from "../../../hooks/useForceUpdate";

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

  const notifyColumns = useCallback(() => {
    onChangeColumns(dataGridManager.getNativeInstance().getVisibleColumns());
    forceUpdate();
  }, []);

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
