import DataGrid from "devextreme-react/data-grid";
import { Column } from "devextreme/ui/data_grid";

export type ColumnType = {
  name: string;
  dataField: string;
  type: string;
};

export class DataGridManager {
  private listeners: Set<() => void> = new Set();
  private nativeInstance: DataGrid["instance"] = null!;

  subscribe(fn: any) {
    this.listeners.add(fn);
  }

  unsubscribe(fn: any) {
    this.listeners.delete(fn);
  }

  getNativeInstance() {
    return this.nativeInstance;
  }

  setNativeInstance(nativeInstance: DataGrid["instance"]) {
    this.nativeInstance = nativeInstance;
  }

  addColumn = (columnOptions: Column) => {
    this.nativeInstance.addColumn(columnOptions);
    this.notify();
  };

  changeColumnName = (dataField?: string, newColumnName?: string) => {
    if (!dataField || !newColumnName) return;

    const foundColumn = this.getColumnByDataField(dataField);

    if (!foundColumn) return;
    if (foundColumn.caption === newColumnName) return;

    this.nativeInstance.deleteColumn(dataField);
    this.nativeInstance.addColumn({
      ...foundColumn,
      caption: newColumnName,
    });

    this.notify();
  };

  removeColumn = (dataField?: string) => {
    if (!dataField) return;

    //DataGrid почему-то не позволяет удалять колонки с сортировкой, поэтому перед удалением сбрасываем сортировку
    const foundColumn = this.getColumnByDataField(dataField);
    if (foundColumn?.sortOrder) {
      this.nativeInstance.clearSorting();
    }

    this.nativeInstance.deleteColumn(dataField);
    this.notify();
  };

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private getColumnByDataField(dataField: string) {
    return this.nativeInstance.getVisibleColumns().find((d) => d.dataField === dataField);
  }
}
