import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Students from './Components/Students/Students';
import Navbar from './Components/Navbar/Navbar';
import Subjects from './Components/Subjects/Subjects';
import NewStudent from './Components/Students/NewStudent';
import EditStudent from './Components/Students/EditStudent';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="body">
        <Navbar />
        <Router>
          <Switch>
            <Route path="/students">
              <Students />
            </Route>
            <Route path="/subjects">
              <Subjects />
            </Route>
            <Route path="/newstudent">
              <NewStudent />
            </Route>
            <Route path="/editstudent">
              <EditStudent />
            </Route>
            <Route exact path="/">
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;