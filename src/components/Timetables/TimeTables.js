import React from 'react';
import CreatePanel from './Panels/CreatePanel';
import ViewTimetable from './Panels/ViewTimetable';

function TimeTables() {
  return (
    <div>
      <CreatePanel></CreatePanel>
      <ViewTimetable></ViewTimetable>
    </div>
  );
}

export default TimeTables;
