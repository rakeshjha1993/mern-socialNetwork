import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textfieldgroup';
import TextAreaFieldGroup from '../common/textareafield';
import SelectListGroup from '../common/selectlistgroup';
import InputGroup from '../common/inputgroup';
import {addExperience}from '../../actions/profileActions';
import {Form, Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';


class AddExperience extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            title : '',
            company : '',
            location : '',
            from : '',
            to : '',
            current : false,
            description : '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){

       
    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.errors){
          this.setState({errors : nextProps.errors});
        }
    } 

    onChange (event) {
        this.setState({[event.target.name] : event.target.value});
    }
    onCurrentSelected(e){
        console.log('checked');
        
        this.setState({current : !this.state.current})
    }
    onSubmit(e){
        e.preventDefault();
        const experience = {
            title : this.state.title,
            company : this.state.company,
            location : this.state.location,
            from : this.state.from,
            to : this.state.to,
            current : this.state.current,
            description : this.state.description
        }
         console.log(experience)
        this.props.addExperience(experience, this.props.history);
    }


  render() {
      const {errors } = this.state;

    return (
      <div>
          <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Add Experience</h1>
                        <small className="d-block pb-3">* = required Field</small>
                        <Form onSubmit={this.onSubmit} noValidate>
                                <TextFieldGroup 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    placeholder="Enter Your Profile title" 
                                    value = {this.state.title} 
                                    onChange = {this.onChange} 
                                    error = {errors.title}
                                    info = "Enter Title of Job Profile"/>  
                                <TextFieldGroup 
                                    type="text" 
                                    name="company" 
                                    id="company" 
                                    placeholder="Enter Your Company Name" 
                                    value = {this.state.company} 
                                    onChange = {this.onChange} 
                                    error = {errors.company}
                                    info= "Enter Your Company Name"/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="location" 
                                    id="location" 
                                    placeholder="Enter Your Location" 
                                    value = {this.state.website} 
                                    onChange = {this.onChange} 
                                    error = {errors.location}/>
                                <TextFieldGroup 
                                    type="date" 
                                    name="from" 
                                    id="from" 
                                    placeholder="Joining Date" 
                                    value = {this.state.from} 
                                    onChange = {this.onChange} 
                                    error = {errors.from}/>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input 
                                    type="checkbox"
                                    name="current" 
                                    id="current"
                                    className="custom-control-input"
                                    value = {this.state.current} 
                                    onChange = {this.onCurrentSelected.bind(this)} />
                                    <label className ="custom-control-label" htmlFor="current">Working Currently </label>
                                </div>
                                {!this.state.current && (
                                    <TextFieldGroup 
                                    type="date" 
                                    name="to" 
                                    id="to" 
                                    placeholder="Enter the leaving date" 
                                    value = {this.state.to} 
                                    onChange = {this.onChange}
                                    info = "Enter the leaving date."
                                    error = {errors.to}/>
                                )}
                                
                                <TextAreaFieldGroup 
                                    name="description" 
                                    id="description" 
                                    placeholder="Describe your role in job" 
                                    value = {this.state.description}
                                    onChange = {this.onChange} 
                                    error = {errors.description}/>

                                 
                                <div className="mb-3">
                                <Button color="primary" block>Submit</Button>
                                </div>
                        </Form>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
    profile : PropTypes.object.isRequired,
    addExperience : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));