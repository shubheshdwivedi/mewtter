import React, {Component} from "react";
import {Col, Container, Image, Nav, Row, Tab} from "react-bootstrap";
import authAction from "../../../redux/store/actions/auth/AuthAction";
import {connect} from "react-redux";
import './Landing.scss';
import {isLoggedIn, title} from "../../../helpers/helpers";
import Login from "../../components/login";
import SignUp from "../../components/sign_up"
import heroImage from './assets/hero.png';
import {toast} from "react-toastify";
import Home from "../home";
import Loader from 'react-loader-spinner'

class Landing extends Component {

    authenticate = (data, type) => {
        this.props.authenticate(data, type);
    };

    render() {
        const {user, isAuthorizing, error} = this.props;
        console.log(isAuthorizing)
        if (error)
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        if (isLoggedIn() && user)
            return <Home/>;

        return (
            <Container fluid style={{height: '100vh'}}>
                <Row className={'greeting-card h-100'}>
                    <Col md={6} sm={12} xs={12} className={'text-center px-5 py-5'}>
                        {title}
                        <Image src={heroImage} fluid/>
                    </Col>
                    <Col md={6} sm={12} xs={12} className={'px-5 py-5 white'}
                         style={{borderRadius: '0 0.5rem  0.5rem 0 ', color: '#31586b'}}>
                        {isAuthorizing ?
                            <Row className={'mb-3'}>
                                <Col md={2} xs={3}>
                                    <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                    />
                                </Col>
                                <Col md={8} xs={9} style={{lineHeight:3}}>
                                    Logging you in...
                                </Col>
                            </Row>
                            :
                            <Tab.Container id="left-tabs-example" defaultActiveKey="login">
                                <Row>
                                    <Nav variant={'pills'}>
                                        <Nav.Item className={'mr-3'}>
                                            <Nav.Link eventKey="login" style={{
                                                outline: 'none',
                                                fontWeight: 500
                                            }}>Sign in</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="signup" style={{
                                                outline: 'none',
                                                fontWeight: 500
                                            }}>Sign up</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Row>
                                <br/>
                                <Row>
                                    <Tab.Content className={'w-100'}>
                                        <Tab.Pane eventKey="login">
                                            <Login authenticate={this.authenticate}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="signup">
                                            <SignUp authenticate={this.authenticate}/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </Tab.Container>
                        }

                    </Col>

                </Row>

            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.DataReducer.AuthReducer.user,
        isAuthorizing: state.DataReducer.AuthReducer.isAuthorizing,
        error: state.DataReducer.AuthReducer.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (data, type) => dispatch(authAction(data, type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);