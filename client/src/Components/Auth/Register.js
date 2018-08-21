import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';


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
    axios.post('/api/users',newUser).then(res => console.log(res.data)).catch(err => {
      this.setState({errors : err.response.data});
      console.log(this.state.errors);
    });
    // console.log(newUser);
  }

  render() {


    const {errors} = this.state;


    return (
      <div className="col-md-6 mr-auto ml-auto">
          <h1 className="text-center mt-5">Register</h1>
          <h6 className="text-center mb-3">Create Social Network Account</h6>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input type="text" name="name" id="name" placeholder="Enter Your Name" value = {this.state.name} required onChange = {this.onChange} className = { classnames({'is-invalid' : errors.name})}/>
              {errors.name && (<div className= "invalid-feedback">{errors.name}</div>)}
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Enter Your Email"  value = {this.state.email} onChange = {this.onChange} className = { classnames({'is-invalid' : errors.email})}/>
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image , use a gravatar email.</small>
              {errors.email && (<div className= "invalid-feedback">{errors.email}</div>)}
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Enter Your password" value = {this.state.password} onChange = {this.onChange} className = { classnames({'is-invalid' : errors.password})}/>
              {errors.password && (<div className= "invalid-feedback">{errors.password}</div>)}
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password2" id="confirmpassword" placeholder="Enter Your password again." value = {this.state.password2} onChange = {this.onChange} className = { classnames({'is-invalid' : errors.password2})}/>
              {errors.password2 && (<div className= "invalid-feedback">{errors.password2}</div>)}
            </FormGroup>
            <Button color="primary" block>Submit</Button>
          </Form>
      </div>
    )
  }
}

export default Register;