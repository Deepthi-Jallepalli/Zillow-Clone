import React from 'react';
import ListingsGrid from './Grids/ListingsGrid';
import qs from 'qs';

const Rent = (props) => {
  let filterParams = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  return (
    <ListingsGrid type = "rent" filterParams ={filterParams}/>
  );
}

export default Rent;