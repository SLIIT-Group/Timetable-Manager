import React from 'react';
import TimeSlot from './Panels/TimeSlot';
import AllocateWorkingDays from './Panels/AllocateWorkingDays';
import NoOfWorkingDays from './Panels/NoOfWorkingDays';

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
