import React, { useState } from 'react';
import DaysDropDown from '../UI/DaysDropdown';
import { Row, Form, Col, Button } from 'reactstrap';
import HoursInput from '../UI/HoursInput';
import AllocationsTable from '../UI/AllocationsTable';

function ConfigureWorkingDays() {
  const [days, setDays] = useState([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]);
  const [day, setDay] = useState('Monday');
  const [hours, setHours] = useState('8');
  const allocations = [];
  const [allocationData, setAllocationData] = useState(allocations);

  const add = (e) => {
    let newAllocation = {
      day,
      hours,
    };
    setAllocationData([...allocationData, newAllocation]);
    setDays(days.filter((day) => day !== newAllocation.day));
    setDay(days[days.indexOf(e.target.value) + 1]);
  };
  const view = (e) => {
    console.log(allocationData);
  };

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <DaysDropDown
              day={day}
              setDay={setDay}
              days={days}
              clickHandler={setDay}
              onClick={(e) => {
                console.log(e.target.value);
              }}
            ></DaysDropDown>
          </Col>
          <Col>
            <HoursInput changeHandler={setHours}></HoursInput>
          </Col>
          <Col>
            <Button onClick={add}>Add</Button>
          </Col>
          
        </Row>
      </Form>
      <Row style={{ margin: '20px' }}>
        <AllocationsTable allocationData={allocationData}></AllocationsTable>
      </Row>
    </div>
  );
}

export default ConfigureWorkingDays;
