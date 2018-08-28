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

class NavBar extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
          }
    }
    logoutClick(){
        this.props.logoutUser();
        console.log(this.props);
    }

    render () {
        const {auth} = this.props;
        return (
            <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Social Network</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                   {auth.isAuthenticated && (<DropdownItem onClick={this.logoutClick}> {auth.user.name}</DropdownItem>)}
                </DropdownMenu>
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
});



export default connect(mapStateToProps,{logoutUser})(NavBar);