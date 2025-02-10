import { FC, useId } from "react";
import * as Components from "antd";
import { useController } from "react-hook-form";

interface Props extends Components.InputProps {
  name: string;
  label?: string;
};

const TextInput: FC<Props> = ({ name, id, label, required }) => {
  const generatedId = useId();
  const { field, fieldState  } = useController({ name, rules: {
    required: required,
  }});
  
  const componentId = id || generatedId;
    
  return (
    <Components.Form.Item
      htmlFor={componentId}
      validateStatus={fieldState.error && "error"}
      required={required}
      labelCol={{span: 24}}
      label={label}
    >
      <Components.Input
        id={componentId}
        size="large"
        { ...field }
      />
    </Components.Form.Item>
  );
};

export default TextInput;