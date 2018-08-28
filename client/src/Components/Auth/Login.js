import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
// import {withRouter} from 'react-router-dom';
import {loginUser} from '../../actions/authActions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ProtoType } from 'prop-types';
// import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../common/textfieldgroup';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email : '',
      password : '',
      errors : {

      }
     
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange (event) {
    this.setState({[event.target.name] : event.target.value});
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }

    if(nextProps.errors){
      this.setState({errors : nextProps.errors});
    }
  } 

  onSubmit(event) {
    event.preventDefault();
    const userData = {
      email : this.state.email,
      password : this.state.password,
    }
    this.props.loginUser(userData);
    // console.log(loginUser);
  }
  render() {

    const {errors} = this.state; 
    return (
      <div>
          <div className="col-md-6 mr-auto ml-auto">
          <h1 className="text-center mt-5">Login</h1>
          <h6 className="text-center mb-3">Login to Social Network Account</h6>
          <Form onSubmit={this.onSubmit}>
            <TextFieldGroup type="email" name="email" id="email" placeholder="Enter Your Email"  value = {this.state.email} onChange = {this.onChange} error = {errors.email}/>

            <TextFieldGroup type="password" name="password" id="password" placeholder="Enter Your password" value = {this.state.password} onChange = {this.onChange} error= {errors.password}/>
            <Button color="primary" block>Submit</Button>
          </Form>
      </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);