import React, { useState } from 'react';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

function HoursInput({ changeHandler }) {
  const [hours, setHours] = useState('8');

  const changeHourValue = (e) => {
    setHours(e.target.value);
    changeHandler(e.target.value);
  };

  return (
    <InputGroup>
      <Input
        onChange={changeHourValue}
        placeholder='Hours'
        type='number'
        step='1'
        defaultValue={hours}
      ></Input>
      <InputGroupAddon addonType='append'>H</InputGroupAddon>
    </InputGroup>
  );
}

export default HoursInput;
