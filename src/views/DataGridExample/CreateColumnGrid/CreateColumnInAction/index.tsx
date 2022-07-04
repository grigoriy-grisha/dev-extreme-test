import DXField from "primitives/DXField";
import { Button, SelectBox, TextBox } from "devextreme-react";
import { CustomRule, RequiredRule, Validator } from "devextreme-react/validator";
import { memo, useState } from "react";
import { Column, DataType, HorizontalAlignment } from "devextreme/ui/data_grid";

import useEvent from "hooks/useEvent";

import preventDefault from "utils/preventDefault";

const aligns: HorizontalAlignment[] = ["left", "right", "center"];
const dataTypes: DataType[] = ["string", "boolean", "date", "number", "object", "datetime"];

type CreateColumnInActionProps = {
  successText: string;
  dataFieldNames: string[];
  onSubmit: (columnOptions: Column) => void;
};

function CreateColumnInAction({ successText, dataFieldNames, onSubmit }: CreateColumnInActionProps) {
  const [dataField, setDataField] = useState("");
  const [caption, setCaption] = useState("");
  const [alignment, setAlignment] = useState<HorizontalAlignment>("left");
  const [dataType, setDataType] = useState<DataType>("string");

  const onCreateColumn = useEvent(
    preventDefault(() => {
      onSubmit({ dataField, alignment, caption, dataType });
      setCaption("");
      setDataField("");
    }),
  );

  return (
    <form onSubmit={onCreateColumn}>
      <div className="pt-30">
        <DXField
          fieldLabel="DataField"
          fieldBox={
            <TextBox onValueChange={setDataField} value={dataField}>
              {/*Todo: странная ошибка в примерах все точно такое же https://codesandbox.io/s/75703t?file=/App.js:275-342*/}
              {/*@ts-ignore*/}
              <Validator>
                <RequiredRule message="Is required" />
                <CustomRule
                  message="This column already exists"
                  validationCallback={() => !dataFieldNames.includes(dataField)}
                />
              </Validator>
            </TextBox>
          }
        />
        <DXField fieldLabel="Caption" fieldBox={<TextBox onValueChange={setCaption} value={caption} />} />
        <DXField
          fieldLabel="Align"
          fieldBox={<SelectBox items={aligns} value={alignment} onValueChange={setAlignment} />}
        />
        <DXField
          fieldLabel="Type"
          fieldBox={<SelectBox items={dataTypes} value={dataType} onValueChange={setDataType} />}
        />
        <Button width="100%" type="default" text={successText} useSubmitBehavior />
      </div>
    </form>
  );
}

export default memo(CreateColumnInAction);
