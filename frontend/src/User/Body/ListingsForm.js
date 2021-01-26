import React from "react";
import { Form, Button } from "react-bootstrap";
import "./ListingsForm.css";

function ListingsForm({ handleCreateListings, homes }) {
  return (
    <div>
      <Form className="listings-form" onSubmit={handleCreateListings}>
        <div className="listings-form-1">
          <Form.Group controlId="ListingType">
            <Form.Label>Listing Type</Form.Label>
            <Form.Control 
              as="select"
              name="listing_type"
              defaultValue= {(homes === undefined) ? console.log("test"): "" + homes['listing_type']}>
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="HouseType" className="form-1">
            <Form.Label>House Type</Form.Label>
            <Form.Control 
              as="select"
              name="house_type"
              defaultValue = {(homes === undefined) ? "": homes['home_type']}>
              <option value="houses">Houses</option>
              <option value="apartments">Apartments</option>
              <option value="condos">Condos</option>
              <option value="multi-family">Multi-Family</option>
              <option value="townhomes">Town Homes</option>
              <option value="single-family-home">Single Family Homes</option>
              <option value="single-family-detached">
                Single Family Detached Homes
              </option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="HouseStatus" className="form-1">
            <Form.Label>House Status</Form.Label>
            <Form.Control 
              as="select"
              name="home_status"
              defaultValue = {(homes === undefined) ? "": homes['home_status']}>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="form-1">
            <Form.Label>Image Upload</Form.Label>
            <Form.File name="image" id="formcheck-api-regular" multiple />
          </Form.Group>
          <Form.Group controlId="formBasicAddress" className="form-1">
            <Form.Label>Property Address</Form.Label>
            <Form.Control
              type="text"
              name="street_address"
              defaultValue = {(homes === undefined) ? "": homes['street_address']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicCity" className="form-1">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              name="city" 
              defaultValue = {(homes === undefined) ? "" : homes['city']}
              required />
          </Form.Group>
          <Form.Group controlId="formBasicState" className="form-1">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              defaultValue = {(homes === undefined) ? "" : homes['state']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicZipCode" className="form-1">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              name="zip_code"
              defaultValue = {(homes === undefined) ? "" : homes['zip_code']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription" className="form-1">
            <Form.Label>Property Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              defaultValue = {(homes === undefined) ? "" : homes['description']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice" className="form-1">
            <Form.Label>Lising Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              defaultValue = {(homes === undefined) ? "" : homes['price']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicYear" className="form-1">
            <Form.Label>Year Built</Form.Label>
            <Form.Control
              type="number"
              name="year_built"
              defaultValue = {(homes === undefined) ? "" : homes['year_built']}
              required
            />
          </Form.Group>
        </div>
        <div className="listings-form-2">
          <Form.Group controlId="formBasicBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedrooms"
              defaultValue = {(homes === undefined) ? "" : homes['bedrooms']}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicBathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              name="bathroom"
              defaultValue = {(homes === undefined) ? "" : homes['bathroom']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Label>Lising Area</Form.Label>
            <Form.Control
              type="number"
              name="sqft_area"
              defaultValue = {(homes === undefined) ? "" : homes['sqft_area']}
              required
            />
          </Form.Group>
          <Form.Group controlId="FlooringType">
            <Form.Label>Flooring Type</Form.Label>
            <Form.Control 
              as="select" 
              name="flooring"
              defaultValue = {(homes === undefined) ? "": homes['floor_type']}>
              <option value="carpet">Carpet</option>
              <option value="hardwood">Hardwood</option>
              <option value="laminate">Laminate</option>
              <option value="concrete">Concrete</option>
              <option value="tile">Tile</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="KitchenType">
            <Form.Label>Kitchen</Form.Label>
            <Form.Control 
              as="select" 
              name="kitchen"
              defaultValue = {(homes === undefined) ? "": homes['kitchen']}>
              <option value="granite">Granite</option>
              <option value="quartz">Quartz</option>
              <option value="open-kitchen">Open Kitchen</option>
              <option value="closed-kichen">Closed Kitchen</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ParkingType">
            <Form.Label>Parking Space Type</Form.Label>
            <Form.Control 
              as="select" 
              name="parking_space_type"
              defaultValue = {(homes === undefined) ? "": homes['parking_space_type']}>
              <option value="garage-attached">Attached Garage</option>
              <option value="garage-detached">Detached Garage</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="on-street">Street</option>
              <option value="carport">Carport</option>
              <option value="none">None</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="HeatingType">
            <Form.Label>Air Conditioning</Form.Label>
            <Form.Control 
              as="select"
              name="air_conditioner"
              defaultValue = {(homes === undefined) ? "": homes['air_conditioner']}>
              <option value="true">Central AC</option>
              <option value="false">No AC</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="HeatingType">
            <Form.Label>Heating</Form.Label>
            <Form.Control 
              as="select"
              name="heating"
              defaultValue = {(homes === undefined) ? "": homes['heater']}>
              <option value="centralized">Centralized</option>
              <option value="gas">Gas</option>
              <option value="none">None</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="LaundryType">
            <Form.Label>Laundry</Form.Label>
            <Form.Control 
              as="select" 
              name="laundry"
              defaultValue = {(homes === undefined) ? "": homes['laundry']}>
              <option value="washer-dryer">Washer and Dryer</option>
              <option value="washer-only">Washer Only</option>
              <option value="none">None</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicDate">
            <Form.Label>Available Date</Form.Label>
            <Form.Control 
              type="date"
              name="available_date"
              defaultValue = {(homes === undefined) ? "": homes['available_date']}
              required />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Label>Lease Term (If Applicable)</Form.Label>
            <Form.Control
              type="text"
              name="lease_term"
              defaultValue = {(homes === undefined) ? "" : homes['lease_term']}
            />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Label>Security Deposit (If Applicable)</Form.Label>
            <Form.Control
              type="text"
              name="security_deposit"
              defaultValue = {(homes === undefined) ? "" : homes['security_deposit']}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" block>
            {" "}
            Submit{" "}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ListingsForm;
