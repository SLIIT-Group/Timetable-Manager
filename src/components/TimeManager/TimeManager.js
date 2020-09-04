import React from 'react';
import TimeSlot from './Panels/TimeSlot';
import WorkingDays from './Panels/WorkingDays';
function TimeManager() {
  return (
    <div>
      <TimeSlot></TimeSlot>
      <WorkingDays></WorkingDays>
    </div>
  );
}

export default TimeManager;
