import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const Authentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState();

  async function trigger() {
    setIsLoading(true);
    setShowToken(false);
    let mrnUrl =
      "https://ds-idev-func-okta-hit.azurewebsites.net/api/dsep/demo/okta";
    const data = await fetch(mrnUrl, {
      method: "Get",
    }).then((data) => data.json());
    console.log(data["access_token"]);
    setToken(data["access_token"]);
    setIsLoading(false);
    setShowToken(true);
  }

  return (
    <div>
      <Row>
        <Col sm={4}>
          <Form
            className="Authmrnsearch"
            style={{
              backgroundColor: "#d1deed",
              marginLeft: "100px",
              marginTop: "100px",
            }}
          >
            <InputGroup>
              <Form.Control
                placeholder="Client Id"
                onChange={(e) => {}}
                value={"0oa3eo04w5Gq1VxkE697"}
                style={{
                  marginRight: "30px",
                  marginLeft: "30px",
                  marginTop: "30px",
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Client Secret"
                value={"0oa3eo04w5Gq1VxkE697"}
                type="password"
                onChange={(e) => {}}
                style={{
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              />
            </InputGroup>
            <Button
              variant="primary"
              id="button-addon2"
              style={{
                backgroundColor: "#9DC1FC",
                color: "#000000",
                margin: "30px",
              }}
              onClick={() => {
                trigger();
              }}
            >
              Authorize
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          {isLoading ? (
            <div>
              <Spinner
                style={{ marginTop: "100px" }}
                animation="grow"
                role="status"
                variant="primary"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              {showToken && (
                <Alert
                  variant="success"
                  style={{
                    backgroundColor: "#d1deed",
                    marginRight: "200px",
                    marginTop: "100px",
                  }}
                >
                  <Alert.Heading>OKTA Token Generated</Alert.Heading>
                  <InputGroup className="mb-3">
                    <Form.Control value={token} />
                  </InputGroup>
                </Alert>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Authentication;
