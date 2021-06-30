import React from "react";

import axios from "axios";

async function FetchCalenderData(IDDistrict, date) {
  console.log("IDDistrict");
  console.log(IDDistrict);
  console.log(date);

  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // var yyyy = today.getFullYear();

 // today = dd + "/" + mm + "/" + yyyy;
  let result = await axios.get(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${IDDistrict}&date=${date}`
  );
  return result.data;
}

export default FetchCalenderData;
