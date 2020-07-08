import { Formik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import type {
  ButtonClickHandler,
  Group,
  Options,
  SaveGroupHandler,
} from "../Common/Types";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import Textbox from "./Textbox";

type Props = {
  onClose: ButtonClickHandler,
  onSubmit: SaveGroupHandler,
  data?: Group,
};

type BookmarkGroupFormValues = {
  name: string,
  column: number,
  order: number,
};

const schema: ObjectSchema<BookmarkGroupFormValues> = yup.object({
  name: yup.string().required().max(50),
  column: yup.number().required(),
  order: yup.number().required(),
});

const columnOptions = [
  { value: 1, label: "left" },
  { value: 2, label: "right" },
];

const orderOptions: Options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
];

function BookmarkGroupForm(props: Props) {
  const { onClose, onSubmit, data } = props;
  const initialValues: BookmarkGroupFormValues = {
    name: "",
    column: 1,
    order: 1,
  };
  if (data) {
    initialValues.name = data.name;
    initialValues.column = data.column;
  }

  const submitForm = (values: BookmarkGroupFormValues) => {
    const group: Group = {
      id: "",
      name: values.name,
      column: values.column,
      order: values.order,
      bookmarkList: [],
    };
    if (data) {
      group.id = data.id;
    }
    onSubmit(group);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={initialValues}
    >
      {(formik) => (
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="group-modal-title">Group</Modal.Title>
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
            />
            <Dropdown name="order" label="Order" options={orderOptions} />
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
      )}
    </Formik>
  );
}

export default BookmarkGroupForm;
