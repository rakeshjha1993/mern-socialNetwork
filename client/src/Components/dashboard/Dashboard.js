import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/spinner';
import Link from 'react-router-dom/Link';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    
  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;

    let dashboard;

    if(profile == null || loading){
        dashboard = <Spinner/>
    }else {
        // check if user has profile
        if(Object.keys(profile).length > 0){
            dashboard = <h2>TODO : Profile</h2>
        }else {
            dashboard = (
                <div>
                    <p>You have not created a profile yet</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            );
        }
        
    }


    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    {dashboard}
                </div>
            </div>
        </div>   
      </div>
    )
  }
}

Dashboard.propTypes = {
    profile : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);