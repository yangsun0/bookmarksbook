import { useField } from "formik";
import * as React from "react";
import { Form } from "react-bootstrap";
import type { Options } from "../Common/Types";
import ControlLayout from "./ControlLayout";

type Props = {
  name: string,
  label: string,
  options: Options,
  extra?: React.Node,
};

function Dropdown(props: Props) {
  const { name, options, label, extra } = props;
  //$FlowFixMe
  const [field, meta, helpers] = useField(props.name);
  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (typeof meta.initialValue == "number") {
      helpers.setValue(parseInt(event.currentTarget.value));
    } else {
      helpers.setValue(event.currentTarget.value);
    }
  };

  return (
    <ControlLayout name={name} label={label} extra={extra}>
      <Form.Control
        as="select"
        name={name}
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        isInvalid={meta.touched && meta.error}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </ControlLayout>
  );
}

export default Dropdown;
