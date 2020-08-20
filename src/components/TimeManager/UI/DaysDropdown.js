import React, { useState } from 'react';
import {
  ButtonDropdown,
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
        <DropdownToggle style={dropDownStyle} caret>
          {day}
        </DropdownToggle>
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

const dropDownStyle = {
  color: 'grey',
  backgroundColor: 'white',
  borderColor: '#291d99',
};

export default ConfigureWorkingDays;
