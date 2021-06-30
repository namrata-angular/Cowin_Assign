import React from "react";

import axios from "axios";

async function FetchStateData() {
  let result = await axios.get(
    "https://cdn-api.co-vin.in/api/v2/admin/location/states"
  );
  
  return result.data;
}

export default FetchStateData;
