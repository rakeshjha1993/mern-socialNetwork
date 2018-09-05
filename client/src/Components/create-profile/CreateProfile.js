import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textfieldgroup';
import TextAreaFieldGroup from '../common/textareafield';
import SelectListGroup from '../common/selectlistgroup';
import InputGroup from '../common/inputgroup';
import {createProfile }from '../../actions/profileActions';
import {Form, Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';


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
            instagram : '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDisplaySocialInputs = this.onDisplaySocialInputs.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
          this.setState({errors : nextProps.errors});
        }
    } 

    onChange (event) {
        this.setState({[event.target.name] : event.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const profileData = {
            handle : this.state.handle,
            company : this.state.company,
            website :this.state.website,
            location : this.state.location,
            skills : this.state.skills,
            status : this.state.status,
            bio : this.state.bio,
            githubusername : this.state.githubusername,
            facebook : this.state.facebook,
            youtube : this.state.youtube,
            linkedin: this.state.linkedin,
            instagram : this.state.instagram,

        };
        this.props.createProfile(profileData, this.props.history);
    }
    onDisplaySocialInputs(e){
        this.setState(prevState => ({
            displaySocialInputs : !prevState.displaySocialInputs
        }))
    }

  render() {
    const {errors,displaySocialInputs} = this.state;

    //select option for status
    const options = [
        {label : '*select Professional status', value : 0},
        {label : 'Developer', value : 'Developer'},
        {label : 'Junior Developer', value : 'Junior Developer'},
        {label : 'Senior Developer', value : 'Senior Developer'},
        {label : 'Manager', value : 'Manager'},
        {label : 'Student or Learning', value : 'Student or Learning'},
        {label : 'Instructor or Teacher', value : 'Instructor or Teacher'},
        {label : 'Intern', value : 'Intern'},
        {label : 'Other', value : 'Other'},
    ];

    const socialInputGroups = ( <div>
                                <InputGroup 
                                    name="youtube" 
                                    id="youtube" 
                                    placeholder="Enter Your Youtube Profile" 
                                    value = {this.state.youtube}
                                    onChange = {this.onChange} 
                                    error = {errors.youtube}
                                    icon = "fa fa-youtube"/>
                                <InputGroup 
                                    name="facebook" 
                                    id="facebook" 
                                    placeholder="Enter Your Facebook Profile" 
                                    value = {this.state.facebook}
                                    onChange = {this.onChange} 
                                    error = {errors.facebook}
                                    icon = "fa fa-facebook"/>
                                <InputGroup 
                                    name="instagram" 
                                    id="instagram" 
                                    placeholder="Enter Your Instagram" 
                                    value = {this.state.instagram}
                                    onChange = {this.onChange} 
                                    error = {errors.instagram}
                                    icon = "fa fa-instagram"/>    
                                <InputGroup 
                                    name="linkedin" 
                                    id="linikedin" 
                                    placeholder="Enter Your Linkedin" 
                                    value = {this.state.linkedin}
                                    onChange = {this.onChange} 
                                    error = {errors.linkedin}
                                    icon = "fa fa-linkedin"/> </div> );

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
                                    error = {errors.handle}
                                    info = "Enter Handle for profile URL"/>
                                <SelectListGroup 
                                    placeholder="status"
                                    name="status" 
                                    id="status" 
                                    options = {options}
                                    value = {this.state.status} 
                                    onChange = {this.onChange} 
                                    error = {errors.status}
                                    info = "Enter your profieciency with code"/>    
                                <TextFieldGroup 
                                    type="text" 
                                    name="company" 
                                    id="company" 
                                    placeholder="Enter Your Company Name" 
                                    value = {this.state.company} 
                                    onChange = {this.onChange} 
                                    error = {errors.company}
                                    info/>
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
                                    name="skills" 
                                    id="skills" 
                                    placeholder="Enter Your Skills" 
                                    value = {this.state.skills} 
                                    onChange = {this.onChange}
                                    info = "enter comma separated values for skills"
                                    error = {errors.skills}/>
                                <TextAreaFieldGroup 
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

                                <div className="mb-3">
                                <Button color="btn btn-outline-secondary" onClick={this.onDisplaySocialInputs}>Add Social Network</Button>
                                </div>
                                {displaySocialInputs && socialInputGroups}
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

CreateProfile.propTypes = {
    auth : PropTypes.object.isRequired,
    createProfile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));