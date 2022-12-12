import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";
import "./all.css";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
import { Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const DeltaChange = () => {
  const [mrnId, setMrnId] = useState();
  const [mrnToken, setMrnToken] = useState();
  const [patientdata, setPatientData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentToken, setCurrentToken] = useState(false);

  let mrntohit;

  useEffect(() => {
    mrntohit = mrnId;
    console.log("mrnId " + mrnId);
    console.log("mrn to hit " + mrntohit);
    console.log("patient data " + patientdata);
    console.log("mrnToken " + mrnToken);
    console.log("currentToken " + currentToken);
  });

  async function trigger() {
    hitMRN(mrntohit);
  }

  async function hitMRN(mrntohit) {
    setIsLoading(true);
    setPatientData();
    // const now = Date.now();
    // console.log(now)
    let mrnUrl =
      "https://ds-idev-func-okta-hit.azurewebsites.net/api/dsep/demo/delta/" +
      currentToken +
      "/" +
      mrntohit;
    // "https://api-dev.thesurgicalnet.com/dsp/api/deltachange?org_id=2.16.840.1.119358475923.1&epoch_from=" + mrntohit;
    console.log(mrnUrl);
    const data = await fetch(mrnUrl, {
      method: "Get",
      // headers: {
      //   Authorization: "Bearer " + token,
      // },
    }).then((data) => data.json());
    console.log(data);
    setPatientData(data);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <Form className="mrnsearch">
        <InputGroup className="mb-3">
          <h3
            style={{
              margin: "10px",
            }}
          >
            Epoch from :
          </h3>
          <Form.Control
            placeholder="Epoch Time"
            onChange={(e) => {
              setMrnId(e.target.value);
            }}
          />
          <Button
            variant="primary"
            id="button-addon2"
            style={{ backgroundColor: "#9DC1FC", color: "#000000" }}
            onClick={() => {
              trigger();
            }}
          >
            Search
          </Button>
        </InputGroup>

        <InputGroup className="mr-3">
          <h3
            style={{
              margin: "10px",
            }}
          >
            Token :
          </h3>
          <Form.Control
            placeholder="Token"
            onChange={(e) => {
              setCurrentToken(e.target.value);
            }}
          ></Form.Control>
        </InputGroup>
      </Form>
      <Tabs>
        <Tab eventKey="res" title="Response">
          {isLoading ? (
            <div>
              <Spinner
                style={{ margin: "50px" }}
                animation="border"
                role="status"
                variant="primary"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
              {patientdata && (
                <div
                  style={{
                    position: "relative",
                    textAlign: "left",
                    paddingLeft: "30px",
                    paddingTop: "30px",
                  }}
                >
                  <h4>
                    Transactions Received: {patientdata["resource_count"]}
                  </h4>
                  <h4>Epoch From: {patientdata["epoch_from"]}</h4>
                  <h4>Epoch To: {patientdata["epoch_to"]}</h4>
                  <h4>Org Id: {patientdata["org_id"]}</h4>
                </div>
              )}
              {patientdata &&
                patientdata["blob_name"] &&
                patientdata["blob_name"].map((entry) => {
                  return (
                    <div class="patopblock-summary">
                      <Table striped bordered hover size="sm">
                        <tbody className="responseTable">
                          <tr>
                            <th>Resource:</th>
                            <td>
                              <b>{entry.resource}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>URL</td>
                            <td>{entry.url}</td>
                          </tr>
                          <tr>
                            <td>ID</td>
                            <td>{entry.id}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  );
                })}
              {
                <Accordion
                  defaultActiveKey="0"
                  style={{
                    textAlign: "left",
                    display: "block",
                    padding: "70px",
                    margin: "30",
                  }}
                >
                  <Accordion.Item>
                    <Accordion.Header>Json</Accordion.Header>
                    <Accordion.Body>
                      <pre>{JSON.stringify(patientdata, null, 5)}</pre>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              }
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default DeltaChange;
