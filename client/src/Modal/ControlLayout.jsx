import * as Formik from "formik";
import * as React from "react";
import { Col, Form, Row } from "react-bootstrap";

type Props = {
  children: React.Node,
  name: string,
  label: string,
  meta: Formik.FieldMetaProps<any>,
  extra?: React.Node,
};

function ControlLayout(props: Props) {
  const { name, label, meta, children, extra } = props;
  return (
    <Form.Group as={Row} controlId={name}>
      <Form.Label column md={2} lg={1}>
        {label}
      </Form.Label>
      <Col>
        {children}
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      </Col>
      {extra && <Col xs="auto">{extra}</Col>}
    </Form.Group>
  );
}

export default ControlLayout;
