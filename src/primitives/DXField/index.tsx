type DXFieldProps = {
  fieldLabel: string;
  fieldBox: JSX.Element;
};

function DXField({ fieldLabel, fieldBox }: DXFieldProps) {
  return (
    <div className="dx-field">
      <div className="dx-field-label">{fieldLabel}</div>
      <div className="dx-field-value">{fieldBox}</div>
    </div>
  );
}

export default DXField;
