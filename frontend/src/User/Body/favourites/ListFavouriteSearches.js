import Axios from 'axios';
import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { rooturl } from '../../../config/config';
import qs from 'qs';

function ListFavouriteSearches(props) {
  let [favourites, setFavourites] = React.useState([]);
  let [refreshList, setRefreshList] = React.useState(false);
  let removeFilter = (id) => {
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.delete(`${rooturl}/favorites/search/${id}/`,{ validateStatus: false })
    .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setRefreshList(!refreshList);
        }
    });
  };

  let linkToSearch = (query_params) =>{
    console.log(query_params);
    let type = query_params.configure && query_params.configure.filters.split(':')[1];
    type = type === 'rent' ? 'rent' : 'buy';
    return `${type}?${qs.stringify(query_params)}`;
  }

  React.useEffect( () =>{
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.get(`${rooturl}/favorites/search/`,{ validateStatus: false })
    .then((response) => {
        if (response.status === 200 && response.data) {
          setFavourites(response.data);
        }
      });
  },[refreshList]);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Filter Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {favourites.length ? favourites.map(fav => {
            return <tr><td><Link to={linkToSearch(fav.query_params)}>{fav.name}</Link></td><td><Button variant='primary' onClick={() => removeFilter(fav.id)}>Delete</Button></td></tr>
          }) : <tr><td colSpan="2">Nothing Marked as Favourites!</td></tr>}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListFavouriteSearches;