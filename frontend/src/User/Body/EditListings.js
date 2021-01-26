import React, { useState, useEffect} from "react";
import {Alert, Button } from "react-bootstrap";
import Modal from "react-modal";
import Axios from "axios";
import { rooturl } from "../../config/config";
import "./CreateListings.css";
import ListingsForm from "./ListingsForm";

function EditListings(props) {
  const [home, setHome] = useState(null);
  const [createListingsError, showCreateListingsError] = useState("");
  const listing_id = props.match.params.id;
  const [isOpen, setIsOpen] = React.useState(false);
  Axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
  const listingApiEndpoint = rooturl + "/listings/" + listing_id;
  useEffect(() => {
    Axios.get(listingApiEndpoint, { validateStatus: false }).then(
      (response) => {
        if (response.status === 200) {
          if (response.data) {
            setHome(response.data);
          }
        }
      }
    );
  }, []);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  if(home && home['id']) {
    var id = home['id'];
  }
  const apiEndpoint = rooturl + "/listings/" + id + "/";

  const handleCreateListings = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    var lease = null;
    var deposit = null;
    if (form.lease_term.value !== "") {
      lease = form.lease_term.value;
    }
    if (form.security_deposit.value !== "") {
      deposit = form.lease_term.value;
    }
    const formData = new FormData();
    formData.append('home_status',form.home_status.value);
    formData.append('country',"United States");
    formData.append('parking_space_type',form.parking_space_type.value);
    formData.append('lease_term',lease);
    formData.append('security_deposit',deposit);
    formData.append('heater',form.heating.value);
    formData.append('kitchen',form.kitchen.value);
    formData.append('laundry',form.laundry.value);
    formData.append('air_conditioner',form.air_conditioner.value);
    formData.append('floor_type',form.flooring.value);
    formData.append('images', "https://photos.zillowstatic.com/fp/06a267a26fc021cac6c4204e5b5cabd4-cc_ft_768.jpg");
    formData.append('images', "https://photos.zillowstatic.com/fp/f8d95bd5320fe0e7afd6959cef180660-cc_ft_768.jpg");
    formData.append('home_type',form.house_type.value);
    formData.append('zip_code',form.zip_code.value);
    formData.append('listing_type',form.listing_type.value);
    formData.append('street_address',form.street_address.value);
    formData.append('city',form.city.value);
    formData.append('state',form.state.value);
    formData.append('description',form.description.value);
    formData.append('price',form.price.value);
    formData.append('bedrooms',form.bedrooms.value);
    formData.append('bathroom',form.bathroom.value);
    formData.append('sqft_area',form.sqft_area.value);
    formData.append('year_built',form.year_built.value);
    formData.append('available_date',form.available_date.value);
    formData.append('s3_image_file_data', form.image.files[0]);
    console.log(formData);

    Axios.put(apiEndpoint, formData, { validateStatus: false, 
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          showCreateListingsError(
            <Alert variant="success">
              Your listing has been updated successfully
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
      }
    );
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
    home &&
    <div>
      <h2>Edit listing</h2>
      <div className="create-listings">
        <div className="create-listings-form">
          <ListingsForm handleCreateListings={handleCreateListings} homes={home} />
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

export default EditListings;
