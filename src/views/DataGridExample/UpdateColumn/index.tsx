import { memo, useState } from "react";
import { TextBox } from "devextreme-react";
import { Button } from "devextreme-react/button";

type UpdateColumnProps = {
  fieldName?: string;
  onDelete: () => void;
  onSuccess: (value: string) => void;
};

function UpdateColumn({ onSuccess, onDelete, fieldName }: UpdateColumnProps) {
  const [value, setValue] = useState(fieldName || "");

  return (
    <div>
      <TextBox onValueChange={setValue} defaultValue={fieldName} />
      <div
        style={{
          paddingTop: 5,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Button type="default" icon="check" onClick={() => onSuccess(value)} />
        <Button type="normal" icon="close" onClick={onDelete} />
      </div>
    </div>
  );
}

export default memo(UpdateColumn);
