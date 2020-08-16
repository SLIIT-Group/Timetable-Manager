import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import {  useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from "@material-ui/core/TextField";
import {Col} from "reactstrap";
import Button from "@material-ui/core/Button";
import Row from "react-bootstrap/Row";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px',
    marginRight: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',

];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
  };
}


export default function TagAllocation() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const theme = useTheme();
  const [tag, setTag] = React.useState([]);

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setTag(value);
  };

  const OnTagChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={classes.heading}>Tag Allocation</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <div className="col-md-12 row px-5">
            <div className="input-field col s6">
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Tags List
                </InputLabel>
                <Select
                    multiple
                    native
                    value={tag}
                    onChange={handleChangeMultiple}
                    inputProps={{
                      id: 'select-multiple-native',
                    }}
                >
                  {names.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Col sm="6 pb-0">
              <div className="form-group">
                <input type="text" className="form-control" value={tag} onChange={OnTagChange}/>
              </div>

              <Row>
                <Col>
                  <Button variant="contained" color="primary" className="btn-block pr-1">
                    Update
                  </Button>
                </Col>
                <Col>
                  <Button variant="contained" color="secondary" className="btn-block pl-1">
                    Delete
                  </Button>
                </Col>
              </Row>
            </Col>
          </div>

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
