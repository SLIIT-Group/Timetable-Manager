import React from 'react';
import SideNav from './Navigation/SideNav';
import TimeManager from './TimeManager/TimeManager';
import LocationManager from './Location/LocationManager';
import SessionManager from './Sessions/SessionManager';
import StudentManager from './Students/StudentManager';
import LecturerForm from './Lecturer/Lecturer';
import TagManager from './Tags/TagManager';
import Stats from './Location/Stats';
import Rooms from './Location/Rooms';
import EditLecturer from './Lecturer/EditLecturer';
import SubjectsForm from './Subjects/Subject';
import EditSubject from './Subjects/EditSubject';
import LecturerExpansionPanel from './Lecturer/LecturerExpansionPanel';
import SubjectExpansionPanel from './Subjects/SubjectExpansionPanel';
import StudentForm from './Students/SubComponents/StudentForm';

import React from "react";
import SideNav from "./Navigation/SideNav";
import TimeManager from "./TimeManager/TimeManager";
import LocationManager from "./Location/LocationManager";
import SessionManager from "./Sessions/SessionManager";
import StudentManager from "./Students/StudentManager";
import LecturerForm from "./Lecturer/Lecturer";
import TagManager from "./Tags/TagManager";
import Stats from "./Location/Stats";
import Rooms from "./Location/Rooms";
import EditLecturer from "./Lecturer/EditLecturer";
import SubjectsForm from "./Subjects/Subject";
import EditSubject from "./Subjects/EditSubject";
import LecturerExpansionPanel from "./Lecturer/LecturerExpansionPanel";
import SubjectExpansionPanel from "./Subjects/SubjectExpansionPanel";
import StudentForm from "./Students/SubComponents/StudentForm";
import EditStudentForm from "./Students/SubComponents/EditStudentForm";
import TagForm from "./Tags/SubComponents/TagForm";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <SideNav></SideNav>
        <div style={{ marginLeft: '240px' }}>
          <Switch>
            <Route exact path="/time" component={TimeManager}/>
            <Route exact path="/lecturers" component={LecturerExpansionPanel}/>
            <Route exact path="/location" component={LocationManager}/>
            <Route exact path="/session" component={SessionManager}/>
            <Route exact path="/student" component={StudentManager}/>
            <Route exact path="/subject" component={SubjectExpansionPanel}/>
            <Route exact path="/tags" component={TagManager}/>
            <Route exact path="/stats" component={Stats}/>
            <Route exact path="/rooms" component={Rooms}/>
            <Route exact path="/addLecturer" component={LecturerForm}/>
            <Route exact path="/lecturer/edit/:id" component={EditLecturer}/>
            <Route exact path="/addSubject" component={SubjectsForm}/>
            <Route exact path="/subject/edit/:id" component={EditSubject}/>
            <Route exact path="/addStudent" component={StudentForm}/>
            <Route exact path="/addTag" component={TagForm}/>
            <Route exact path="/student/edit/:id" component={EditStudentForm}/>
            <Route exact path='/time' component={TimeManager} />
            <Route exact path='/lecturers' component={LecturerExpansionPanel} />
            <Route exact path='/location' component={LocationManager} />
            <Route exact path='/session' component={SessionManager} />
            <Route exact path='/student' component={StudentManager} />
            <Route exact path='/subject' component={SubjectExpansionPanel} />
            <Route exact path='/tags' component={TagManager} />
            <Route exact path='/stats' component={Stats} />
            <Route exact path='/rooms' component={Rooms} />
            <Route exact path='/addLecturer' component={LecturerForm} />
            <Route exact path='/lecturer/edit/:id' component={EditLecturer} />
            <Route exact path='/addSubject' component={SubjectsForm} />
            <Route exact path='/subject/edit/:id' component={EditSubject} />
            <Route exact path='/addStudent' component={StudentForm} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
