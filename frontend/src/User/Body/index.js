import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Buy from './Buy';
import Home from './Home';
import Rent from './Rent';
import Sell from './Sell';
import SignIn from './SignIn';
import SignOut from './SignOut';
import CreateListings from './CreateListings';
import ViewListings from './ViewListings';
import EditListings from './EditListings';
import ListFavourites from './favourites/ListFavourites';
import ListFavouriteSearches from './favourites/ListFavouriteSearches';
import NewApplication from './applications/NewApplication';
import MyApplications from './applications/MyApplications';
import ListingApplications from './applications/ListingApplications';
import MyProfile from './MyProfile';

function Body(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/rent" component={Rent} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-out" component={SignOut} />
      <Route exact path="/create-listings" component={CreateListings} />
      <Route exact path="/view-listings" component={ViewListings} />
      <Route exact path="/edit-listings/:id" component={EditListings} />
      <Route exact path="/favourite-homes" component={ListFavourites} />
      <Route exact path="/favourite-searches" component={ListFavouriteSearches} />
      <Route exact path="/new-application/:id/:type" component={NewApplication} />
      <Route exact path="/my-applications" component={MyApplications} />
      <Route exact path="/lisiting/:id/applications" component={ListingApplications} />
      <Route exact path="/my-profile" component={MyProfile} />
    </Switch>
  );
}

export default Body;