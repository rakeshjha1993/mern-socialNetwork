import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }
    
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

Dashboard.propTypes = {
    profile : PropTypes.object.isRequired,
    loading : PropTypes.object.isRequired,
    getCurrentProfile : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile : state.profile,
    loading : state.loading
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);