import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
  onSubmit(event) {
    event.preventDefault();
    const loginUser = {
      email : this.state.email,
      password : this.state.password,
    }
    console.log(loginUser);
  }
  render() {
    return (
      <div>
          <div className="col-md-6 mr-auto ml-auto">
          <h1 className="text-center mt-5">Login</h1>
          <h6 className="text-center mb-3">Login to Social Network Account</h6>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input type="email" name="email" id="email" placeholder="Enter Your Email"  value = {this.state.email} onChange = {this.onChange}/>
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="password" placeholder="Enter Your password" value = {this.state.password} onChange = {this.onChange}/>
            </FormGroup>
            <Button color="primary" block>Submit</Button>
          </Form>
      </div>
      </div>
    )
  }
}

export default Login;