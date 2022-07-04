import { memo, useCallback } from "react";
import { Button } from "devextreme-react";
import { Column } from "devextreme/ui/data_grid";

import useRenameActionMode from "./hooks/useRenameActionMode";
import { RenameActionMode } from "./types";
import CreateColumnInAction from "views/DataGridExample/CreateColumnGrid/CreateColumnInAction";

type CreateColumnGridProps = {
  actionText: string;
  cancelText: string;
  successText: string;
  dataFieldNames: string[];
  onSubmit: (columnOptions: Column) => void;
};

function CreateColumnGrid({ actionText, cancelText, successText, onSubmit, dataFieldNames }: CreateColumnGridProps) {
  const { mode, setInAction, setPending } = useRenameActionMode();

  const onSubmitHandler = useCallback(
    (column: Column) => {
      onSubmit(column);
      setPending();
    },
    [onSubmit, setPending],
  );

  const isPending = mode === RenameActionMode.Pending;

  return (
    <div>
      <Button
        width="100%"
        text={isPending ? actionText : cancelText}
        type="normal"
        stylingMode="contained"
        onClick={isPending ? setInAction : setPending}
      />
      {mode === RenameActionMode.InAction && (
        <CreateColumnInAction dataFieldNames={dataFieldNames} onSubmit={onSubmitHandler} successText={successText} />
      )}
    </div>
  );
}

export default memo(CreateColumnGrid);
