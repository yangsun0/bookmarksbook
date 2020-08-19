import { Formik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import useStore from "../Store/useStore";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import type { Option } from "./Dropdown";
import Textbox from "./Textbox";

type CloseEventHandler = () => void;

type Props = {
  onClose: CloseEventHandler,
};

type BookmarkGroupFormValues = {
  name: string,
  column: string,
  order: string,
};

const schema: ObjectSchema<BookmarkGroupFormValues> = yup.object({
  name: yup.string().required().max(50),
  column: yup.string().required(),
  order: yup.string().required(),
});

const columnOptions = [
  { value: "1", label: "left" },
  { value: "2", label: "right" },
];

function BookmarkGroupForm(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const store = useStore();
  const currentGroup = store.currentGroup;
  const initialValues: BookmarkGroupFormValues = {
    name: currentGroup.name,
    column: currentGroup.column.toString(),
    order: currentGroup.order.toString(),
  };

  const orderOptions: Array<Option> = [];
  const count =
    currentGroup.column === 1
      ? store.leftGroups.length
      : store.rightGroups.length;
  for (let i = 0; i < count; i++) {
    const order = i + 1;
    orderOptions.push({ label: order.toString(), value: order.toString() });
  }

  const submitForm = (values: BookmarkGroupFormValues) => {
    const group = {
      name: values.name,
      column: parseInt(values.column),
      order: parseInt(values.order),
    };
    store.saveGroup(group);
    onClose();
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
            <Modal.Title id="group-modal-title">
              {t("dialog.group")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Textbox
              name="name"
              type="text"
              label={t("form.name")}
              placeholder={t("form.groupTextbox")}
            />
            <Checkbox
              name="column"
              type="radio"
              label={t("form.column")}
              options={columnOptions}
            />
            <Dropdown
              name="order"
              label={t("form.order")}
              options={orderOptions}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              {t("button.close")}
            </Button>
            <Button variant="primary" type="submit">
              {t("button.save")}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}

export default BookmarkGroupForm;
