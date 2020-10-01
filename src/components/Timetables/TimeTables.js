import React, { useEffect, useState } from 'react';
import CreatePanel from './Panels/CreatePanel';
import ViewTimetable from './Panels/ViewTimetable';

function TimeTables() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <CreatePanel counter={counter} setCounter={setCounter}></CreatePanel>
      <ViewTimetable counter={counter} setCounter={setCounter}></ViewTimetable>
    </div>
  );
}

export default TimeTables;
