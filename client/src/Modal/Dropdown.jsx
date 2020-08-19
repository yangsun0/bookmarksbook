import { useField } from "formik";
import * as React from "react";
import { Form } from "react-bootstrap";
import ControlLayout from "./ControlLayout";

export type Option = {
  value: string,
  label: string,
};

type Props = {
  name: string,
  label: string,
  options: Array<Option>,
  extra?: React.Node,
};

function Dropdown(props: Props) {
  const { name, options, label, extra } = props;
  const [field, meta] = useField(props.name);

  return (
    <ControlLayout name={name} label={label} extra={extra}>
      <Form.Control
        as="select"
        {...field}
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
