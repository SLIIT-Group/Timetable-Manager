import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProductTableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.subName}
                </td>
                <td>
                    {this.props.obj.subCode}
                </td>
                <td>
                    {this.props.obj.offeredYear}
                </td>
                <td>
                    {this.props.obj.offeredSemester}
                </td>
                <td>
                    {this.props.obj.lecHo}
                </td>
                <td>
                    {this.props.obj.tuteHo}
                </td>
                <td>
                    {this.props.obj.labHo}
                </td>
                <td>
                    {this.props.obj.evaHo}
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

export default ProductTableRow;
