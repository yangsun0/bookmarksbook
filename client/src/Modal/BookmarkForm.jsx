import { Formik } from "formik";
import * as React from "react";
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

type BookmarkFormValues = {
  name: string,
  url: string,
  group: string,
  order: number,
};

const schema: ObjectSchema<BookmarkFormValues> = yup.object({
  name: yup.string().required().max(50),
  url: yup.string().required().url(),
  group: yup.string().required(),
  order: yup.number().required(),
});

const options: Options = [
  { value: "1", label: "Favorite" },
  { value: "2", label: "Read it later" },
];

const orderOptions: Options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
];

type Props = {
  onClose: ButtonClickHandler,
  onSubmit: SaveBookmarkHandler,
  data?: Bookmark,
};

function BookmarkForm(props: Props) {
  const { onClose, onSubmit, data } = props;
  // need to set all the field of initialValues to make submit validation work
  let initialValues: BookmarkFormValues = {
    name: "",
    url: "",
    group: "1",
    order: 1,
  };
  if (data) {
    initialValues.name = data.name;
    initialValues.url = data.url;
  }

  const submitForm = (values: BookmarkFormValues) => {
    const bookmark: Bookmark = {
      id: "",
      name: values.name,
      url: values.url,
      // TODO: generate icon url
      iconUrl: values.url + "/favicon",
      group: values.group,
      order: values.order,
    };
    if (data) {
      bookmark.id = data.id;
    }

    onSubmit(bookmark);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={initialValues}
    >
      {(formik) => (
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
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
              extra={<Button variant="link">New</Button>}
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

export default BookmarkForm;
