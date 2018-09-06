import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';
import Spinner from '../common/spinner';
import Link from 'react-router-dom/Link';
import ProfileActions from './profileAction';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteClick(e){
        console.log('clicked');
        this.props.deleteAccount();
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
            dashboard = (
                <div>
                    <p className="lead text-muted">Welcome <Link to={`profile/${profile.handle}`}>{user.name}</Link></p>
                     < ProfileActions />
                     {/* TODO : Experienece and Education */}
                     <div style={{marginBottom :"60px"}}></div>
                     <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}><i className="fa fa-trash"></i>
Delete My Account</button>
                </div>
                  
            )
        }else {
            dashboard = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
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
    getCurrentProfile : PropTypes.func.isRequired,
    deleteAccount : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);