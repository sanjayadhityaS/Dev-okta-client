// import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/esm/Nav";
import DeltaChange from "./pages/DeltaChange";
import MRN from "./pages/MRN";
import Organization from "./pages/Organization";
import Patient from "./pages/Patient";
import Practitioner from "./pages/Practitioner";
import Authentication from "./pages/auth";

function App() {
  return (
    <div>
      <Nav>
        <img
          style={{
            margin:"auto"
          }}
          src={require("./images/images.jfif")}
          alt="logo"
        />
      </Nav>
      <Tabs>
        <Tab eventKey="Auth" title="OKTA Authentication">
          <Authentication/>
        </Tab>
        <Tab eventKey="Delta" title="DeltaChange"><DeltaChange/></Tab>
        <Tab eventKey="Pat" title="Patient"><Patient/></Tab>
        <Tab eventKey="MRN" title="MRN"><MRN/></Tab>
        <Tab eventKey="Org" title="Organization"><Organization/></Tab>
        <Tab eventKey="Pract" title="Practitioner"><Practitioner/></Tab>
      </Tabs>
    </div>
  )
}

export default App;















































  // const [mrnId, setMrnId] = useState();
  // const [mrnToken, setMrnToken] = useState();
  // const [patientdata, setPatientData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // let mrntohit;

  // useEffect(() => {
  //   mrntohit = mrnId;
  //   console.log("mrnId " + mrnId);
  //   console.log("mrntohit " + mrntohit);
  //   console.log("patientdata " + patientdata);
  //   console.log("mrnToken " + mrnToken);
  // });

  // async function trigger() {
  //   hitMRN(mrntohit);
  // }

  // // async function authTrigger() {
  // //   // let tokenUrl = "https://dev.medtech.accounts.jnj/oauth2/aus3enzgjnldWMnBV697/v1/token"
  // //   // const tokenData = await fetch(
  // //   //   tokenUrl,{
  // //   //     method: 'POST',
  // //   //     body:'client_id=0oa3eo04w5Gq1VxkE697&client_secret=ZJefSm8IX0EL_MSxALhChBoyyUoQVUfPlz7PerM5&grant_type=client_credentials&scope=daa',
  // //   //     headers : {
  // //   //       'Content-Type': 'application/x-www-form-urlencoded'
  // //   //     }
  // //   //   	// body: 'grant_type=client_credentials&client_id=0oa3eo04w5Gq1VxkE697&client_secret=ZJefSm8IX0EL_MSxALhChBoyyUoQVUfPlz7PerM5&scope=daa&Client_Authentication=Send as Besic Auth Header',
  // //   //   }
  // //   // )
  // //   var myHeaders = new Headers();
  // //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // //   myHeaders.append("Cookie", "JSESSIONID=44163F939017E6E4199696A0093ADF77");

  // //   var urlencoded = new URLSearchParams();
  // //   urlencoded.append("client_id", "0oa3eo04w5Gq1VxkE697");
  // //   urlencoded.append("client_secret", "ZJefSm8IX0EL_MSxALhChBoyyUoQVUfPlz7PerM5");
  // //   urlencoded.append("grant_type", "client_credentials");
  // //   urlencoded.append("scope", "daa");
  // //   // urlencoded.append("Origin", "");

  // //   var requestOptions = {
  // //     method: 'POST',
  // //     headers: myHeaders,
  // //     body: urlencoded,
  // //     redirect: 'follow'
  // //   };
  // //   console.log(myHeaders.get('Host'))

  // //   let tokenData = fetch("https://dev.medtech.accounts.jnj/oauth2/aus3enzgjnldWMnBV697/v1/token", requestOptions)
  // //     .then(response => response.text())
  // //     .then(result => console.log(result))
  // //     .catch(error => console.log('error', error));

  // //   setMrnToken(tokenData);


  // //   console.log("mrnToken " + mrnToken);
  // // }

  // async function hitMRN(mrntohit) {
  //   setIsLoading(true);
  //   setPatientData();
  //   let mrnUrl =
  //     "https://api-dev.thesurgicalnet.com/dsp/api/mrnsearch?mrn=" + mrntohit;
  //   console.log(mrnUrl);
  //   let token =
  //     "eyJraWQiOiJtMlBhZzQ1bzZyM3JhYkZNUV9CZFV1cDFPNTF5UnItVUdpdmtkUlkxUW9VIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmZpV1M5QjJGbHVsUnFQMU1DbmJOaENrMkF5ZUlPUnF3b3dSeG5QeUpUSjAiLCJpc3MiOiJodHRwczovL2Rldi5tZWR0ZWNoLmFjY291bnRzLmpuai9vYXV0aDIvYXVzM2VuemdqbmxkV01uQlY2OTciLCJhdWQiOiJodHRwczovL2RzZXAtZGV2Lm9rdGEuY29tIiwiaWF0IjoxNjcwNDgyODI2LCJleHAiOjE2NzA0ODY0MjYsImNpZCI6IjBvYTNlbzA0dzVHcTFWeGtFNjk3Iiwic2NwIjpbImRhYSJdLCJzdWIiOiIwb2EzZW8wNHc1R3ExVnhrRTY5NyJ9.GoBPN5D_a0N-L8eRTN1ckqmuEW0PTsZ3R_iGTqI9Z-aN20HFOCpsuHqJCIMl4ps4KAd0C05dbd5dtA0G33o5imepF_XGbH0vf71bRg2Yk4vwbDDrQMDecqDQ8VeYkejAxTyvaBSTpR7hSer7hH09nRYI81JxV5cpMnhTl5c-Iy8IA3Q9t1x7yZtD9IXhM9lYu-qD8PPdc4aacab4jP4mv6vHyro3d2zwugf3MhMuB_0icEN4v7yp72wfeVehK2Q2FFpWj9Kz5bB6q7Qur_7QB3svzAiGYKz0Q2RjdCB1qjRf6NJDLsDyoFz8xGI2DRnF8zx58WZ_WfbZf4I1GkUTtg";
  //   const data = await fetch(mrnUrl, {
  //     method: "Get",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   }).then((data) => data.json());
  //   console.log(data);
  //   setPatientData(data);
  //   setIsLoading(false);
  // }

  // return (
  //   <div className="App">
  //     <Nav>
  //       <img
  //         style={{
  //           width: "400px",
  //           height: "120px",
  //           marginLeft: "600px",
  //           marginRight: "800px"
  //         }}
  //         src={require("./images/images.jfif")}
  //         alt="logo"
  //       />
  //     </Nav>
  //     <Form
  //       className="mrnsearch"
  //       style={{
  //         backgroundColor: "#F3E3DF",
  //       }}
  //     >
  //       <InputGroup className="mb-3">
  //         <Form.Control
  //           placeholder="mrn number"
  //           onChange={(e) => {
  //             setMrnId(e.target.value);
  //           }}
  //         />
  //         <Button
  //           variant="primary"
  //           id="button-addon2"
  //           style={{ backgroundColor: "#9DC1FC", color: "#000000" }}
  //           onClick={() => {
  //             trigger();
  //           }}
  //         >
  //           Search
  //         </Button>
  //       </InputGroup>
  //     </Form>
  //     <Tabs>
  //       <Tab eventKey="auth" title="Authorization">
  //         <Form className="mrnsearch">
  //           <InputGroup className="mb-3">
  //             <Button
  //               variant="primary"
  //               id="button-addon2"
  //               style={{ backgroundColor: "#9DC1FC", color: "#000000" }}
  //               onClick={() => {
  //                 // authTrigger();
  //               }}
  //             >
  //               Authorize
  //             </Button>
  //           </InputGroup>
  //         </Form>
  //       </Tab>
  //       <Tab eventKey="res" title="Response">
  //         {isLoading ? (
  //           <div>
  //             <Spinner
  //               style={{ margin: "50px" }}
  //               animation="border"
  //               role="status"
  //               variant="primary"
  //             >
  //               <span className="visually-hidden">Loading...</span>
  //             </Spinner>
  //           </div>
  //         ) : (
  //           <pre
  //             style={{
  //               textAlign: "left",
  //               display: "block",
  //               padding: "70px",
  //               margin: "30",
  //             }}
  //           >
  //             {JSON.stringify(patientdata, null, 5)}
  //           </pre>
  //         )}
  //       </Tab>
  //     </Tabs>
  //   </div>
  // );