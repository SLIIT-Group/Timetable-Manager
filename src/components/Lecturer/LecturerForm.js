import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import axios from "axios";
import swal from "sweetalert";

const departments = [
    {
        value: 'Department of Information Technology',
        label: 'Department of Information Technology',
    },
    {
        value: 'Department of Computer Science and Software Engineering',
        label: 'Department of Computer Science and Software Engineering',
    },
    {
        value: 'Department of Computer Systems Engineering',
        label: 'Department of Computer Systems Engineering',
    },
    {
        value: 'Department of Civil Engineering',
        label: 'Department of Civil Engineering',
    },
    {
        value: 'Department of Mechanical Engineering',
        label: 'Department of Mechanical Engineering',
    },
    {
        value: 'Department of Electronics and Telecommunication Engineering',
        label: 'Department of Electronics and Telecommunication Engineering',
    }
];

const faculities = [
    {
        value: 'Faculty of Computing',
        label: 'Faculty of Computing',
    },
    {
        value: 'Faculty of Engineering',
        label: 'Faculty of Engineering',
    },
    {
        value: 'Faculty of Business',
        label: 'Faculty of Business',
    },
    {
        value: 'Faculty of Humanities and Sciences',
        label: 'Faculty of Humanities and Sciences',
    },
    {
        value: 'School of Architecture',
        label: 'School of Architecture',
    },
    {
        value: 'School of Law',
        label: 'School of Law',
    },
    {
        value: 'School of Hospitality and Culinary',
        label: 'School of Hospitality and Culinary',
    }
];

const centre = [
    {
        value: 'Malabe Center',
        label: 'Malabe Center',
    },
    {
        value: 'Metro Center',
        label: 'Metro Center',
    },
    {
        value: 'Matara Center',
        label: 'Matara Center',
    },
    {
        value: 'Kandy Center',
        label: 'Kandy Center',
    },
    {
        value: 'Kurunegala Center',
        label: 'Kurunegala Center',
    },
    {
        value: 'Jaffna Center',
        label: 'Jaffna Center',
    }
];

const building = [
    {
        value: 'Main Building',
        label: 'Main Building',
    },
    {
        value: 'New Building',
        label: 'New Building',
    },
    {
        value: 'D-Block',
        label: 'D-Block',
    }
];

const level = [
    {
        value: 1,
        label: 'Professor',
    },
    {
        value: 2,
        label: 'Assistant Professor',
    },
    {
        value: 3,
        label: 'Senior Lecturer(HG)',
    },
    {
        value: 4,
        label: 'Senior Lecturer',
    },
    {
        value: 5,
        label: 'Lecturer',
    },
    {
        value: 6,
        label: 'Assistant Lecturer',
    },
    {
        value: 7,
        label: 'Instructors',
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

export default function LecturerForm() {
    const classes = useStyles();

    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [empid, setEmpid] = React.useState('');
    const [faculty, setFaculty] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [center, setCenter] = React.useState('');
    const [building1, setBuilding1] = React.useState('');
    const [level1, setLevel1] = React.useState('');
    const [rank, setRank] = React.useState('');

    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };
    const handleEmpidChange = (event) => {
        setEmpid(event.target.value);
    };
    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };
    const handleCenterChange = (event) => {
        setCenter(event.target.value);
    };
    const handleBuilding1Change = (event) => {
        setBuilding1(event.target.value);
    };
    const handleLevel1Change = (event) => {
        setLevel1(event.target.value);
    };

    const saveLecturer = () => {
        const isValidated = validateForm();

        if(isValidated){
            const req = {
                fname: fname,
                lname: lname,
                empid: empid,
                faculty: faculty,
                department: department,
                center: center,
                building1: building1,
                level1: level1,
                rank: level1+ "." +empid
            };

            axios.post("https://kaalaapi.herokuapp.com/api/lecturers/add", req).then((res) => {
                if (res.data.success) {
                    // console.log(res.data);
                    swal("Successful", "Lecturer details added", "success");
                }else{
                    swal("Unsuccessful", "Error while adding details", "error");
                }
            });

            setFname("");
            setLname("");
            setEmpid("");
            setFaculty("");
            setDepartment("");
            setCenter("");
            setBuilding1("");
            setLevel1("");
            setRank("");
        }
    };

    function validateForm() {
        let firstName = document.getElementById("firstNameId").value;
        let lastName = document.getElementById("lastNameId").value;
        let empId = document.getElementById("employeeID").value;
        let faculty = document.getElementById("facultyId").value;
        let department = document.getElementById("departmentId").value;
        let center = document.getElementById("centreId").value;
        let building = document.getElementById("buildingId").value;
        let level = document.getElementById("levelId").value;

        if(firstName == ""){
            //console.log('empty name');
            swal("Unsuccessful", "First name must be filled out", "error");
            return false;
        }
        if(lastName == ""){
            swal("Unsuccessful", "Last name must be filled out", "error");
            return false;
        }
        if(empId == ""){
            swal("Unsuccessful", "Employee ID must be filled out", "error");
            return false;
        }
        if(isNaN(empId)){
            swal("Unsuccessful", "Employee ID should be a number", "error");
            return false;
        }
        if(empId.length != 6){
            swal("Unsuccessful", "Employee ID should be a 6 digit number", "error");
            return false;
        }
        // if(faculty == null){
        //     swal("Unsuccessful", "Faculty must be filled out", "error");
        //     return false;
        // }
        // if(department == null){
        //     swal("Unsuccessful", "Department must be filled out", "error");
        //     return false;
        // }
        // if(center == null){
        //     swal("Unsuccessful", "Center must be filled out", "error");
        //     return false;
        // }
        // if(building == null){
        //     swal("Unsuccessful", "Building must be filled out", "error");
        //     return false;
        // }
        // if(level == null){
        //     swal("Unsuccessful", "Level must be filled out", "error");
        //     return false;
        // }
        return true;
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstNameId"
                        name="firstName"
                        label="First name"
                        value={fname}
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleFnameChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastNameId"
                        name="lastName"
                        label="Last name"
                        value={lname}
                        fullWidth
                        autoComplete="family-name"
                        onChange={handleLnameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="employeeID"
                        name="employeeID"
                        label="Employee ID"
                        value={empid}
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleEmpidChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="facultyId"
                        select
                        label="Faculty"
                        value={faculty}
                        onChange={handleFacultyChange}
                        variant="filled"
                        fullWidth
                    >
                        {faculities.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="departmentId"
                        select
                        label="Department"
                        value={department}
                        onChange={handleDepartmentChange}
                        variant="filled"
                        fullWidth
                    >
                        {departments.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="centreId"
                        select
                        label="Centre"
                        value={center}
                        onChange={handleCenterChange}
                        variant="filled"
                        fullWidth
                    >
                        {centre.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="buildingId"
                        select
                        label="Building"
                        value={building1}
                        onChange={handleBuilding1Change}
                        variant="filled"
                        fullWidth
                    >
                        {building.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="levelId"
                        select
                        label="Level"
                        value={level1}
                        onChange={handleLevel1Change}
                        variant="filled"
                        fullWidth
                    >
                        {level.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="rankId"
                        name="address2"
                        label="Rank"
                        fullWidth
                        autoComplete="shipping address-line2"
                        value = {level1+ "." +empid}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="I hearby certify that above details are true"
                    />
                </Grid>
            </Grid>

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={saveLecturer}
                >
                    Add
                </Button>

            </div>
        </React.Fragment>
    );
}
