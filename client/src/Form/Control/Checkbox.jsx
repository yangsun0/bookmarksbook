import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import ControlLayout from "./ControlLayout";

type Option = {
  value: string,
  label: string,
};

type Props = {
  name: string,
  type: "radio" | "checkbox",
  label: string,
  options: Array<Option>,
};

function Checkbox(props: Props) {
  const { name, type, label, options } = props;

  return (
    <ControlLayout name={name} label={label}>
      <div className="d-flex h-100">
        {options.map((option) => (
          <CheckboxOption
            key={option.value}
            name={name}
            type={type}
            label={option.label}
            value={option.value}
          />
        ))}
      </div>
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

  const handleChange = () => helpers.setValue(value);

  return (
    <Form.Check
      inline
      name={name}
      type={type}
      label={label}
      id={name + value}
      value={value}
      checked={field.checked}
      onChange={handleChange}
      onBlur={field.onBlur}
      aria-label={label}
      isInvalid={meta.touched && meta.error}
    />
  );
}

export default Checkbox;
