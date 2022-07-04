import React, { memo, useCallback } from "react";
import { Column } from "devextreme/ui/data_grid";

import UpdateColumnGrid from "../UpdateColumnGrid";
import { DataGridManager } from "../DataGridColumnsManipulator/model/DataGridManager";

type UpdateColumnWrapperProps = {
  column: Column;
  dataGridManager: DataGridManager;
};

function UpdateColumnGridWrapper({ column, dataGridManager }: UpdateColumnWrapperProps) {
  const onDelete = useCallback(() => dataGridManager.removeColumn(column.dataField), [
    column.dataField,
    dataGridManager,
  ]);

  const onChangeCaption = useCallback(
    (newName: string) => dataGridManager.changeColumnName(column.dataField, newName),
    [column.dataField, dataGridManager],
  );

  return (
    <div className="pb-10">
      <UpdateColumnGrid fieldName={column.caption} onDelete={onDelete} onSuccess={onChangeCaption} />
    </div>
  );
}

export default memo(UpdateColumnGridWrapper);
