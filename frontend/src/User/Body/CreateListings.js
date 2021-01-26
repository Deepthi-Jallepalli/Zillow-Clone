import React, { useState, Fragment } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import Modal from "react-modal";
import Axios from "axios";
import { rooturl } from "../../config/config";
import "./CreateListings.css";
import ListingsForm from "./ListingsForm";

function CreateListings() {
  const [createListingsError, showCreateListingsError] = useState("");
  const [inputFields, setInputFields] = useState([
    { open_house_date: null, open_house_start_time: null, open_house_end_time: null },
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  Axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      open_house_date: "",
      open_house_start_time: "",
      open_house_end_time: "",
    });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    console.log("index: " + index);
    if (index !== 0) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    console.log(event.target.name);
    if (event.target.name === "open_house_date") {
      values[index].open_house_date = event.target.value;
    } else if (event.target.name === "open_house_start_time") {
      values[index].open_house_start_time = event.target.value;
    } else {
      values[index].open_house_end_time = event.target.value;
    }
    setInputFields(values);
    console.log(values);
  };

  const apiEndpoint = rooturl + "/listings/";

  const handleCreateListings = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    var lease = null;
    var deposit = null;
    if (form.lease_term.value !== "") {
      lease = form.lease_term.value;
    }
    if (form.security_deposit.value !== "") {
      deposit = form.security_deposit.value;
    }
    const formData = new FormData();
    formData.set("home_status", form.home_status.value);
    formData.set("country", "United States");
    formData.set("parking_space_type", form.parking_space_type.value);
    formData.append("lease_term", lease);
    formData.append("security_deposit", deposit);
    formData.append("heater", form.heating.value);
    formData.append("kitchen", form.kitchen.value);
    formData.append("laundry", form.laundry.value);
    formData.append("air_conditioner", form.air_conditioner.value);
    formData.append("floor_type", form.flooring.value);
    // formData.append("images", [
    //   "https://photos.zillowstatic.com/fp/06a267a26fc021cac6c4204e5b5cabd4-cc_ft_768.jpg",
    //   "https://photos.zillowstatic.com/fp/f8d95bd5320fe0e7afd6959cef180660-cc_ft_768.jpg",
    // ]);
    formData.append("open_house", JSON.stringify(inputFields));
    formData.append("home_type", form.house_type.value);
    formData.append("zip_code", form.zip_code.value);
    formData.append("listing_type", form.listing_type.value);
    formData.append("street_address", form.street_address.value);
    formData.append("city", form.city.value);
    formData.append("state", form.state.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    formData.append("bedrooms", form.bedrooms.value);
    formData.append("bathroom", form.bathroom.value);
    formData.append("sqft_area", form.sqft_area.value);
    formData.append("year_built", form.year_built.value);
    formData.set("available_date", form.available_date.value);

    for (var file of form.elements.image.files) {
      formData.append("s3_image_file_data", file);
    }
    Axios.post(apiEndpoint, formData, {
      validateStatus: false,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        showCreateListingsError(
          <Alert variant="success">
            Your listing has been posted successfully
          </Alert>
        );
        toggleModal();
      } else {
        let errors = Object.values(
          response.data || { error: ["Something went wrong"] }
        );
        showCreateListingsError(
          errors.map((error) => {
            return <Alert variant="danger">{error}</Alert>;
          })
        );
      }
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <h2>Create a listing</h2>
      <div className="create-listings">
        <div className="create-listings-form">
          <ListingsForm handleCreateListings={handleCreateListings} />
        </div>
        <div className="open-house">
          <p>
            <strong>Open House Details</strong>
          </p>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <Form.Group controlId="formBasicDate">
                <Form.Label>Open House Date(If Applicable)</Form.Label>
                <Form.Control
                  type="date"
                  name="open_house_date"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicTime">
                <Form.Label>Open House Start Time(If Applicable)</Form.Label>
                <Form.Control
                  type="time"
                  name="open_house_start_time"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicTime">
                <Form.Label>Open House End Time(If Applicable)</Form.Label>
                <Form.Control
                  type="time"
                  name="open_house_end_time"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </Form.Group>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => handleAddFields()}
              >
                {" "}
                Add{" "}
              </button>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => handleRemoveFields(index)}
              >
                {" "}
                Remove{" "}
              </button>
            </Fragment>
          ))}
        </div>
        <Modal
          style={customStyles}
          isOpen={isOpen}
          overlayClassName="myoverlay"
          onRequestClose={toggleModal}
          ariaHideApp={false}
          contentLabel="My dialog"
        >
          <div className="modal-listing">
            <Alert>{createListingsError}</Alert>
            <br />
            <Button
              className="listing-button"
              variant="primary"
              href="/view-listings"
            >
              View Listings
            </Button>
            <br />
            <br />
            <Button
              className="listing-button"
              variant="primary"
              href="/create-listings"
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CreateListings;
