import React from "react";
import Grids from "./Grids";
import algoliasearch from "algoliasearch/lite";
import { appid, rooturl, searchapikey, algoliaindex } from "../../../config/config";
import "./ListingsGrid.css";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  MenuSelect,
  Configure,
  RangeInput,
} from "react-instantsearch-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Axios from "axios";

const ListingsGrid = (props) => {
  let { type, filterParams } = props;
  const searchClient = algoliasearch(appid, searchapikey);
  let [filterState, setFilterState] = React.useState({});
  let setSearchStateChange = (searchState) => {
    setFilterState(JSON.parse(JSON.stringify(searchState)));
  };
  let [saveSearchMsg, setSaveSearchMsg] = React.useState("");
  let handleSaveSearch = (e) => {
    e.preventDefault();
    console.log(filterState);
    let formData = {
      query_params: filterState,
      name: e.target.name.value,
    };
    Axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    Axios.post(`${rooturl}/favorites/search/`, formData, {
      validateStatus: false,
    }).then((response) => {
      if (response.status === 201) {
        e.target.reset();
        setSaveSearchMsg(<Alert variant="success">Search Saved!</Alert>);
      }
    });
  };
  const [isOpen, setIsOpen] = React.useState(false);
  let toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [showFilter, setShowFilter] = React.useState(false);
  let toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <div className="">
      <InstantSearch
        indexName = {algoliaindex}
        searchClient={searchClient}
        onSearchStateChange={setSearchStateChange}
      >
        <Configure hitsPerPage={9} filters={`listing_type:${type}`} />
        <Container>
          <Card>
            <Card.Body>
              <div>
                <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                  <span >
                    <SearchBox defaultRefinement={filterParams.query}/>
                  </span>
                </div>
                <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                  <span>Bedrooms&nbsp;</span>
                  <span>
                    <MenuSelect
                      attribute="bedrooms"
                      defaultRefinement={
                        filterParams.menu && filterParams.menu.bedrooms
                      }
                    />
                  </span>
                </div>
                <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                  <span>Bathrooms&nbsp;</span>
                  <span>
                    <MenuSelect
                      attribute="bathroom"
                      defaultRefinement={
                        filterParams.menu && filterParams.menu.bathroom
                      }
                    />
                  </span>
                </div>
                <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                  <span>Home Type&nbsp;</span>
                  <span>
                    <MenuSelect
                      attribute="home_type"
                      defaultRefinement={
                        filterParams.menu && filterParams.menu.home_type
                      }
                    />
                  </span>
                </div>
                <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                  <span>Price&nbsp;</span>
                  <span>
                    <RangeInput
                      attribute={"price"}
                      defaultRefinement={{
                        min:
                          filterParams.range &&
                          filterParams.range.price &&
                          parseInt(filterParams.range.price.min),
                        max:
                          filterParams.range &&
                          filterParams.range.price &&
                          parseInt(filterParams.range.price.max),
                      }}
                    />
                  </span>
                </div>
                <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                  <span>Area&nbsp;</span>
                  <span>
                    <RangeInput
                      attribute={"sqft_area"}
                      defaultRefinement={{
                        min:
                          filterParams.range &&
                          filterParams.range.sqft_area &&
                          filterParams.range.sqft_area.min,
                        max:
                          filterParams.range &&
                          filterParams.range.sqft_area &&
                          filterParams.range.sqft_area.max,
                      }}
                      min={
                        filterParams.range &&
                        filterParams.range.sqft_area &&
                        filterParams.range.sqft_area.min
                      }
                      max={
                        filterParams.range &&
                        filterParams.range.sqft_area &&
                        filterParams.range.sqft_area.max
                      }
                    />
                  </span>
                </div>
              </div>
              <div>
                <Collapse in={showFilter}>
                  <div id="example-collapse-text">
                    <div className="dib br3 pa3 ma3 bw2" lg="4" md="6" sm="12">
                      <span>Flooring&nbsp;</span>
                      <span>
                        <MenuSelect
                          attribute="floor_type"
                          defaultRefinement={
                            filterParams.menu && filterParams.menu.floor_type
                          }
                        />
                      </span>
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>Home Status&nbsp;</span>
                      <MenuSelect
                        attribute="home_status"
                        defaultRefinement={
                          filterParams.menu &&
                          filterParams.menu.home_status
                        }
                      />
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>Parking&nbsp;</span>
                      <MenuSelect
                        attribute="parking_space_type"
                        defaultRefinement={
                          filterParams.menu &&
                          filterParams.menu.parking_space_type
                        }
                      />
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>City&nbsp;</span>
                      <MenuSelect
                        attribute="city"
                        defaultRefinement={
                          filterParams.menu && filterParams.menu.city
                        }
                      />
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>State&nbsp;</span>
                      <MenuSelect
                        attribute="state"
                        defaultRefinement={
                          filterParams.menu && filterParams.menu.state
                        }
                      />
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>Year Built&nbsp;</span>
                      <MenuSelect
                        attribute="year_built"
                        defaultRefinement={
                          filterParams.menu &&
                          filterParams.menu.year_built
                        }
                      />
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>Kitchen&nbsp;</span>
                      <MenuSelect
                        attribute="kitchen"
                        defaultRefinement={
                          filterParams.menu && filterParams.menu.kitchen
                        }
                      />
                    </div>
                    <div className="dib br3 pa3 ma3 bw2">
                      <span>Laundry&nbsp;</span>
                      <MenuSelect
                        attribute="laundry"
                        defaultRefinement={
                          filterParams.menu && filterParams.menu.laundry
                        }
                      />
                    </div>
                  </div>
                </Collapse>
              </div>
              <br />
              <Row>
                <Col>
                  <Modal
                    show={isOpen}
                    onHide={toggleModal}
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <Modal.Header closeButton>
                      <h4>Enter your filter name</h4>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={(e) => handleSaveSearch(e)}>
                        {saveSearchMsg}
                        <Form.Group>
                          <Form.Control
                            inline
                            type="text"
                            name="name"
                            placeholder="Please enter the filter name"
                            required
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Save Search
                        </Button>{" "}
                        <Button
                          style={{ float: "right" }}
                          variant="primary"
                          onClick={toggleModal}
                        >
                          Close
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Button
                    onClick={toggleShowFilter}
                    variant="primary"
                    aria-controls="example-collapse-text"
                    aria-expanded={showFilter}
                  >
                    More filters
                  </Button>{" "}
                  {localStorage.getItem('token') && <Button onClick={toggleModal} variant="primary">Save Search</Button>}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <Hits hitComponent={Grids} />
        <Pagination />
      </InstantSearch>
    </div>
  );
};

export default ListingsGrid;
