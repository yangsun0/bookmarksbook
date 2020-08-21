import { Formik, useFormikContext } from "formik";
import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import useStore from "../Store/useStore";
import Dropdown from "./Dropdown";
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

function GroupChangeListener() {
  const {
    values: { groupId },
    setFieldValue,
  } = useFormikContext();
  const store = useStore().bookmarkFormStore;

  useEffect(() => {
    store.changeGroup(groupId);
    if (store.changeGroup(groupId)) {
      setFieldValue("order", "1");
    } else {
      setFieldValue("order", store.bookmark.order.toString());
    }
  }, [groupId, setFieldValue, store]);
  return null;
}

function BookmarkForm(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const store = useStore().bookmarkFormStore;

  const bookmark = store.bookmark;
  const initialBookmark: BookmarkFormValues = {
    name: bookmark.name,
    url: bookmark.url,
    groupId: bookmark.groupId,
    order: bookmark.order.toString(),
  };

  const groupOptions = store.appStore.groups.map((group) => {
    return { label: group.name, value: group.id };
  });

  const submit = (values: BookmarkFormValues) => {
    const bookmark = {
      name: values.name,
      url: values.url,
      groupId: values.groupId,
      order: parseInt(values.order),
    };
    store.save(bookmark);
    onClose();
  };

  return useObserver(() => (
    <Formik
      validationSchema={schema}
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
