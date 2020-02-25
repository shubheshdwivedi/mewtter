import {title} from "../../../helpers/helpers";
import {Nav, Navbar} from "react-bootstrap";
import React from "react";
import "./Header.scss"
import {connect} from "react-redux";
import logoutAction from "../../../redux/store/actions/auth/LogoutAction";

const Header = (props) =>
    <Navbar expand="lg" className={'header'} sticky={'top'}>
        <Navbar.Brand href="/" className={'mr-5'}>{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" defaultActiveKey={props.defKey}>
                <Nav.Item className={'px-2 py-2'}>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item  className={'px-2 py-2'}>
                    <Nav.Link href="/search">Search</Nav.Link>
                </Nav.Item>
                <Nav.Item  className={'px-2 py-2'}>
                    <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>;

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutAction())
    }
};
export default connect(null,mapDispatchToProps)(Header);