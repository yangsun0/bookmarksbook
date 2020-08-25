import { Formik, useFormikContext } from "formik";
import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import { useGroupFormStore } from "../Store";
import type { IGroupFormValues } from "../Store";
import Checkbox from "./Control/Checkbox";
import Dropdown from "./Control/Dropdown";
import Textbox from "./Control/Textbox";

function ColumnChangeListener() {
  const {
    values: { column, order },
    setFieldValue,
  } = useFormikContext();
  const store = useGroupFormStore();

  useEffect(() => {
    store.changeColumn(column);
    if (store.shouldResetOrder(order)) {
      setFieldValue("order", "1");
    }
  }, [column, order, setFieldValue, store]);

  return null;
}

type CloseEventHandler = () => void;

type Props = {
  onClose: CloseEventHandler,
};

function GroupForm(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const store = useGroupFormStore();
  const groupSchema: ObjectSchema<IGroupFormValues> = yup.object({
    name: yup.string().required().max(50),
    column: yup.string().required(),
    order: yup.string().required(),
  });
  const initialGroup = store.toGroupFormValues();
  const columnOptions = [
    { value: "1", label: t("form.left") },
    { value: "2", label: t("form.right") },
  ];

  const submit = (group: IGroupFormValues) => {
    store.save(group);
    onClose();
  };

  return useObserver(() => (
    <Formik
      validationSchema={groupSchema}
      onSubmit={submit}
      initialValues={initialGroup}
    >
      {(formik) => (
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
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
