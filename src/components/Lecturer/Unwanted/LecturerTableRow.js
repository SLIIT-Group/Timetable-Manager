import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LecturerTableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.fname}
                </td>
                <td>
                    {this.props.obj.lname}
                </td>
                <td>
                    {this.props.obj.empid}
                </td>
                <td>
                    {this.props.obj.faculty}
                </td>
                <td>
                    {this.props.obj.department}
                </td>
                <td>
                    {this.props.obj.center}
                </td>
                <td>
                    {this.props.obj.building1}
                </td>
                <td>
                    {this.props.obj.level1}
                </td>
                <td>
                    {this.props.obj.rank}
                </td>
                <td>
                    {/*When clicks this, it goes to 'edit.component.js' file*/}
                    <Link to={"/edit/" +this.props.obj._id} className="btn btn-primary"> Edit/Delete </Link>
                </td>
                {/*<td>*/}
                {/*    <button className="btn btn-primary"> Delete </button>*/}
                {/*</td>*/}
            </tr>
        );
    }
}

export default LecturerTableRow;
