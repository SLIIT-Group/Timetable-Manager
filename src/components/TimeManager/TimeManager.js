import React from 'react';
import TimeSlot from './TimeSlot';
import AllocateWorkingDays from './AllocateWorkingDays';
import NoOfWorkingDays from './NoOfWorkingDays';

function TimeManager() {
  return (
    <div>
      <NoOfWorkingDays></NoOfWorkingDays>
      <AllocateWorkingDays></AllocateWorkingDays>
      <TimeSlot></TimeSlot>
    </div>
  );
}

export default TimeManager;
