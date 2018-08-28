import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {registerUser} from '../../actions/authActions';
import {withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../common/textfieldgroup';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : '',
      email : '',
      password : '',
      password2 : '',
      errors : {

      }
     
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  onChange (event) {
    this.setState({[event.target.name] : event.target.value});
  }
  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email : this.state.email,
      password : this.state.password,
      password2 : this.state.password2
    }
    
    // console.log(newUser);

    this.props.registerUser(newUser,this.props.history);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors : nextProps.errors});
    }
  } 

  render() {

    
    const {errors} = this.state;
    const {user} = this.props.auth;

    return (
      <div className="col-md-6 mr-auto ml-auto">
          {user ? user.name : null}
          <h1 className="text-center mt-5">Register</h1>
          <h6 className="text-center mb-3">Create Social Network Account</h6>
          <Form onSubmit={this.onSubmit} noValidate>

          <TextFieldGroup type="text" name="name" id="name" placeholder="Enter Your Name" value = {this.state.name} required onChange = {this.onChange} error = {errors.name}/>

          <TextFieldGroup type="email" name="email" id="email" placeholder="Enter Your Email"  value = {this.state.email} onChange = {this.onChange} error = {errors.email}/>


          <TextFieldGroup type="password" name="password" id="password" placeholder="Enter Your password" value = {this.state.password} onChange = {this.onChange} error = {errors.password}/>
          
          <TextFieldGroup type="password" name="password2" id="confirmpassword" placeholder="Enter Your password again." value = {this.state.password2} onChange = {this.onChange} error = {errors.password}/>
          
          <Button color="primary" block>Submit</Button>
          </Form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));