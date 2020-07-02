import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import type { Options } from "../App/Types";
import ControlLayout from "./ControlLayout";

type Props = {
  name: string,
  type: "radio" | "checkbox",
  label: string,
  options: Options,
};

function Checkbox(props: Props) {
  const { name, type, label, options } = props;
  const [, meta] = useField(props.name);

  const checkboxes = options.map((option) => (
    <CheckboxOption
      key={option.value}
      name={name}
      type={type}
      label={option.label}
      value={option.value}
    />
  ));

  return (
    <ControlLayout name={name} label={label} meta={meta}>
      <div className="d-flex h-100">{checkboxes}</div>
    </ControlLayout>
  );
}

type CheckboxOptionProps = {
  name: string,
  type: "radio" | "checkbox",
  label: string,
  value: number | string,
};

function CheckboxOption(props: CheckboxOptionProps) {
  const { name, type, label, value } = props;
  //$FlowFixMe
  const [field, meta, helpers] = useField({
    name: name,
    value: value,
    type: type,
  });
  return (
    <Form.Check
      inline
      onChange={() => helpers.setValue(value)}
      type={type}
      label={label}
      id={name + value}
      value={value}
      checked={field.checked}
      isInvalid={meta.touched && meta.error}
    />
  );
}

export default Checkbox;
