import React from 'react';
import TimeSlot from './Panels/TimeSlot';
import WorkingDays from './Panels/WorkingDays';
import Copyright from '../Commons/Copyright';
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
