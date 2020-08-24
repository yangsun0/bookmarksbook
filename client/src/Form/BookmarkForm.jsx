import { Formik, useFormikContext } from "formik";
import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import type { IBookmarkFormValues } from "../Store/BookmarkFormStore";
import { useBookmarkFormStore } from "../Store/useStore";
import Dropdown from "./Control/Dropdown";
import Textbox from "./Control/Textbox";

const bookmarkSchema: ObjectSchema<IBookmarkFormValues> = yup.object({
  name: yup.string().required().max(50),
  url: yup.string().required().url(),
  groupId: yup.string().required(),
  order: yup.string().required(),
});

function GroupChangeListener() {
  const {
    values: { groupId, order },
    setFieldValue,
  } = useFormikContext();
  const store = useBookmarkFormStore();

  useEffect(() => {
    store.changeGroup(groupId);
    if (store.shouldResetOrder(order)) {
      setFieldValue("order", "1");
    }
  }, [groupId, order, setFieldValue, store]);
  return null;
}

type CloseEventHandler = () => void;

type Props = {
  onClose: CloseEventHandler,
};

function BookmarkForm(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const store = useBookmarkFormStore();

  const initialBookmark = store.toBookmarkFormValues();
  const groupOptions = store.toGroupOptions();

  const submit = (values: IBookmarkFormValues) => {
    store.save(values);
    onClose();
  };

  return useObserver(() => (
    <Formik
      validationSchema={bookmarkSchema}
      onSubmit={submit}
      initialValues={initialBookmark}
    >
      {(formik) => (
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <Modal.Header closeButton>
            <Modal.Title id="bookmark-modal-title">
              {t("dialog.bookmark")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Textbox
              name="name"
              type="text"
              label={t("form.name")}
              placeholder={t("form.nameTextbox")}
            />
            <Textbox
              name="url"
              type="text"
              label={t("form.url")}
              placeholder={t("form.urlTextbox")}
            />
            <Dropdown
              name="groupId"
              label={t("form.group")}
              options={groupOptions}
              extra={<Button variant="link">{t("button.new")}</Button>}
            />
            <GroupChangeListener />
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

export default BookmarkForm;
