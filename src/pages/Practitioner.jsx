import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
import { Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const Practitioner = () => {
  const [mrnId, setMrnId] = useState();
  const [mrnToken, setMrnToken] = useState();
  const [patientdata, setPatientData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentToken, setCurrentToken] = useState(false);

  let mrntohit;

  useEffect(() => {
    mrntohit = mrnId;
    console.log("mrnId " + mrnId);
    console.log("mrntohit " + mrntohit);
    console.log("patientdata " + patientdata);
    console.log("mrnToken " + mrnToken);
    console.log("currentToken " + currentToken);
  });

  async function trigger() {
    hitMRN(mrntohit);
  }

  async function hitMRN(mrntohit) {
    setIsLoading(true);
    setPatientData();
    let mrnUrl =
      "https://ds-idev-func-okta-hit.azurewebsites.net/api/dsep/demo/pract/" +
      currentToken +
      "/" +
      mrntohit;
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
            Practitioner Id :
          </h3>
          <Form.Control
            placeholder="DSEP Practitioner ID"
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
              {patientdata &&
                patientdata["entry"] &&
                patientdata["entry"].map((entry) => {
                  return (
                    <div class="opblock-summary">
                      <Table striped bordered hover size="sm">
                        <tbody className="responseTable">
                          {entry.resource && (
                            <tr>
                              <th>Resource:</th>
                              <td>
                                <b>{entry.resource.resourceType}</b>
                              </td>
                            </tr>
                          )}
                          {entry.resource && (
                            <tr>
                              <td>ID:</td>
                              <td>{entry.resource.id}</td>
                            </tr>
                          )}
                          {entry.resource.name && (
                            <tr>
                              <td>Name:</td>
                              <td>{entry.resource.name[0].text}</td>
                            </tr>
                          )}
                          {entry.resource.address && (
                            <tr>
                              <td>City:</td>
                              <td>{entry.resource.address[0].city}</td>
                            </tr>
                          )}
                          {entry.resource.address && (
                            <tr>
                              <td>Use:</td>
                              <td>{entry.resource.address[0].use}</td>
                            </tr>
                          )}
                          {entry.resource.address && (
                            <tr>
                              <td>State:</td>
                              <td>{entry.resource.address[0].state}</td>
                            </tr>
                          )}
                          {entry.resource.address && (
                            <tr>
                              <td>postalCode:</td>
                              <td>{entry.resource.address[0].postalCode}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      {/* <Accordion defaultActiveKey="0" style={{
                              textAlign: "left",
                              display: "block",
                              padding: "70px",
                              margin: "30",
                            }}>
                              <Accordion.Item>
                                <Accordion.Header>Json</Accordion.Header>
                                <Accordion.Body>
                                  <pre>
                                    {JSON.stringify(patientdata, null, 5)}
                                  </pre>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion> */}
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

export default Practitioner;
