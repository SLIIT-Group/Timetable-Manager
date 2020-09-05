import React from 'react';
import TimeSlot from './Panels/TimeSlot';
import WorkingDays from './Panels/WorkingDays';
import { Copyright } from '../Lecturer/Lecturer';
function TimeManager() {
  return (
    <div>
      <TimeSlot></TimeSlot>
      <WorkingDays></WorkingDays>
      <Copyright></Copyright>
    </div>
  );
}

export default TimeManager;
