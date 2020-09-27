import React from 'react';
import SideNav from './Navigation/SideNav';
import TimeManager from './TimeManager/TimeManager';
import LocationManager from './Location/LocationManager';
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
import EditStudentForm from './Students/SubComponents/EditStudentForm';
import TagForm from './Tags/SubComponents/TagForm';
import EditTagForm from './Tags/SubComponents/EditTagForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import SessionExpansionPanel from './Sessions/SessionExpansionPanel';
import SessionForm from './Sessions/Session';
import EditSession from './Sessions/EditSession';
import Customize from "./Customize/Customize";

const App = () => {
  return (
    <Router>
      <div className='app'>
        <SideNav />
        <div style={{ marginLeft: '240px' }}>
          <Switch>
            <Route exact path='/time' component={TimeManager} />
            <Route exact path='/lecturers' component={LecturerExpansionPanel} />
            <Route exact path='/location' component={LocationManager} />
            <Route exact path='/session' component={SessionExpansionPanel} />
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
            <Route exact path='/addTag' component={TagForm} />
            <Route exact path='/student/edit/:id' component={EditStudentForm} />
            <Route exact path='/tags/edit/:id' component={EditTagForm} />
            <Route exact path='/addSession' component={SessionForm} />
            <Route exact path='/session/edit/:id' component={EditSession} />
            <Route exact path='/section3' component={Customize} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
