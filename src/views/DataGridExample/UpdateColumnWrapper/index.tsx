import React, { memo, useCallback } from "react";
import { Column } from "devextreme/ui/data_grid";

import UpdateColumn from "../UpdateColumn";
import { DataGridManager } from "../DataGridColumnsManipulator/model/DataGridManager";

type UpdateColumnWrapperProps = {
  column: Column;
  dataGridManager: DataGridManager;
};

function UpdateColumnWrapper({
  column,
  dataGridManager,
}: UpdateColumnWrapperProps) {
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
    <div className="pb-10">
      <UpdateColumn
        fieldName={column.caption}
        onDelete={onDelete}
        onSuccess={onChangeCaption}
      />
    </div>
  );
}

export default memo(UpdateColumnWrapper);
