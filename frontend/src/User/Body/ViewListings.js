import React, { useState, useEffect } from "react";
import { rooturl } from "../../config/config";
import UserListingGrid from "./Grids/UserListingGrid";
import "./ViewListings.css";
import Axios from "axios";

function ViewListings(props) {
  const [homes, setHomes] = useState([]);
  let [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    Axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    Axios.get(`${rooturl}/listings/`, { validateStatus: false }).then(
      (response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data) {
            setHomes(response.data);
          }
        }
      }
    );
  }, [refreshList]);
  return (
    <div>
      <UserListingGrid
        house={homes}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      ></UserListingGrid>
    </div>
  );
}

export default ViewListings;
