import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container } from '@material-ui/core';
import LecturerTable from "./LecturerTable";

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
}));

function TimeSlot() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className={classes.root}>
            <Container>
                <Accordion
                    style={
                        expanded
                            ? { backgroundColor: '#f5f5f5' }
                            : { backgroundColor: '#3f51b5', color: '#fff' }
                    }
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <Typography className={classes.heading}>
                            Adding lecturer details
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <LecturerTable></LecturerTable>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </div>
    );
}

export default TimeSlot;
