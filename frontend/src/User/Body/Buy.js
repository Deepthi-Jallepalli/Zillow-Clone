import React from 'react';
import ListingsGrid from './Grids/ListingsGrid';
import qs from 'qs';

const Buy = (props) => {
  let filterParams = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  return (
    <ListingsGrid type = "sale" filterParams ={filterParams}/>
  );
}

export default Buy;