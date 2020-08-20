import React from 'react';
import TimeSlot from './Panels/TimeSlot';
import AllocateWorkingDays from './Panels/AllocateWorkingDays';

function TimeManager() {
  return (
    <div>
      <AllocateWorkingDays></AllocateWorkingDays>
      <TimeSlot></TimeSlot>
    </div>
  );
}

export default TimeManager;
