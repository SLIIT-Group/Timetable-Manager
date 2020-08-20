import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Row,
  Container,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Table,
} from "reactstrap";
import TimeSlotTable from "../UI/TimeSlotTable";
import AddIcon from "@material-ui/icons/Add";

function TimeSlotAddForm() {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [error, setError] = useState(false);
  const slots = ["1-Hour-Slot", "1/2 Hour Slot"];
  const [addedSlot, setAddedSlot] = useState([]);

  //Form values
  const [dropDownValue, setDropDownValue] = useState("1-Hour-Slot");
  const [hourValue, setHourValue] = useState();
  const [minsValue, setMinsValue] = useState();

  const changeValue = (e) => {
    setDropDownValue(e.target.value);
  };
  const changeMinutes = (e) => {
    if (parseInt(minsValue) < 10) {
      setMinsValue(zeroPad(e.target.value, 2));
    } else {
      setMinsValue(e.target.value);
    }
  };
  const changeHours = (e) => {
    if (parseInt(hourValue) < 10) {
      setHourValue(zeroPad(e.target.value, 2));
    } else {
      setHourValue(e.target.value);
    }
  };

  const isValidSlot = (slot) => {
    console.log(slot);
    let pattern = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
    return pattern.test(slot);
  };

  const zeroPad = (num, places) => String(num).padStart(places, "0");

  const getNextSlot = (type) => {
    if (type === "1-Hour-Slot") {
      let nextSlotHour = parseInt(hourValue) + 1;
      let nextSlotMin = minsValue;
      if (nextSlotHour < 10) {
        nextSlotHour = zeroPad(nextSlotHour, 2);
      }
      return nextSlotHour + ":" + nextSlotMin;
    }
    if (type === "1/2 Hour Slot") {
      let nextSlotHour = parseInt(hourValue);
      let nextSlotMins = parseInt(minsValue);
      nextSlotMins = nextSlotMins + 30;
      if (nextSlotMins >= 60 && hourValue < 23) {
        nextSlotHour = nextSlotHour + 1;
        nextSlotMins = nextSlotMins - 60;
        if (nextSlotHour < 10) {
          nextSlotHour = zeroPad(nextSlotHour, 2);
        }
        if (nextSlotMins < 10) {
          nextSlotMins = zeroPad(nextSlotMins, 2);
        }
        return nextSlotHour + ":" + nextSlotMins;
      } else if (nextSlotMins < 60) {
        return nextSlotHour + ":" + nextSlotMins;
      }
    }
  };

  const buildSlot = () => {
    if (parseInt(minsValue) < 10) {
      setMinsValue(zeroPad(minsValue, 2));
    }

    if (parseInt(hourValue) < 10) {
      setHourValue(zeroPad(hourValue, 2));
    }

    let slot = hourValue + ":" + minsValue;
    if (!isValidSlot(slot)) {
      setError(true);
    }
    if (isValidSlot(slot)) {
      setError(false);
      let nextSlot = getNextSlot(dropDownValue);

      setAddedSlot([
        ...addedSlot,
        {
          startTime: slot,
          endTime: nextSlot,
        },
      ]);
      console.log(addedSlot);
    }
  };

  return (
    <Container>
      <Row>
        {/* Hours */}
        <Col>
          <InputGroup>
            <Input
              style={{ borderColor: "#291d99" }}
              onChange={changeHours}
              type="number"
            ></Input>
            <InputGroupAddon addonType="append">H</InputGroupAddon>
          </InputGroup>
        </Col>
        {/* Minutes */}
        <Col>
          <InputGroup>
            <Input
              style={{ borderColor: "#291d99" }}
              onChange={changeMinutes}
              type="number"
            ></Input>
            <InputGroupAddon addonType="append">M</InputGroupAddon>
          </InputGroup>
        </Col>
        <Col>
          {/* Dropdown */}
          <InputGroup>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle style={dropDownStyle} caret>
                {dropDownValue}
              </DropdownToggle>
              <DropdownMenu>
                {slots.map((slot) => (
                  <DropdownItem key={slot} value={slot} onClick={changeValue}>
                    {slot}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </ButtonDropdown>
          </InputGroup>
        </Col>
        <Col>
          <Button style={buttonStyle} onClick={buildSlot} block>
            <AddIcon></AddIcon> Add
          </Button>
        </Col>
      </Row>
      <Row>{error && <p style={errorStyle}>Please enter a valid time!</p>}</Row>
      <Row>
        <Container>
          <TimeSlotTable
            addedSlot={addedSlot}
            setAddedSlot={setAddedSlot}
          ></TimeSlotTable>
        </Container>
      </Row>
    </Container>
  );
}

const errorStyle = {
  color: "red",
  marginLeft: "50px",
  marginTop: "20px",
};
const dropDownStyle = {
  color: "grey",
  backgroundColor: "white",
  borderColor: "#291d99",
};

const buttonStyle = {
  backgroundColor: "#291d99",
  border: "none",
};
export default TimeSlotAddForm;
