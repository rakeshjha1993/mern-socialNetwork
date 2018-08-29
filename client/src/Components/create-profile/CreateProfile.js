import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textfieldgroup';
import {createProfile }from '../../actions/profileActions';
import {Form, Button} from 'reactstrap';


class CreateProfile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs : false,
            handle : '',
            company : '',
            website :'',
            location : '',
            skills : '',
            status : '',
            bio : '',
            githubusername : '',
            facebook : '',
            youtube : '',
            linkedin: '',
            instagram : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (event) {
        this.setState({[event.target.name] : event.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        console.log(e.target.name.skills)
        const profileData = {
            handle : this.state.handle,
            company : this.state.company,
            website : this.state.website,
            skills : this.state.skills,
            location : this.state.location,
            status : this.state.status,
            bio : this.state.bio,
            githubusername : this.state.githubusername,

        };
        this.props.createProfile(profileData, this.props.history);
    }

  render() {
    const {errors} = this.props;
    return (
      <div>
          <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create Profile</h1>
                        <p className="lead text-center">Let's get some information to make profile stand out</p>
                        <small className="d-block pb-3">* = required Field</small>
                        <Form onSubmit={this.onSubmit} noValidate>
                            <TextFieldGroup 
                                    type="text" 
                                    name="handle" 
                                    id="handle" 
                                    placeholder="Enter Your Profile Handle" 
                                    value = {this.state.handle} 
                                    onChange = {this.onChange} 
                                    error = {errors.handle}/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="company" 
                                    id="company" 
                                    placeholder="Enter Your Company Name" 
                                    value = {this.state.company} 
                                    onChange = {this.onChange} 
                                    error = {errors.company}/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="website" 
                                    id="website" 
                                    placeholder="Enter Your Website" 
                                    value = {this.state.website} 
                                    onChange = {this.onChange} 
                                    error = {errors.website}/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="location" 
                                    id="location" 
                                    placeholder="Enter Your Location" 
                                    value = {this.state.location} 
                                    onChange = {this.onChange} 
                                    error = {errors.location}/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="status" 
                                    id="status" 
                                    placeholder="Enter Your Status" 
                                    value = {this.state.status} 
                                    onChange = {this.onChange} 
                                    error = {errors.status}/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="skills" 
                                    id="skills" 
                                    placeholder="Enter Your Skills" 
                                    value = {this.state.skills} 
                                    onChange = {this.onChange}
                                    info = "enter comma separated values for skills"
                                    error = {errors.skills}/>
                                <TextFieldGroup 
                                    type="textarea" 
                                    name="bio" 
                                    id="bio" 
                                    placeholder="Enter Your BIo" 
                                    value = {this.state.bio} 
                                    onChange = {this.onChange} 
                                    error = {errors.bio}/>
                                <TextFieldGroup 
                                    type="text" 
                                    name="githubusername" 
                                    id="githubusername" 
                                    placeholder="Enter Your GITHUB Username" 
                                    value = {this.state.githubusername}
                                    onChange = {this.onChange} 
                                    error = {errors.githubusername}/>
                                <Button color="primary" block>Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    auth : PropTypes.object.isRequired,
    createProfile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(CreateProfile);