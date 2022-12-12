import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
import { Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const Patient = () => {
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
      "https://ds-idev-func-okta-hit.azurewebsites.net/api/dsep/demo/pat/" +
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
            Patient Id :
          </h3>
          <Form.Control
            placeholder="DSEP Patient ID"
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
                    <div className="patopblock-summary">
                      {entry.resource.resourceType === "Patient" && (
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
                            {entry.resource.birthDate && (
                              <tr>
                                <td>BirthDate:</td>
                                <td>{entry.resource.birthDate}</td>
                              </tr>
                            )}
                            {entry.resource.name && (
                              <tr>
                                <td>Name:</td>
                                <td>{entry.resource.name[0].text}</td>
                              </tr>
                            )}
                            {entry.resource.identifier &&
                              entry.resource.identifier[0] && (
                                <tr>
                                  <td>
                                    {entry.resource.identifier[0].type.text}
                                  </td>
                                  <td>{entry.resource.identifier[0].value}</td>
                                </tr>
                              )}
                            {entry.resource.identifier &&
                              entry.resource.identifier[1] && (
                                <tr>
                                  <td>
                                    {entry.resource.identifier[1].type.text}
                                  </td>
                                  <td>{entry.resource.identifier[1].value}</td>
                                </tr>
                              )}
                            {entry.resource.identifier &&
                              entry.resource.identifier[2] && (
                                <tr>
                                  <td>
                                    {entry.resource.identifier[2].type.text}
                                  </td>
                                  <td>{entry.resource.identifier[2].value}</td>
                                </tr>
                              )}
                            {entry.resource.gender &&
                              entry.resource.gender.coding && (
                                <tr>
                                  <td>Gender:</td>
                                  <td>
                                    {entry.resource.gender.coding[0].display}
                                  </td>
                                </tr>
                              )}

                            {entry.resource.address &&
                              entry.resource.address[0] && (
                                <tr>
                                  <td>State:</td>
                                  <td>{entry.resource.address[0].state}</td>
                                </tr>
                              )}
                            {entry.resource.address &&
                              entry.resource.address[0] && (
                                <tr>
                                  <td>city:</td>
                                  <td>{entry.resource.address[0].city}</td>
                                </tr>
                              )}
                          </tbody>
                        </Table>
                      )}
                    </div>
                  );
                })}
              {patientdata &&
                patientdata["entry"] &&
                patientdata["entry"].map((entry) => {
                  return (
                    <div class="opblock-summary">
                      {entry.resource.resourceType !== "Patient" && (
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
                            {/* procedure */}
                            {entry.resource && entry.resource.serviceType && (
                              <tr>
                                <td>Service Type:</td>
                                <td>{entry.resource.serviceType[0].text}</td>
                              </tr>
                            )}

                            {entry.resource && entry.resource.code && (
                              <tr>
                                <td>Procedure Description:</td>
                                <td>{entry.resource.code.text}</td>
                              </tr>
                            )}

                            {entry.resource &&
                              entry.resource.performer &&
                              entry.resource.performer[0].actor && (
                                <tr>
                                  <td>Performer:</td>
                                  <td>
                                    {
                                      entry.resource.performer[0].actor
                                        .identifier[0].display
                                    }
                                  </td>
                                </tr>
                              )}

                            {entry.resource.priority && (
                              <tr>
                                <td>Priority:</td>
                                <td>{entry.resource.priority}</td>
                              </tr>
                            )}

                            {entry.resource.initent && (
                              <tr>
                                <td>Intent:</td>
                                <td>{entry.resource.initent}</td>
                              </tr>
                            )}
                            {entry.resource.start && (
                              <tr>
                                <td>Start:</td>
                                <td>{entry.resource.start}</td>
                              </tr>
                            )}
                            {entry.resource.end && (
                              <tr>
                                <td>End:</td>
                                <td>{entry.resource.end}</td>
                              </tr>
                            )}

                            {entry.resource.reaction &&
                              entry.resource.reaction && (
                                <tr>
                                  <td>Allergy Severity:</td>
                                  <td>{entry.resource.reaction[0].severity}</td>
                                </tr>
                              )}

                            {entry.resource.reaction &&
                              entry.resource.reaction && (
                                <tr>
                                  <td>Allergy Description:</td>
                                  <td>
                                    {entry.resource.reaction[0].description}
                                  </td>
                                </tr>
                              )}

                            {entry.resource.clinicalStatus && (
                              <tr>
                                <td>Status:</td>
                                <td>{entry.resource.clinicalStatus}</td>
                              </tr>
                            )}

                            {entry.resource.criticality && (
                              <tr>
                                <td>Criticality:</td>
                                <td>{entry.resource.criticality}</td>
                              </tr>
                            )}

                            {entry.resource.verificationStatus && (
                              <tr>
                                <td>VerificationStatus:</td>
                                <td>{entry.resource.verificationStatus}</td>
                              </tr>
                            )}

                            {entry.resource.onsetDateTime && (
                              <tr>
                                <td>OnsetDateTime:</td>
                                <td>{entry.resource.onsetDateTime}</td>
                              </tr>
                            )}

                            {entry.resource && (
                              <tr>
                                <td>ID:</td>
                                <td>{entry.resource.id}</td>
                              </tr>
                            )}

                            {entry.resource.status && (
                              <tr>
                                <td>Status:</td>
                                <td>{entry.resource.status}</td>
                              </tr>
                            )}

                            {entry.resource.end && (
                              <tr>
                                <td>End:</td>
                                <td>{entry.resource.end}</td>
                              </tr>
                            )}

                            {entry.resource &&
                              entry.resource.identifier &&
                              entry.resource.identifier.map((entry) => {
                                <tr>
                                  <td>
                                    {String(entry.type.text).toUpperCase()}
                                  </td>
                                  <td>{entry.type.value}</td>
                                </tr>;
                              })}

                            {entry.resource.birthDate && (
                              <tr>
                                <td>BirthDate:</td>
                                <td>{entry.resource.birthDate}</td>
                              </tr>
                            )}

                            {entry.resource.name && (
                              <tr>
                                <td>Name:</td>
                                <td>{entry.resource.name[0].text}</td>
                              </tr>
                            )}

                            {entry.resource.gender &&
                              entry.resource.gender.coding && (
                                <tr>
                                  <td>Gender:</td>
                                  <td>
                                    {entry.resource.gender.coding[0].display}
                                  </td>
                                </tr>
                              )}

                            {/* address */}

                            {entry.resource.address &&
                              entry.resource.address[0] && (
                                <tr>
                                  <td>State:</td>
                                  <td>{entry.resource.address[0].state}</td>
                                </tr>
                              )}
                            {entry.resource.address &&
                              entry.resource.address[0] && (
                                <tr>
                                  <td>city:</td>
                                  <td>{entry.resource.address[0].city}</td>
                                </tr>
                              )}
                            {entry.resource.Reactaddress &&
                              entry.resource.address[0] && (
                                <tr>
                                  <td>postalCode:</td>
                                  <td>
                                    {entry.resource.address[0].postalCode}
                                  </td>
                                </tr>
                              )}

                            {/* contact */}

                            {entry.resource.telecom &&
                              entry.resource.telecom[0] &&
                              entry.resource.telecom.map((entry) => {
                                <tr>
                                  <td>{String(entry.system).toUpperCase}</td>
                                  <td>{entry.value}</td>
                                </tr>;
                              })}

                            {entry.resource.medicationReference &&
                              entry.resource.medicationReference.display && (
                                <tr>
                                  <td>Medication</td>
                                  <td>
                                    {entry.resource.medicationReference.display}
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </Table>
                      )}
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

export default Patient;
