import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router} from 'react-router-dom'
import User from './User';
import Admin from './Admin';
import React from 'react'
export const DataContext = React.createContext({});
export const useDataContext = () => React.useContext(DataContext);

const initialState = {logggedIn : false,
}

function App() {
  const [data, setData] = React.useState(initialState);
  return (
    <DataContext.Provider value={{ data, setData }}>
      <div className="App">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css"></link>
        <Router>
          {localStorage.getItem('userType') === 'admin' ? (
            <Admin/>
          ) : (
            <User/>
          )}
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
