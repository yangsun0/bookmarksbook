import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import ControlLayout from "./ControlLayout";

type Props = {
  name: string,
  type: string,
  label: string,
  placeholder?: string,
};

function Textbox(props: Props) {
  const { name, type, label, placeholder } = props;
  const [field, meta] = useField(props.name);

  return (
    <ControlLayout name={name} label={label}>
      <Form.Control
        {...field}
        type={type}
        placeholder={placeholder}
        isInvalid={meta.touched && meta.error}
      />
    </ControlLayout>
  );
}

export default Textbox;
