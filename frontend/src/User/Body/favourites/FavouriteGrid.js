import React from 'react';
import { ListGroup, ListGroupItem, Card, Button} from 'react-bootstrap';
import Modal from "react-modal";
import GridModal from './../Grids/GridModal'
import './../Grids/Grids.css';
import PropTypes from 'prop-types';
import { rooturl } from '../../../config/config';
import Axios from 'axios';

const FavouriteGrid = (props) => {
    let house  = props.listing;
    const [isOpen, setIsOpen] = React.useState(false);
    const [removeFavorite,setRemoveFavourite] = React.useState(false);
    let removeFavourite = () => {
        let formData = {
            'listing_id': parseInt(house['id']),
        }
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.delete(`${rooturl}/favorites/listing/${props.id}/`, formData,{ validateStatus: false })
        .then((response) => {
            if (response.status === 200 || response.status === 204) {
              props.setRefreshList(!props.refreshList);
            }
        });
    };
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    if(removeFavorite){
      return null;
    }
    return (
        <div key = {house.id} className ='bg-light-gray dib br3 pa3 ma2 bw2 shadow-5'>
            <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={house['images'] && house['images'][1] && house['images'][1]['url']} />
                <Button onClick={removeFavourite} variant="outline-danger" size="sm">Remove from Favorite</Button>
                <Card.Body>
                    <Card.Title style={{height: '2rem'}}>{house['street_address'] + ', ' + house['city'] + ', ' + house['state'] + ' - ' + house['zip_code']}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{house['price']}</ListGroupItem>
                    <ListGroupItem>{house['bedrooms'] + 'bd | ' + house['bathroom'] +'ba | ' + house['sqft_area'] + ' sqft'}</ListGroupItem>
                    <ListGroupItem>{house['home_status']}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button onClick={toggleModal} variant="primary">View Home</Button>
                </Card.Body>
            </Card>
            <Modal isOpen={isOpen} overlayClassName="myoverlay" onRequestClose={toggleModal} ariaHideApp={false} contentLabel="My dialog">
                <GridModal house_info = {house} home_id = {house['objectID']}/>
                <br/>
                <Button variant="primary" onClick={toggleModal}>Close</Button>
            </Modal>
        </div>
    );
}

FavouriteGrid.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default FavouriteGrid;
