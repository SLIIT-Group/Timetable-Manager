<<<<<<< HEAD
import React from "react";
import SideNav from "./Navigation/SideNav";
import TimeManager from "./TimeManager/TimeManager";
import LocationManager from "./Location/LocationManager";
import SessionManager from "./Sessions/SessionManager";
import StudentManager from "./Students/StudentManager";
import SubjectManager from "./Subjects/SubjectManager";
import Lecturer from "./Lecturer/Lecturer";
=======
import React from 'react';
import SideNav from './Navigation/SideNav';
import TimeManager from './TimeManager/TimeManager';
import LocationManager from './Location/LocationManager';
import SessionManager from './Sessions/SessionManager';
import StudentManager from './Students/StudentManager';
import SubjectManager from './Subjects/SubjectManager';
import Lecturer from './Lecturer/Lecturer';
import Lecturer2 from './Lecturer/addProductCategory.component'
>>>>>>> 7aac723021875b72a1cd53351fab55f43f136272
import TagManager from "./Tags/TagManager";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <SideNav></SideNav>
        <Switch>
          <Route exact path="/time" component={TimeManager}></Route>
          <Route exact path="/lecturers" component={Lecturer}></Route>
          <Route exact path="/location" component={LocationManager}></Route>
          <Route exact path="/session" component={SessionManager}></Route>
          <Route exact path="/student" component={StudentManager}></Route>
          <Route exact path="/subject" component={SubjectManager}></Route>
          <Route exact path="/tags" component={TagManager}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
