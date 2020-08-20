import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'reactstrap';
import HoursInput from '../UI/HoursInput';
import DaysDropDown from '../UI/DaysDropdown';

function EditForm({ setDay, days, setHours, item, setIsEditing }) {
  return (
    <Form>
      <Row>
        <Col>
          <DaysDropDown
            day={item.day}
            setDay={setDay}
            days={days}
            clickHandler={setDay}           
          ></DaysDropDown>
        </Col>
        <Col>
          <HoursInput hours={item.hours} changeHandler={setHours}></HoursInput>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => {
              console.log(item.day);
            }}
          >
            Edit
          </Button>
        </Col>
        <Col>
          <Button
            style={buttonStyle}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
const buttonStyle = {
  backgroundColor: '#291d99',
  border: 'none',
};

export default EditForm;
