import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {Link, withRouter} from 'react-router-dom';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
        this.userLogoutClick = this.userLogoutClick.bind(this);
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
            this.setState({errors : nextProps.errors});
        }
    }

    userLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    }

    render () {

            const {isAuthenticated, user} =  this.props.auth;
            console.log(isAuthenticated);
            const authLinks = (
                <DropdownMenu right>    
                    <DropdownItem>
                    <Link to="/user/profile">{user && user.name}</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <a onClick={this.userLogoutClick}> Logout </a>
                    </DropdownItem>
                </DropdownMenu>);
            
            const guestLinks = (
                <DropdownMenu right>    
                    <DropdownItem>
                        <Link to="/login">Login</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to="/register">SignUp</Link>
                    </DropdownItem>
                </DropdownMenu>);


        return (
            <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Social Network</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                <NavLink href="/components/">Home</NavLink>
                </NavItem>
                <NavItem>
                <NavLink to="/about-us">About Us</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                </DropdownToggle>
                    { isAuthenticated ? authLinks : guestLinks}
                </UncontrolledDropdown>
            </Nav>
            </Collapse>
        </Navbar>
        
      );
    }
}

NavBar.proptypes = {
    auth : PropTypes.object.isRequired,
    logoutUser : PropTypes.func.isRequired
}   

const mapStateToProps = (state) => ({
    auth : state.auth
})



export default connect(mapStateToProps,{logoutUser})(withRouter(NavBar));