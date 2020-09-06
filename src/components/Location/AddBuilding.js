import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
    marginLeft: 240,
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
  table: {
    minWidth: 200,
    padding: 0,
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function AddBuilding(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [building, setBuilding] = React.useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
            <Typography className={classes.heading}>Add Building</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="standard-secondary"
                  label="Add a Building"
                  value={building}
                  onChange={(e) => {
                    setBuilding(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10, marginLeft: 10 }}
                  disabled={!building}
                  onClick={() => console.log(building)}
                >
                  Add
                </Button>
              </form>
              <Grid items>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead
                      style={{
                        backgroundColor: "theme.palette.common.black",
                        color: "theme.palette.common.white",
                      }}
                    >
                      <TableRow align="center">
                        <StyledTableCell align="center">
                          Building
                        </StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                        <StyledTableCell align="center">Edit</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell align="center">sd</TableCell>
                        <TableCell align="center">
                          <DeleteIcon> </DeleteIcon>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <EditIcon>Edit</EditIcon>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default AddBuilding;
