import { Formik, useFormikContext } from "formik";
import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import useStore from "../Store/useStore";
import Checkbox from "./Control/Checkbox";
import Dropdown from "./Control/Dropdown";
import Textbox from "./Control/Textbox";

type CloseEventHandler = () => void;

type Props = {
  onClose: CloseEventHandler,
};

type GroupFormValues = {
  name: string,
  column: string,
  order: string,
};

const schema: ObjectSchema<GroupFormValues> = yup.object({
  name: yup.string().required().max(50),
  column: yup.string().required(),
  order: yup.string().required(),
});

function ColumnChangeListener() {
  const {
    values: { column },
    setFieldValue,
  } = useFormikContext();
  const store = useStore().groupFormStore;

  useEffect(() => {
    if (store.changeColumn(column)) {
      setFieldValue("order", "1");
    } else {
      setFieldValue("order", store.group.order.toString());
    }
  }, [column, setFieldValue, store]);

  return null;
}

function GroupForm(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const store = useStore().groupFormStore;
  const group = store.group;
  const initialValues: GroupFormValues = {
    name: group.name,
    column: group.column.toString(),
    order: group.order.toString(),
  };
  const columnOptions = [
    { value: "1", label: t("form.left") },
    { value: "2", label: t("form.right") },
  ];

  const submitForm = (values: GroupFormValues) => {
    const group = {
      name: values.name,
      column: parseInt(values.column),
      order: parseInt(values.order),
    };
    store.save(group);
    onClose();
  };

  return useObserver(() => (
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
            <ColumnChangeListener />
            <Dropdown
              name="order"
              label={t("form.order")}
              options={store.orderOptions}
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
  ));
}

export default GroupForm;
