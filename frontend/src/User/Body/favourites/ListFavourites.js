import Axios from 'axios';
import React from 'react';
import { rooturl } from '../../../config/config';
import FavouriteGrid from './FavouriteGrid';

function ListFavourites(props) {

  let [favourites, setFavourites] = React.useState([]);
  let [refreshList, setRefreshList] = React.useState(false);

  React.useEffect( () =>{
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.get(`${rooturl}/favorites/listing/`,{ validateStatus: false })
    .then((response) => {
        if (response.status === 200 && response.data) {
          setFavourites(response.data);
        }
      });
  },[refreshList]);

  return (
    <div>
      {favourites.length ? favourites.map(fav => {
        return <FavouriteGrid key={fav.id} className="home-info" refreshList={refreshList} setRefreshList={setRefreshList} id={fav.id} listing={fav.listing}/>
      }) : <h4>Nothing Marked as Favourites!</h4>}
    </div>
  );
}

export default ListFavourites;