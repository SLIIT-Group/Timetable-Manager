import React, { useEffect, useState } from 'react';
import CreatePanel from './Panels/CreatePanel';
import LecturerTimetablePanel from './Panels/LecturerTimeTablePanel';
import ViewTimetable from './Panels/ViewTimetable';
import RoomTimetable from './Panels/RoomTimetablePanel';

function TimeTables() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <CreatePanel counter={counter} setCounter={setCounter}></CreatePanel>
      <ViewTimetable counter={counter} setCounter={setCounter}></ViewTimetable>
      <LecturerTimetablePanel></LecturerTimetablePanel>
      <RoomTimetable></RoomTimetable>
    </div>
  );
}

export default TimeTables;
