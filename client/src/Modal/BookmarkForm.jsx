import { Formik } from "formik";
import type { FormikProps } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import type { ObjectSchema } from "yup/lib/object";
import type {
  Bookmark,
  ButtonClickHandler,
  Options,
  SaveBookmarkHandler,
} from "../App/Types";
import Dropdown from "./Dropdown";
import Textbox from "./Textbox";

type Props = {
  onClose: ButtonClickHandler,
  onSubmit: SaveBookmarkHandler,
  data?: Bookmark,
};

type BookmarkFormValues = {
  name: string,
  url: string,
  group: string,
};

function BookmarkForm(props: Props) {
  const { onClose, onSubmit, data } = props;

  const schema: ObjectSchema<BookmarkFormValues> = yup.object({
    name: yup.string().required().max(50),
    url: yup.string().required().url(),
    group: yup.string().required(),
  });

  const options: Options = [
    { value: "1", label: "Favorite" },
    { value: "2", label: "Read it later" },
  ];

  const handleSubmit = (values: BookmarkFormValues) => {
    const bookmark: Bookmark = {
      id: 0,
      name: values.name,
      url: values.url,
      iconUrl: values.url + "/favicon",
      group: values.group,
    };
    if (onSubmit) {
      onSubmit(bookmark);
    }
  };

  let initial = {};
  if (data) {
    initial = {
      name: data.name,
      url: data.url,
    };
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={initial}
    >
      {(formik) => (
        <BookmarkFormik formik={formik} onClose={onClose} options={options} />
      )}
    </Formik>
  );
}

type BookmarkFormikProps = {
  formik: FormikProps<BookmarkFormValues>,
  onClose: ButtonClickHandler,
  options: Options,
};

function BookmarkFormik(props: BookmarkFormikProps) {
  const { formik, onClose, options } = props;

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
          placeholder="Enter the bookmark name"
        />
        <Textbox
          name="url"
          type="text"
          label="URL"
          placeholder="Enter the URL"
        />
        <Dropdown
          name="group"
          label="Group"
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

export default BookmarkForm;
