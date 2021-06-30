import React, { useState, useEffect } from "react";
import {
  Image,
  DropdownButton,
  Dropdown,
  Button,
  Table,
  Badge,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import ImageC from "../Images/cowinlogo.png";
import ServiceFetchStateData from "../Services/FetchStateData";
import ServiceFetchDistrictData from "../Services/FetchDistrictData";
import ConstantsDisplayData from "../Constants/DisplayData";
import ServiceFetchCalenderData from "../Services/FetchCalenderData";
import Select from "react-select";
const DisplayData = () => {
  const [IndiaState, setIndiaState] = useState([]);
  const [IndiaDistrict, setIndiaDistrict] = useState([]);
  const [DistrictID, setDistrictID] = useState(0);
  const [arrDateCal, setarrDateCal] = useState([]);
  const [arrCenterDetails, setarrCenterDetails] = useState([]);
  const [arrCenterSession, setarrCenterSession] = useState([]);
  const [arrDisplaySession, setarrDisplaySession] = useState([]);
  //for filter
  const [arrFilterDetailsFee, setarrFilterDetailsFee] = useState([]);
  const [arrFilterDetailsList, setarrFilterDetailsList] = useState([]);
  const [arrFilterDetailsAge, setarrFilterDetailsAge] = useState([]);
  const [arrFilterDetailsVaccName, setarrFilterDetailsVaccName] = useState([]);
  const [arrFilterDetailsVaccAvaiability, setarrFilterDetailsVaccAvaiability] =
    useState([]);
  const [ButtonColor, setButtonColor] = useState("");
  const [ButtonColorAge, setButtonColorAge] = useState("");
  const [ButtonColorVaccName, setButtonColorVaccName] = useState("");
  const [ButtonColorVaccAvaiability, setButtonColorVaccAvaiability] =
    useState("");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [lengthFilterDetailsList, setlengthFilterDetailsList] = useState(0);
  const [IndiaStateName, setIndiaStateName] = useState("");
  const [IndiaStateId, setIndiaStateId] = useState(0);
  const [DistrictName, setDistrictName] = useState(0);
  async function populateFetchStateData() {
    const response = await ServiceFetchStateData();
    setIndiaState(response);
  }

  async function populateFetchDistrictData() {
    const response = await ServiceFetchDistrictData(1);
    setIndiaDistrict(response.districts);
  }
  useEffect(() => {
    populateFetchStateData();
    populateFetchDistrictData();
  }, []);

  const elements = IndiaState.states;

  // async function handleChange(e) {
  //   const response = await ServiceFetchDistrictData(e.target.value);
  //   setIndiaDistrict(response.districts);
  // }

  async function handleChange(e) {
    console.log(e);
    setIndiaStateName(e.label);
    setIndiaStateId(e.value);
    localStorage.setItem("StateLabel", e.label);
    localStorage.setItem("StateId", e.value);
    const response = await ServiceFetchDistrictData(e.value);
    setIndiaDistrict(response.districts);
  }
  const elementsDistrict = IndiaDistrict;

  // async function handleDistrictChange(e) {
  //   setDistrictID(e.target.value);
  //   //localStorage.setItem("DistrictIdValue", e.target.value);
  // }

  function handleChangeDistrict(e) {
    console.log("e");
    console.log(e);
    setDistrictID(e.value);
    setDistrictName(e.label);
    localStorage.setItem("DistrictLabel", e.label);
    localStorage.setItem("DistrictId", e.value);
  }
  let arrDate = [];
  async function OnClickSearch() {
    //FilterCenterDetails();
    setShowSpinner(true);
    console.log("Onclick Search");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    //const DistrictIdValue = localStorage.getItem("DistrictIdValue");
    //console.log("DistrictIdValue"+DistrictIdValue);
    const response = await ServiceFetchCalenderData(DistrictID, today);
    var centers = response.centers;
    localStorage.setItem("CenterData", JSON.stringify(centers));
    setarrCenterDetails(centers);

    setlengthFilterDetailsList(centers.length);
    for (var i = 0; i < centers.length; i++) {
      for (var j = 0; j < centers[i].sessions.length; j++) {
        arrDate.push(centers[i].sessions[j].date);
      }
    }
    setarrDateCal(Duplicateremove(arrDate));

    var arrCenterDetailsCost = [];
    var arrCenterDetailsAge = [];
    var arrCenterDetailsVaccName = [];
    var arrCenterDetailsCapacity = [];
    for (var i = 0; i < centers.length; i++) {
      arrCenterDetailsCost.push(centers[i].fee_type);
      for (var j = 0; j < centers[i].sessions.length; j++) {
        arrCenterDetailsAge.push(centers[i].sessions[j].min_age_limit);
        arrCenterDetailsVaccName.push(centers[i].sessions[j].vaccine);
        if (centers[i].sessions[j].available_capacity > 0) {
          arrCenterDetailsCapacity.push("Available");
        } else {
          arrCenterDetailsCapacity.push("Booked");
        }
      }
    }
    Duplicateremove(arrCenterDetailsCost);
    Duplicateremove(arrCenterDetailsAge);
    Duplicateremove(arrCenterDetailsVaccName);
    Duplicateremove(arrCenterDetailsCapacity);

    setarrFilterDetailsFee(Duplicateremove(arrCenterDetailsCost));
    setarrFilterDetailsAge(Duplicateremove(arrCenterDetailsAge));
    setarrFilterDetailsVaccName(Duplicateremove(arrCenterDetailsVaccName));
    setarrFilterDetailsVaccAvaiability(
      Duplicateremove(arrCenterDetailsCapacity)
    );
    //setlengthFilterDetailsList(centers.length);
  }

  // console.log("arrCenterDetails");
  //console.log(arrCenterDetails);
  function Duplicateremove(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
  }

  //for filter
  function FilterCenterDetails() {
    var arrCenterDetailsCost = [];
    var arrCenterDetailsAge = [];
    var arrCenterDetailsVaccName = [];
    var arrCenterDetailsCapacity = [];
    for (var i = 0; i < arrCenterDetails.length; i++) {
      arrCenterDetailsCost.push(arrCenterDetails[i].fee_type);
      for (var j = 0; j < arrCenterDetails[i].sessions.length; j++) {
        arrCenterDetailsAge.push(arrCenterDetails[i].sessions[j].min_age_limit);
        arrCenterDetailsVaccName.push(arrCenterDetails[i].sessions[j].vaccine);
        if (arrCenterDetails[i].sessions[j].available_capacity > 0) {
          arrCenterDetailsCapacity.push("Available");
        } else {
          arrCenterDetailsCapacity.push("Booked");
        }
      }
    }
    Duplicateremove(arrCenterDetailsCost);
    Duplicateremove(arrCenterDetailsAge);
    Duplicateremove(arrCenterDetailsVaccName);
    Duplicateremove(arrCenterDetailsCapacity);

    setarrFilterDetailsFee(Duplicateremove(arrCenterDetailsCost));
    setarrFilterDetailsAge(Duplicateremove(arrCenterDetailsAge));
    setarrFilterDetailsVaccName(Duplicateremove(arrCenterDetailsVaccName));
    setarrFilterDetailsVaccAvaiability(
      Duplicateremove(arrCenterDetailsCapacity)
    );
    //console.log("Duplicateremove(arrCenterDetailsCost)");
    //console.log(Duplicateremove(arrCenterDetailsCost));
  }
  useEffect(() => {
    //console.log("insdie use Effect");
    // FilterCenterDetails();
    if (arrCenterDetails.length > 0) {
      setTimeout(() => {
        setShowSpinner(false);
      }, 3000);
      // setShowSpinner(false);
    }

    localStorageCenterValue();
    let StateLabel = localStorage.getItem("StateLabel");
    console.log("StateLabel" + StateLabel);
    setIndiaStateName(StateLabel);

    let StateId = localStorage.getItem("StateId");
    let DistictLabel = localStorage.getItem("DistrictLabel");
    let DistictId = localStorage.getItem("DistrictId");
    setIndiaStateId(StateId);
    setDistrictID(DistictId);
    setDistrictName(DistictLabel);
    console.log(StateId + ","+ DistictLabel + "," +DistictId);

    //  let optionFee=localStorage.getItem("OptionFee");
    //  console.log("optionFee"+optionFee);
    //  if (optionFee != null){
    //   setButtonColor(optionFee);
    //  } 
  });

  function localStorageCenterValue() {
    if (arrCenterDetails.length == 0) {
      const centers = JSON.parse(localStorage.getItem("CenterData"));
      // console.log("CenterDataValue");
      //console.log(centers);
      //console.log("INside effect if");
      if (centers != null) {
        setShowSpinner(true);
        setarrCenterDetails(centers);

        setlengthFilterDetailsList(centers.length);
        for (var i = 0; i < centers.length; i++) {
          for (var j = 0; j < centers[i].sessions.length; j++) {
            arrDate.push(centers[i].sessions[j].date);
          }
        }
        setarrDateCal(Duplicateremove(arrDate));

        var arrCenterDetailsCost = [];
        var arrCenterDetailsAge = [];
        var arrCenterDetailsVaccName = [];
        var arrCenterDetailsCapacity = [];
        for (var i = 0; i < centers.length; i++) {
          arrCenterDetailsCost.push(centers[i].fee_type);
          for (var j = 0; j < centers[i].sessions.length; j++) {
            arrCenterDetailsAge.push(centers[i].sessions[j].min_age_limit);
            arrCenterDetailsVaccName.push(centers[i].sessions[j].vaccine);
            if (centers[i].sessions[j].available_capacity > 0) {
              arrCenterDetailsCapacity.push("Available");
            } else {
              arrCenterDetailsCapacity.push("Booked");
            }
          }
        }
        Duplicateremove(arrCenterDetailsCost);
        Duplicateremove(arrCenterDetailsAge);
        Duplicateremove(arrCenterDetailsVaccName);
        Duplicateremove(arrCenterDetailsCapacity);

        setarrFilterDetailsFee(Duplicateremove(arrCenterDetailsCost));
        setarrFilterDetailsAge(Duplicateremove(arrCenterDetailsAge));
        setarrFilterDetailsVaccName(Duplicateremove(arrCenterDetailsVaccName));
        setarrFilterDetailsVaccAvaiability(
          Duplicateremove(arrCenterDetailsCapacity)
        );
      }
    }
  }
  console.log("arrCenterDetails");
  console.log(arrCenterDetails);
  function OnClickOnFilter(e, option) {
    var tempCenterList = [];
    tempCenterList = arrCenterDetails;
    console.log("Option");
    console.log(option);

    console.log(arrCenterDetails);
    console.log("On click On filter");
    console.log("key: " + e.target.value);

    if (option == "Fee") {
      setButtonColor(e.target.value);
     // localStorage.setItem("OptionFee", e.target.value);
      // console.log("ButtonColor"+ButtonColor);
      //console.log("e.target.value" + e.target.value);
      tempCenterList = tempCenterList.filter(
        (item) => item.fee_type == e.target.value
      );
    }

    if (option == "Availability") {
      let availableTemp;
      setButtonColorVaccAvaiability(e.target.value);
      tempCenterList = tempCenterList.filter((item) => {
        availableTemp = item.sessions.filter((sess) =>
          e.target.value === "Available"
            ? sess.available_capacity > 0
            : sess.available_capacity == 0
        );
        if (availableTemp.length == 0) {
          return false;
        }
        item.session = availableTemp;
        return true;
      });
    }

    if (option == "Availability") {
      setButtonColorVaccAvaiability(e.target.value);
      let availableTemp;
      tempCenterList = tempCenterList.filter((item) => {
        availableTemp = item.sessions.filter((sess) =>
          e.target.value === "Booked"
            ? sess.available_capacity == 0
            : sess.available_capacity > 0
        );
        if (availableTemp.length == 0) {
          return false;
        }
        item.session = availableTemp;
        return true;
      });
    }

    if (option == "Age") {
      setButtonColorAge(e.target.value);
      let availableTemp;
      tempCenterList = tempCenterList.filter((item) => {
        availableTemp = item.sessions.filter(
          (sess) => e.target.value == sess.min_age_limit
          //? sess.min_age_limit === e.target.value
          //: sess.min_age_limit !== e.target.value
        );
        if (availableTemp.length == 0) {
          return false;
        }
        item.session = availableTemp;
        return true;
      });
    }

    if (option == "Vaccine") {
      setButtonColorVaccName(e.target.value);
      let availableTemp;
      tempCenterList = tempCenterList.filter((item) => {
        availableTemp = item.sessions.filter(
          (sess) => e.target.value == sess.vaccine
          //? sess.min_age_limit === e.target.value
          //: sess.min_age_limit !== e.target.value
        );
        if (availableTemp.length == 0) {
          return false;
        }
        item.session = availableTemp;
        return true;
      });
    }

    setarrFilterDetailsList(tempCenterList);
    setarrCenterDetails(tempCenterList);
    setlengthFilterDetailsList(tempCenterList.length);
    localStorage.setItem("CenterData", JSON.stringify(tempCenterList));
  }

  //console.log("arrFilterDetailsList");
  //console.log(arrFilterDetailsList);

  async function OnClickReset() {
    console.log("Onclcik reset clicked");
    setarrFilterDetailsList([]);
    setButtonColor("");
    setButtonColorAge("");
    setButtonColorVaccName("");
    setButtonColorVaccAvaiability("");
    OnClickSearch();
  }

  async function OnclickPrevious() {
    setarrCenterDetails([]);
    setShowSpinner(true);

    var d = new Date();
    var previous = d.setDate(d.getDate() - 6);
    var today = new Date(previous);
    console.log(today.toLocaleDateString());
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log("today" + today);
    const response = await ServiceFetchCalenderData(DistrictID, today);

    var centers = response.centers;
    //localStorage.setItem("CenterData", JSON.stringify(centers));
    console.log(centers);
    setarrCenterDetails(centers);
    for (var i = 0; i < centers.length; i++) {
      for (var j = 0; j < centers[i].sessions.length; j++) {
        arrDate.push(centers[i].sessions[j].date);
      }
    }
    setarrDateCal(Duplicateremove(arrDate));
  }

  async function OnclickNext() {
    setarrCenterDetails([]);
    setShowSpinner(true);
    console.log("Onclick Next");
    console.log(arrDateCal.reverse());
    console.log(arrDateCal[0]);
    var date = arrDateCal[0];
    console.log("DATE" + date);
    var datearray = date.split("-");

    var newdate = datearray[1] + "-" + datearray[0] + "-" + datearray[2];
    console.log("newdate" + newdate);

    var dateObject = new Date(newdate);

    console.log("dateObject");
    console.log(dateObject);
    var nextDate = dateObject.setDate(dateObject.getDate() + 1);
    console.log("nextDate");
    console.log(nextDate);

    var today = new Date(nextDate);
    console.log(today.toLocaleDateString());
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log("today" + today);
    const response = await ServiceFetchCalenderData(DistrictID, today);
    var centers = response.centers;
    //  localStorage.setItem("CenterData", JSON.stringify(centers));
    console.log(centers);
    setarrCenterDetails(centers);
    for (var i = 0; i < centers.length; i++) {
      for (var j = 0; j < centers[i].sessions.length; j++) {
        arrDate.push(centers[i].sessions[j].date);
      }
    }
    setarrDateCal(Duplicateremove(arrDate));
  }

  // if(arrCenterDetails.length > 0){
  //   setShowSpinner(false);
  // }
  console.log("ShowSpinner");
  console.log(ShowSpinner);
  console.log(arrCenterDetails.length);
  return (
    <div
      style={
        {
          //display: "flex",
          //justifyContent: "center",
          // alignItems: "center",
          //flexDirection:'column'
        }
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          src={ImageC}
          style={{ height: "20%", width: "20%", margin: "2%" }}
        ></Image>

        <div
          style={{
            display: "flex",
            marginRight: "30%",
            marginTop: "4%",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Check Available Vaccine Slots
        </div>
      </div>

      <hr
        style={{
          color: "black",
          height: 1,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          margin: "2%",
        }}
      >
        {/* <select
          id="statelist"
          style={{ height: "40%", padding: 10 }}
          onChange={handleChange}
        >
          {elements !== undefined &&
            elements.map((item) => (
              <option value={item.state_id} key={item.state_id}>
                {item.state_name}
              </option>
            ))}
        </select> */}
        {/* <select
          id="districtlist"
          style={{ height: "40%", padding: 10 }}
          onChange={handleDistrictChange}
        >
          {elementsDistrict !== undefined &&
            elementsDistrict.map((item) => (
              <option value={item.district_id} key={item.district_id}>
                {item.district_name}
              </option>
            ))}
        </select> */}
        <div style={{ width: "40%" }}>
          <Select
            value={{ value: IndiaStateId, label: IndiaStateName }}
            onChange={handleChange}
            options={
              elements !== undefined &&
              elements.map((item) => ({
                value: item.state_id,
                label: item.state_name,
              }))
            }
          />
        </div>
       
        <div style={{ width: "40%" }}>
          <Select
            //defaultValue="Options for slect disrict"
            value={{ value: DistrictID, label: DistrictName }}
            onChange={handleChangeDistrict}
            options={
              elementsDistrict !== undefined &&
              elementsDistrict.map((item) => ({
                value: item.district_id,
                label: item.district_name,
              }))
            }
          />
        </div>
        <Button variant="primary" onClick={() => OnClickSearch()}>
          {ConstantsDisplayData.CAPTION_BUTTON_SEARCH}
        </Button>
        {/* <div>IndiaStateName ={IndiaStateName}</div> */}
      </div>
      <hr
        style={{
          color: "black",
          height: 1,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ShowSpinner == true && (
          <Spinner animation="border" variant="primary" role="status" />
        )}
      </div>

      <div style={{ display: "flex", margin: 10 }}>
        {arrFilterDetailsFee.length > 0 ? (
          <div style={{ margin: 10 }}>
            <div style={{ fontSize: 13 }}>Fee</div>
            <ButtonGroup aria-label="Basic example">
              {arrFilterDetailsFee.map((item, key) => (
                <Button
                  key={item}
                  value={item}
                  variant="light"
                  className={ButtonColor == item ? "active" : "inactive"}
                  onClick={(e) => OnClickOnFilter(e, "Fee")}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ) : null}

        {arrFilterDetailsVaccAvaiability.length > 0 ? (
          <div style={{ margin: 10 }}>
            <div style={{ fontSize: 13 }}>Availability</div>
            <ButtonGroup aria-label="Basic example">
              {arrFilterDetailsVaccAvaiability.map((item) => (
                <Button
                  key={item}
                  value={item}
                  variant="light"
                  className={
                    ButtonColorVaccAvaiability == item ? "active" : "inactive"
                  }
                  onClick={(e) => OnClickOnFilter(e, "Availability")}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ) : null}
        {arrFilterDetailsAge.length > 0 ? (
          <div style={{ margin: 10 }}>
            <div style={{ fontSize: 13 }}>Age</div>
            <ButtonGroup aria-label="Basic example">
              {arrFilterDetailsAge.map((item) => (
                <Button
                  key={item}
                  value={item}
                  variant="light"
                  onClick={(e) => OnClickOnFilter(e, "Age")}
                  className={ButtonColorAge == item ? "active" : "inactive"}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ) : null}
        {arrFilterDetailsVaccName.length > 0 ? (
          <div style={{ margin: 10 }}>
            <div style={{ fontSize: 13 }}>Vaccine</div>
            <ButtonGroup aria-label="Basic example">
              {arrFilterDetailsVaccName.map((item) => (
                <Button
                  key={item}
                  value={item}
                  variant="light"
                  onClick={(e) => OnClickOnFilter(e, "Vaccine")}
                  className={
                    ButtonColorVaccName == item ? "active" : "inactive"
                  }
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ) : null}
        {(lengthFilterDetailsList > 0 ||
          arrFilterDetailsVaccName.length > 0) && (
          <div style={{ margin: 30 }}>
            <Button variant="primary" onClick={() => OnClickReset()}>
              Reset
            </Button>
          </div>
        )}
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <div style={{ marginLeft: 15 }}>
          {(lengthFilterDetailsList > 0 ||
            arrFilterDetailsVaccName.length > 0) && (
            <div>Result-{lengthFilterDetailsList}</div>
          )}
        </div>

        <div>
          {lengthFilterDetailsList > 0 && (
            <div>
              <Button
                variant="light"
                style={{ marginRight: 10 }}
                onClick={() => OnclickPrevious()}
              >
                <div style={{ display: "flex" }}>
                  <box-icon name="skip-previous"></box-icon>
                  Previous
                </div>
              </Button>
              <Button variant="light" onClick={() => OnclickNext()}>
                <div style={{ display: "flex" }}>
                  <box-icon name="skip-next"></box-icon>
                  Next
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>

      {arrDateCal.length != 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2%",
            display: "block",
            overflow: "scroll",
            height: 500,
            alignSelf: "center",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{ConstantsDisplayData.CAPTION_CENTER}</th>
                {arrDateCal.map((item, key) => (
                  <th key={key}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody id="tableData">
              {arrFilterDetailsList.length == 0
                ? arrCenterDetails.map((item, key) => (
                    <tr key={key}>
                      <td key={item} style={{ width: "20%" }}>
                        <div style={{ fontWeight: "bold" }}>{item.name}</div>
                        <div style={{ fontSize: 14, color: "gray" }}>
                          {item.address}
                        </div>
                      </td>
                      {arrDateCal.map((item, k) => {
                        {
                          return (
                            <td key={k}>
                              {arrCenterDetails[key].sessions.map(
                                (items, key) => {
                                  if (items.date == item) {
                                    if (items.available_capacity == 0) {
                                      return (
                                        <div key={key}>
                                          <Badge
                                            variant="danger"
                                            style={{ border: "1px solid" }}
                                          >
                                            {
                                              ConstantsDisplayData.CAPTION_BOOKED
                                            }
                                          </Badge>
                                          <div
                                            style={{
                                              fontSize: 10,
                                              color: "darkred",
                                            }}
                                          >
                                            {ConstantsDisplayData.CAPTION_AGE}
                                            {items.min_age_limit}
                                          </div>
                                        </div>
                                      );
                                    } else if (items.available_capacity > 0) {
                                      return (
                                        <div
                                          key={key}
                                          style={{
                                            flexDirection: "column",
                                            height: 50,
                                            width: 100,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "10%",
                                            marginTop: "10%",
                                          }}
                                        >
                                          <Badge
                                            variant="secondary"
                                            style={{
                                              height: 50,
                                              width: 100,
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              color: "black",
                                              backgroundColor: "#FFF",
                                              border: "1px solid",
                                            }}
                                          >
                                            <Badge
                                              // variant="success"
                                              style={{
                                                height: 40,
                                                color: "black",
                                                backgroundColor: "lightgreen",
                                              }}
                                            >
                                              {
                                                ConstantsDisplayData.CAPTION_DOSE_ONE
                                              }
                                              {items.available_capacity_dose1}
                                            </Badge>
                                            {items.available_capacity}

                                            <Badge
                                              //variant="success"
                                              style={{
                                                height: 40,
                                                color: "black",
                                                backgroundColor: "lightgreen",
                                              }}
                                            >
                                              {
                                                ConstantsDisplayData.CAPTION_DOSE_TWO
                                              }
                                              {items.available_capacity_dose2}
                                            </Badge>
                                          </Badge>
                                          <div style={{ fontSize: 10 }}>
                                            {ConstantsDisplayData.CAPTION_AGE}
                                            {items.min_age_limit}
                                          </div>
                                        </div>
                                      );
                                    }
                                  } else {
                                    return (
                                      <Badge
                                        style={{
                                          border: "1px solid",
                                          backgroundColor: "lightgray",
                                        }}
                                      >
                                        {
                                          ConstantsDisplayData.CAPTION_NOTAVAIABLE
                                        }
                                      </Badge>
                                    );
                                  }
                                }
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))
                : arrFilterDetailsList.map((item, key) => (
                    <tr key={key}>
                      <td key={item} style={{ width: "20%" }}>
                        <div style={{ fontWeight: "bold" }}>{item.name}</div>
                        <div style={{ fontSize: 14, color: "gray" }}>
                          {item.address}
                        </div>
                      </td>
                      {arrDateCal.map((item, k) => {
                        {
                          return (
                            <td key={k}>
                              {arrFilterDetailsList[key].sessions.map(
                                (items, key) => {
                                  if (items.date == item) {
                                    if (items.available_capacity == 0) {
                                      return (
                                        <div key={key}>
                                          <Badge
                                            variant="danger"
                                            style={{ border: "1px solid" }}
                                          >
                                            {
                                              ConstantsDisplayData.CAPTION_BOOKED
                                            }
                                          </Badge>
                                          <div
                                            style={{
                                              fontSize: 10,
                                              color: "darkred",
                                            }}
                                          >
                                            {ConstantsDisplayData.CAPTION_AGE}
                                            {items.min_age_limit}
                                          </div>
                                        </div>
                                      );
                                    } else if (items.available_capacity > 0) {
                                      return (
                                        <div
                                          key={key}
                                          style={{
                                            flexDirection: "column",
                                            height: 50,
                                            width: 100,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "10%",
                                            marginTop: "10%",
                                          }}
                                        >
                                          <Badge
                                            variant="secondary"
                                            style={{
                                              height: 50,
                                              width: 100,
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              color: "black",
                                              backgroundColor: "#FFF",
                                              border: "1px solid",
                                            }}
                                          >
                                            <Badge
                                              // variant="success"
                                              style={{
                                                height: 40,
                                                backgroundColor: "lightgreen",
                                              }}
                                            >
                                              {
                                                ConstantsDisplayData.CAPTION_DOSE_ONE
                                              }
                                              {items.available_capacity_dose1}
                                            </Badge>
                                            {items.available_capacity}

                                            <Badge
                                              // variant="success"
                                              style={{
                                                height: 40,
                                                backgroundColor: "lightgreen",
                                              }}
                                            >
                                              {
                                                ConstantsDisplayData.CAPTION_DOSE_TWO
                                              }
                                              {items.available_capacity_dose2}
                                            </Badge>
                                          </Badge>
                                          <div style={{ fontSize: 10 }}>
                                            {ConstantsDisplayData.CAPTION_AGE}
                                            {items.min_age_limit}
                                          </div>
                                        </div>
                                      );
                                    }
                                  } else {
                                    return (
                                      <Badge
                                        style={{
                                          border: "1px solid",
                                          backgroundColor: "lightgray",
                                        }}
                                      >
                                        {
                                          ConstantsDisplayData.CAPTION_NOTAVAIABLE
                                        }
                                      </Badge>
                                    );
                                  }
                                }
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
            </tbody>
          </Table>
          {arrFilterDetailsList.length == 0 && arrCenterDetails.length == 0 && (
            <div
              style={{
                marginLeft: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {ShowSpinner == true ? (
                <div>Data is Loading...</div>
              ) : (
                <div>No data Available</div>
              )}
            </div>
          )}
        </div>
      ) : null}
      {/* <div>{arrDateCal.length == 0 && <div>data</div>}</div> */}
    </div>
  );
};

export default DisplayData;
