import React, { useState, useEffect } from "react";
import { makeStyles, emphasize } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Container,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
    marginRight: "10px",
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

function Stats() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [statName, setStatName] = useState("");
  const [stats, setStats] = useState([
    { key: "1", value: "Lecturer" },
    { key: "2", value: "Student" },
    { key: "3", value: "Subject" },
  ]);
  const [amount, setAmount] = useState([]);

  const [subject, setSubject] = useState([]);
  const [student, setStudent] = useState([]);

  const departments = [
    "Department of Information Technology",
    "Department of Computer Science and Software Engineering",
    "Department of Computer Systems Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Electronics and Telecommunication Engineering",
  ];

  const [label, setLabel] = useState([]);
  const departments_short = ["IT", "CSSE", "CSE", "CE", "ME", "ETE"];

  const [lecturers, setLecturers] = useState([]);
  const [name, setName] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/lecturers/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLecturers(result);
        },
        (error) => {
          setError(error);
        }
      );

    fetch(`http://localhost:5000/api/subjects/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setSubject(result);
        },
        (error) => {
          setError(error);
        }
      );

    fetch(`http://localhost:5000/api/students/all`)
      .then((res) => res.json())
      .then((result) => {
        setStudent(result);
      });
  }, [expanded, stats]);

  useEffect(() => {
    if (statName == stats[0].value) {
      setLabel(["IT", "CSSE", "CSE", "CE", "ME", "ETE"]);
      setName("Number of lecturers for departments");
      const dept1 = lecturers.filter((item) => {
        if (item.department == departments[0]) {
          return item.department;
        }
      });

      const dept2 = lecturers.filter((item) => {
        if (item.department == departments[1]) {
          return item.department;
        }
      });

      const dept3 = lecturers.filter((item) => {
        if (item.department == departments[2]) {
          return item.department;
        }
      });

      const dept4 = lecturers.filter((item) => {
        if (item.department == departments[3]) {
          return item.department;
        }
      });

      const dept5 = lecturers.filter((item) => {
        if (item.department == departments[4]) {
          return item.department;
        }
      });

      const dept6 = lecturers.filter((item) => {
        if (item.department == departments[5]) {
          return item.department;
        }
      });

      console.log(dept2);
      setAmount([
        dept1.length,
        dept2.length,
        dept3.length,
        dept4.length,
        dept5.length,
        dept6.length,
      ]);
    } else if (statName == stats[1].value) {
      const academic = [
        "Y1S1",
        "Y1S2",
        "Y2S1",
        "Y2S2",
        "Y3S1",
        "Y3S2",
        "Y4S1",
        "Y4S2",
      ];
      setLabel(academic);
      setName("number of groups assigned for academic Yr.Sem");

      const g1 = student.filter((item) => {
        if (item.academicYrSem == academic[0]) {
          return item.grpNo;
        }
      });

      const g2 = student.filter((item) => {
        if (item.academicYrSem == academic[1]) {
          return item.grpNo;
        }
      });

      const g3 = student.filter((item) => {
        if (item.academicYrSem == academic[2]) {
          return item.grpNo;
        }
      });

      const g4 = student.filter((item) => {
        if (item.academicYrSem == academic[3]) {
          return item.grpNo;
        }
      });

      const g5 = student.filter((item) => {
        if (item.academicYrSem == academic[4]) {
          return item.grpNo;
        }
      });

      const g6 = student.filter((item) => {
        if (item.academicYrSem == academic[5]) {
          return item.grpNo;
        }
      });

      const g7 = student.filter((item) => {
        if (item.academicYrSem == academic[6]) {
          return item.grpNo;
        }
      });

      const g8 = student.filter((item) => {
        if (item.academicYrSem == academic[7]) {
          return item.grpNo;
        }
      });

      setAmount([
        g1.length,
        g2.length,
        g3.length,
        g4.length,
        g5.length,
        g6.length,
        g7.length,
        g8.length,
      ]);

      // console.log(acys);
    } else if (statName == stats[2].value) {
      setLabel([
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
      ]);
      setName("Number of subjects offered in year");

      const y1 = subject.filter((item) => {
        if (item.offeredYear == "2012") {
          return item.subCode;
        }
      });

      const y2 = subject.filter((item) => {
        if (item.offeredYear == "2013") {
          return item.subCode;
        }
      });

      const y3 = subject.filter((item) => {
        if (item.offeredYear == "2014") {
          return item.subCode;
        }
      });

      const y4 = subject.filter((item) => {
        if (item.offeredYear == "2015") {
          return item.subCode;
        }
      });

      const y5 = subject.filter((item) => {
        if (item.offeredYear == "2016") {
          return item.subCode;
        }
      });

      const y6 = subject.filter((item) => {
        if (item.offeredYear == "2017") {
          return item.subCode;
        }
      });

      const y7 = subject.filter((item) => {
        if (item.offeredYear == "2018") {
          return item.subCode;
        }
      });

      const y8 = subject.filter((item) => {
        if (item.offeredYear == "2019") {
          return item.subCode;
        }
      });
      const y9 = subject.filter((item) => {
        if (item.offeredYear == "2020") {
          return item.subCode;
        }
      });
      setAmount([
        y1.length,
        y2.length,
        y3.length,
        y4.length,
        y5.length,
        y6.length,
        y7.length,
        y8.length,
        y9.length,
      ]);
    }
  }, [statName]);

  const data = {
    labels: label,
    datasets: [
      {
        label: `${name}`,
        data: amount,
        borderColor: ["#bdb7c4"],
        backgroundColor: ["#a3d4d0"],
        pointBackgroundColor: "#483263",
        pointBorderColor: "#b999e0",
      },
    ],
  };

  return (
    <div className={classes.root}>
      <Container>
        <Accordion
          style={
            expanded
              ? { backgroundColor: "#f5f5f5" }
              : { backgroundColor: "#3f51b5", color: "#fff" }
          }
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              Statistical Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <FormControl
                className={classes.formControl}
                //style={{ marginLeft: 5, marginTop: 0 }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ marginLeft: 7 }}
                >
                  *
                </InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statName}
                  style={{ width: "150px" }}
                  // disabled={!buildings.length}
                  onChange={(event) => setStatName(event.target.value)}
                >
                  {stats.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div style={{ display: "flex", width: "720px", padding: 50 }}>
                <Line data={data} />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default Stats;
