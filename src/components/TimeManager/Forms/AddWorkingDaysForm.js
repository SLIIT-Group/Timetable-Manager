import React, { useState } from 'react';
import DaysDropDown from '../UI/DaysDropdown';
import { Row, Form, Col, Button } from 'reactstrap';
import HoursInput from '../UI/HoursInput';
import AllocationsTable from '../UI/AllocationsTable';
import EditForm from './EditForm';

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
  const [editingItem, setEditingItem] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const add = (e) => {
    let newAllocation = {
      day,
      hours,
    };
    setAllocationData([...allocationData, newAllocation]);
    setDays(days.filter((day) => day !== newAllocation.day));
    setDay(days[days.indexOf(e.target.value) + 1]);
  };

  return (
    <div>
      {isEditing ? (
        <EditForm
          day={day}
          setDay={setDay}
          setHours={setHours}
          days={days}
          item={editingItem}
          setIsEditing={setIsEditing}
        ></EditForm>
      ) : (
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
              <HoursInput hours={hours} changeHandler={setHours}></HoursInput>
            </Col>
            <Col>
              <Button style={buttonStyle} onClick={add}>
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <Row style={{ margin: '20px' }}>
        <AllocationsTable
          setAllocationData={setAllocationData}
          allocationData={allocationData}
          setDays={setDays}
          days={days}
          setEditingItem={setEditingItem}
          setIsEditing={setIsEditing}
        ></AllocationsTable>
      </Row>
    </div>
  );
}
const buttonStyle = {
  backgroundColor: '#291d99',
  border: 'none',
};

export default ConfigureWorkingDays;
