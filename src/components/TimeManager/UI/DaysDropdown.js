import React, { useState } from 'react';
import {
  Container,
  Form,
  Col,
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function ConfigureWorkingDays({ clickHandler, days, setDay, day }) {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  // const [day, setDay] = useState('Monday');

  const changeValue = (e) => {
    setDay(e.target.value);
    clickHandler(e.target.value);
  };

  return (
    <div>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{day}</DropdownToggle>
        <DropdownMenu>
          {days.map((day) => (
            <DropdownItem key={day} value={day} onClick={changeValue}>
              {day}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
}

export default ConfigureWorkingDays;
