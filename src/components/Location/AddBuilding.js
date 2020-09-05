import React from "react";
import { makeStyles, emphasize } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "105%",
    margin: "0px",
    marginRight: "-10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function AddBuilding() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Add Building</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-secondary"
                label="Add a Building"
                color="secondary"
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </form> */}
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
                  <HoursInput
                    hours={hours}
                    changeHandler={setHours}
                  ></HoursInput>
                </Col>
                <Col>
                  <Button style={buttonStyle} onClick={add}>
                    <AddIcon></AddIcon>Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
