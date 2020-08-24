import React, {Component} from 'react';
import axios from 'axios';
import swal from "sweetalert";

export default class EditProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            Categories : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/lecturers/edit/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_id : response.data.fname,
                    product_name : response.data.lname,
                    product_price : response.data.empid,
                    product_discount : response.data.faculty,
                    product_category : response.data.department
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/api/productcategory/')
            .then(response => {
                this.setState({Categories : response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    optionRow(){
        return this.state.Categories.map(function(object, i){
            return <OptionRow obj = {object} key = {i}/>;
        });
    }

    onChangeProductId(e){
        this.setState({
            product_id: e.target.value
        });
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductDiscount(e){
        this.setState({
            product_discount: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            product_id : this.state.product_id,
            product_name : this.state.product_name,
            product_price : this.state.product_price,
            product_discount : this.state.product_discount,
            product_category : this.state.product_category
        };

        axios.post('http://localhost:5000/api/lecturers/update/' +this.props.match.params.id, obj)
            .then((res) => {
                if(res.data == 'Update complete'){
                    swal("Successful", "Product discount added", "success");
                }else{
                    swal("Unsuccessful", "Error while adding discount", "error");
                }
            });

        //this.props.history.push('/addDiscount');

        this.setState({
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            product_category : '',
        })
    }

    handleChangeCategory = (event) => {
        this.setState({ product_category: event.currentTarget.value })
    }

    deleteProduct(){
        axios.get('http://localhost:5000/api/lecturers/delete/' +this.props.match.params.id)
            .then((res) => {
                if(res.data == 'Successfully removed'){
                    swal("Successful", "Product details removed", "success");
                }else{
                    swal("Unsuccessful", "Error while deleting product", "error");
                }
            });

        //this.props.history.push('/addDiscount');

        this.setState({
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            product_category : '',
        })
    }

    render() {
        return(
            <div style={{marginTop: 10, marginLeft: 50, marginRight: 50}}>
                <h3>Edit Lecturer details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First name :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_id}
                               onChange={this.onChangeProductId}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last name :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_name}
                               onChange={this.onChangeProductName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Employee ID :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_price}
                               onChange={this.onChangeProductPrice}
                        />
                    </div>

                    <div className="form-group">
                        <label>Faculty :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_discount}
                               onChange={this.onChangeProductDiscount}
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Category :</label>
                        <div style={{width:"25px", display:"inline-block"}} />
                        <select onChange={this.handleChangeCategory}>
                            {this.optionRow()}
                        </select>

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Lecturer" className= "btn btn-primary"/>
                        <div style={{width:"25px", display:"inline-block"}} />
                        <input type="button" value="Delete Lecturer" className= "btn btn-danger" onClick={this.deleteProduct}/>
                    </div>
                </form>
            </div>
        )
    }
}
