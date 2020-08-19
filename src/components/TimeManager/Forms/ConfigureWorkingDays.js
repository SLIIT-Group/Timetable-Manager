import React, { useState } from 'react';

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Form,
  Table,
} from 'reactstrap';
import { Container } from '@material-ui/core';

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
  const [dropdownOpen, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Monday');
  const [hours, setHours] = useState('8');
  const [allocation, setAllocation] = useState([]);
  const [isEdititng, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    days: null,
    noOfHours: null,
  });

  const toggle = () => setOpen(!dropdownOpen);

  const changeValue = (e) => {
    setDropdownValue(e.target.value);
  };

  const changeHourValue = (e) => {
    setHours(e.target.value);
  };

  const addDay = (e) => {
    e.preventDefault();
    const addedAllocation = {
      day: dropdownValue,
      noOfHours: hours,
    };
    setAllocation([...allocation, addedAllocation]);
    days.splice(days.indexOf(addedAllocation.day), 1);
    setDays(days);
    setDropdownValue(days[days.indexOf(addedAllocation.day) + 1]);
  };

  const deleteDay = (item) => {
    setAllocation(allocation.filter((alloc) => alloc.day !== item.day));
    if (days.indexOf(item.day) === -1) {
      days.push(item.day);
    }
  };

  const editDay = (item) => {};

  return (
    <Container>
      <Row>
        {isEdititng ? (
          <Form>
            <Row>
              <Col>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>{dropdownValue}</DropdownToggle>
                  <DropdownMenu>
                    {days.map((day) => (
                      <DropdownItem
                        key={day}
                        value={day}
                        selected={currentItem.day}
                        onClick={changeValue}
                      >
                        {day}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>{' '}
              </Col>
              <Col>
                <InputGroup>
                  <Input
                    onChange={changeHourValue}
                    placeholder='Hours'
                    type='number'
                    step='1'
                    defaultValue='1'
                  ></Input>
                  <InputGroupAddon addonType='append'>H</InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                <Button onClick={editDay} className='success'>
                  Edit
                </Button>
              </Col>
              <Col>
                <Button onClick={() => setIsEditing(false)} className='success'>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form>
            <Row>
              <Col>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>{dropdownValue}</DropdownToggle>
                  <DropdownMenu>
                    {days.map((day) => (
                      <DropdownItem key={day} value={day} onClick={changeValue}>
                        {day}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>{' '}
              </Col>
              <Col>
                <InputGroup>
                  <Input
                    onChange={changeHourValue}
                    placeholder='Hours'
                    type='number'
                    step='1'
                    defaultValue='8'
                  >
                    {hours}
                  </Input>
                  <InputGroupAddon addonType='append'>H</InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                <Button onClick={addDay} className='success'>
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Row>
      <br></br>
      <Row>
        <Table hover>
          <thead>
            <tr>
              <th>Day</th>
              <th>Hours Allocated</th>
            </tr>
          </thead>
          <tbody>
            {allocation.map((item) => (
              <tr key={item.day}>
                <td>{item.day}</td>
                <td>{item.noOfHours}</td>
                <td>
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentItem({
                        day: item.day,
                        noOfHours: item.noOfHours,
                      });
                      console.log(currentItem);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteDay(item);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default ConfigureWorkingDays;
