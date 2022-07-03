import { memo, useState } from "react";
import { Button, SelectBox, TextBox } from "devextreme-react";
import { Column, DataType, HorizontalAlignment } from "devextreme/ui/data_grid";

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

function RenameAction({
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
          <div className="dx-field">
            <div className="dx-field-label">DataField</div>
            <div className="dx-field-value">
              <TextBox onValueChange={setDataField} value={dataField} />
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Caption</div>
            <div className="dx-field-value">
              <TextBox onValueChange={setCaption} value={caption} />
            </div>
          </div>

          <div className="dx-field">
            <div className="dx-field-label">Align</div>
            <div className="dx-field-value">
              <SelectBox
                items={aligns}
                value={alignment}
                onValueChange={setAlignment}
              />
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Type</div>
            <div className="dx-field-value">
              <SelectBox
                items={dataTypes}
                value={dataType}
                onValueChange={setDataType}
              />
            </div>
          </div>
          <Button
            width="100%"
            type="default"
            text={successText}
            onClick={() => {
              onSubmit({ dataField, alignment, caption, dataType });
              setCaption("");
              setDataField("");
              setPending();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default memo(RenameAction);
