import React from "react";
import SideNav from "./Navigation/SideNav";
import TimeManager from "./TimeManager/TimeManager";
import LocationManager from "./Location/LocationManager";
import SessionManager from "./Sessions/SessionManager";
import StudentManager from "./Students/StudentManager";
import SubjectManager from "./Subjects/SubjectManager";
import Lecturer from "./Lecturer/Lecturer";
import TagManager from "./Tags/TagManager";
import Stats from "./Location/Stats";
import Rooms from "./Location/Rooms";
import LecturerTable from "./Lecturer/LecturerTable";
import SubjectTable from "./Subjects/fullTable.component";
import EditLecturer from "./Lecturer/EditLecturer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <SideNav></SideNav>
        <Switch>
          <Route exact path="/time" component={TimeManager}></Route>
          <Route exact path="/lecturers" component={LecturerTable}></Route>
          <Route exact path="/location" component={LocationManager}></Route>
          <Route exact path="/session" component={SessionManager}></Route>
          <Route exact path="/student" component={StudentManager}></Route>
          <Route exact path="/subject" component={SubjectManager}></Route>
          <Route exact path="/tags" component={TagManager}></Route>
          <Route exact path="/stats" component={Stats}></Route>
          <Route exact path="/rooms" component={Rooms}></Route>
          <Route exact path="/addLecturer" component={Lecturer}></Route>
          <Route exact path="/subjectTable" component={SubjectTable}></Route>
          <Route exact path="/edit/:id" component={EditLecturer}/>

        </Switch>
      </div>
    </Router>
  );
};

export default App;
