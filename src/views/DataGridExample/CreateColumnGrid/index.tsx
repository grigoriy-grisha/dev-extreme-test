import { memo, useState } from "react";
import { Button, SelectBox, TextBox } from "devextreme-react";
import { Column, DataType, HorizontalAlignment } from "devextreme/ui/data_grid";

import DXField from "primitives/DXField";

import useEvent from "hooks/useEvent";

import useRenameActionMode from "./hooks/useRenameActionMode";
import { RenameActionMode } from "./types";

type RenameActionProps = {
  actionText: string;
  cancelText: string;
  successText: string;
  onSubmit: (columnOptions: Column) => void;
};

const aligns: HorizontalAlignment[] = ["left", "right", "center"];
const dataTypes: DataType[] = [
  "string",
  "boolean",
  "date",
  "number",
  "object",
  "datetime",
];

function CreateColumnGrid({
  actionText,
  cancelText,
  successText,
  onSubmit,
}: RenameActionProps) {
  const { mode, setInAction, setPending } = useRenameActionMode();

  const [dataField, setDataField] = useState("");
  const [caption, setCaption] = useState("");
  const [alignment, setAlignment] = useState<HorizontalAlignment>("left");
  const [dataType, setDataType] = useState<DataType>("string");

  const isPending = mode === RenameActionMode.Pending;

  const onCreateColumn = useEvent(() => {
    onSubmit({ dataField, alignment, caption, dataType });
    setCaption("");
    setDataField("");
    setPending();
  });

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
        <div className="pt-30">
          <DXField
            fieldLabel="DataField"
            fieldBox={
              <TextBox onValueChange={setDataField} value={dataField} />
            }
          />
          <DXField
            fieldLabel="Caption"
            fieldBox={<TextBox onValueChange={setCaption} value={caption} />}
          />
          <DXField
            fieldLabel="Align"
            fieldBox={
              <SelectBox
                items={aligns}
                value={alignment}
                onValueChange={setAlignment}
              />
            }
          />
          <DXField
            fieldLabel="Type"
            fieldBox={
              <SelectBox
                items={dataTypes}
                value={dataType}
                onValueChange={setDataType}
              />
            }
          />
          <Button
            width="100%"
            type="default"
            text={successText}
            onClick={onCreateColumn}
          />
        </div>
      )}
    </div>
  );
}

export default memo(CreateColumnGrid);
