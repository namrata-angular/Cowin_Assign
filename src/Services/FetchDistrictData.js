import React from "react";

import axios from "axios";

async function FetchDistrictData(IDState) {
    console.log("IDState");
    console.log(IDState);
  let result = await axios.get(
    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${IDState}`
  );
  
  return result.data;
}

export default FetchDistrictData;
