import { Formik } from "formik";
import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import useStore from "../Store/useStore";
import Dropdown from "./Dropdown";
import type { Option } from "./Dropdown";
import Textbox from "./Textbox";

type BookmarkFormValues = {
  name: string,
  url: string,
  groupId: string,
  order: string,
};

type CloseEventHandler = () => void;

type Props = {
  onClose: CloseEventHandler,
};

const schema: ObjectSchema<BookmarkFormValues> = yup.object({
  name: yup.string().required().max(50),
  url: yup.string().required().url(),
  groupId: yup.string().required(),
  order: yup.string().required(),
});

function BookmarkForm(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const store = useStore();

  const currentBookmark = store.currentBookmark;
  const values: BookmarkFormValues = {
    name: currentBookmark.name,
    url: currentBookmark.url,
    groupId: currentBookmark.groupId,
    order: currentBookmark.order.toString(),
  };

  const groupOptions = store.groups.map((group) => {
    return { label: group.name, value: group.id };
  });

  const orderOptions: Array<Option> = [];
  if (currentBookmark.group) {
    for (let i = 1; i <= currentBookmark.group.bookmarks.length; i++) {
      orderOptions.push({ label: i.toString(), value: i.toString() });
    }
  } else {
    orderOptions.push({ label: "1", value: "1" });
  }

  const submit = (values: BookmarkFormValues) => {
    const bookmark = {
      name: values.name,
      url: values.url,
      groupId: values.groupId,
      order: parseInt(values.order),
    };
    store.saveBookmark(bookmark);
    onClose();
  };

  return (
    <Formik validationSchema={schema} onSubmit={submit} initialValues={values}>
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

export default BookmarkForm;
