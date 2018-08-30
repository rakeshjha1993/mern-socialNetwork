import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/spinner';
import {Link} from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    
    render() {

        const {user} = this.props.auth;
        const {profile,loading} = this.props.profile;

        let dashboardcontent ;

        if(profile==null || loading){
            dashboardcontent = <Spinner/>;
        }else{
            if(Object.keys(profile).length > 0){
                dashboardcontent= <h2>TODO: PROFILE DISPLAY</h2>
            }else {
                dashboardcontent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not created any profile yet</p>
                        <Link to="create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                );
            }
            
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="display-4">Dashboard</h4>
                            {dashboardcontent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Dashboard.propTypes = {
    profile : PropTypes.object.isRequired,
    getCurrentProfile : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile,
    auth : state.auth
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);