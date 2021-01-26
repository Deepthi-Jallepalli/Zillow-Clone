import React, { useState, useEffect } from "react";
import { Button, Alert, Form, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";
import { rooturl } from "../../../config/config";
import "./GridModal.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function GridModal({ home_id, hideForm }) {
  const [homes, setHomes] = useState([]);
  const [scheduleError, showScheduleError] = useState("");
  const [loading, setLoading] = React.useState(true);
  Axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  const scheduleApiEndpoint = rooturl + "/listings/" + home_id + "/schedule/";
  console.log("API Endpoint: " + scheduleApiEndpoint);
  const handleCreateSchedule = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = {
      schedule_visits_date: form.schedule_visits_date.value,
      schedule_visits_time: form.schedule_visits_time.value,
    };
    console.log(formData);
    Axios.post(scheduleApiEndpoint, formData, { validateStatus: false }).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          showScheduleError(
            <Alert variant="success">Your viewing has been scheduled</Alert>
          );
        } else {
          let errors = Object.values(
            response.data || { error: ["Something went wrong"] }
          );
          showScheduleError(
            errors.map((error) => {
              return <Alert variant="danger">{error}</Alert>;
            })
          );
        }
      }
    );
  };
  const listingApiEndpoint = rooturl + "/listings/" + home_id;
  useEffect(() => {
    Axios.get(listingApiEndpoint, { validateStatus: false }).then(
      (response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data) {
            setHomes(response.data);
            setLoading(false);
          }
        }
      }
    );
  }, []);

  return loading ? (
    <Spinner animation="border" />
  ) : (
    <div className="grid-modal">
      <div className="images">
        <ImageGallery
          items={homes["images"].map((img) => {
            return {
              original: img.url,
              thumbnail: img.url,
            };
          })}
          showFullscreenButton={false}
          showPlayButton={false}
        />
        {/* <img src={homes["images"] && homes["images"][0].url} alt="house" />
        <br />
        <img src={homes["images"] && homes["images"][1].url} alt="house" /> */}
      </div>
      <div className="home-details">
        <h4>Price: </h4>
        <p>
          <strong>${homes["price"]}</strong>
        </p>
        <h4>Address: </h4>
        <p>
          {" "}
          <strong>
            {homes["street_address"] +
              ", " +
              homes["city"] +
              ", " +
              homes["state"] +
              " - " +
              homes["zip_code"]}
          </strong>
        </p>
        <h4>Facts and features</h4>
        <div>
          <ul>
            <li>Status: {homes["home_status"]}</li>
            {homes["home_status"] === "available" ? (
              <div>
                <li>Available Date: {homes["available_date"]}</li>
              </div>
            ) : (
              <div />
            )}
            <li>Type: {homes["home_type"]}</li>
            <li>Description: {homes["description"]}</li>
            <li>Bedrooms: {homes["bedrooms"]}</li>
            <li>Bathrooms: {homes["bathroom"]}</li>
            <li>Year Built: {homes["year_built"]}</li>
            <li>Home Area: {homes["sqft_area"]} sqft</li>
            <li>Flooring Type: {homes["floor_type"]}</li>
            <li>Heater: {homes["heater"]}</li>
            <li>Kitchen: {homes["kitchen"]}</li>
            <li>Laundry: {homes["laundry"]}</li>
            <li>Parking Type: {homes["parking_space_type"]}</li>
            {homes["open_house"].map((open_house) => {
              return (
                <div>
                  <strong>Open House Schedule</strong>
                  <li>Date : {open_house.open_house_date}</li>
                  <li> Start Time : {open_house.open_house_start_time}</li>
                  <li> End Time : {open_house.open_house_end_time}</li>
                </div>
              );
            })}
            {homes["home_type"] === "apartments" ? (
              <div>
                <li>Lease Term: {homes["lease_term"]}</li>
                <li>Security Deposit: {homes["security_deposit"]}</li>
              </div>
            ) : (
              <div />
            )}
          </ul>
        </div>
      </div>
      {localStorage.getItem("token") && !hideForm ? (
        <>
          <div className="listings-forms">
            <h4>Schedule a visit</h4>
            <div className="schedule-form">
              <Form onSubmit={handleCreateSchedule}>
                {scheduleError}
                <Form.Group controlId="formBasicDate">
                  <Form.Control type="date" name="schedule_visits_date" />
                </Form.Group>
                <Form.Group controlId="formBasicTime">
                  <Form.Control type="time" name="schedule_visits_time" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Schedule Visit
                </Button>
              </Form>
              <br />
              <br />
            </div>
            <h4>Submit an application</h4>
            <div>
              <Link to={`/new-application/${home_id}/${homes.listing_type}`}>
                <Button variant="success" block>
                  Application
                </Button>
              </Link>
            </div>
            <br/><br/>
            <h4>Listing Agent</h4>
            <div>{homes["listed_by"]}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default GridModal;
