import { Formik } from "formik";
import type { FormikProps } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import type {
  ButtonClickHandler,
  Group,
  Options,
  SaveGroupHandler,
} from "../App/Types";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import Textbox from "./Textbox";

type Props = {
  onClose: ButtonClickHandler,
  onSubmit: SaveGroupHandler,
};

type BookmarkGroupFormValues = {
  name: string,
  column: number,
  order: number,
};

function BookmarkGroupForm(props: Props) {
  const { onClose, onSubmit } = props;

  const schema: ObjectSchema<BookmarkGroupFormValues> = yup.object({
    name: yup.string().required().max(50),
    column: yup.number().required(),
    order: yup.number().required(),
  });

  const options: Options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];

  const handleSubmit = (values: BookmarkGroupFormValues) => {
    const group: Group = {
      id: 0,
      name: values.name,
      column: values.column,
      order: values.order,
    };
    if (onSubmit) {
      onSubmit(group);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        column: 1,
        order: 1,
      }}
    >
      {(formik) => (
        <BookmarkGroupFormik
          formik={formik}
          onClose={onClose}
          options={options}
        />
      )}
    </Formik>
  );
}

type BookmarkGroupFormikProps = {
  formik: FormikProps<BookmarkGroupFormValues>,
  onClose: ButtonClickHandler,
  options: Options,
};

function BookmarkGroupFormik(props: BookmarkGroupFormikProps) {
  const { formik, onClose, options } = props;
  const columnOptions = [
    { label: "left", value: 1 },
    { label: "right", value: 2 },
  ];

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Bookmark</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Textbox
          name="name"
          type="text"
          label="Name"
          placeholder="Enter the bookmark group name"
        />
        <Checkbox
          name="column"
          type="radio"
          label="Column"
          options={columnOptions}
          formik={formik}
        />
        <Dropdown
          name="order"
          label="Order"
          options={options}
          formik={formik}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  );
}

export default BookmarkGroupForm;
