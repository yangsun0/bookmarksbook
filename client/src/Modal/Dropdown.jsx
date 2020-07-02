import { useField } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import type { Options } from "../App/Types";
import ControlLayout from "./ControlLayout";

type Props = {
  name: string,
  label: string,
  options: Options,
};

function Dropdown(props: Props) {
  const { name, options, label } = props;
  const [field, meta] = useField(props.name);

  return (
    <ControlLayout
      name={name}
      label={label}
      meta={meta}
      extra={<Button variant="link">New</Button>}
    >
      <Form.Control
        as="select"
        {...field}
        isInvalid={meta.touched && meta.error}
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
