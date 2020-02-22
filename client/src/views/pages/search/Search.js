import React, {Component} from "react";
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import ProfileCard from "../../components/profile_card";
import TweetFeed from "../../components/tweet_feed";
import UserList from "../../components/user_list";
import addFollowAction from "../../../redux/store/actions/user/AddFollowAction";
import Searchbar from "../../components/searchbar/Searchbar";


class Search extends Component {

    addFollow = (data) => this.props.doFollow(data);

    render() {
        const {user, follow} = this.props;
        const {users, tweets} = this.props.search;
        let tweetCount = 0, usersCount = 0;
        if (tweets && users){
            tweetCount = tweets.length;
            usersCount = users.length;
        }
        const userResult = (Array.isArray(users) &&  users.length > 0) ?
            <UserList
                follow={this.addFollow}
                users={users}
                relations={this.props.follow}
                currentUser={this.props.user}
            />
            : <h6>No users found!</h6>;
        const tweetResult = (Array.isArray(tweets) && tweets.length > 0) ? <TweetFeed tweets={tweets}/>
            : <h6>No tweets found!</h6>;
        return (
            <Container fluid>
                <Header defKey={'/search'}/>
                <Row className={'py-4'}>
                    <Col md={3} className={'d-none d-md-block'}>
                        <ProfileCard user={user} follow={follow}/>
                    </Col>
                    <Col md={8}>
                        <Searchbar/>
                        <div className={'card px-4 py-3'} style={{background:'#f1f1f1'}}>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="tweets">
                            <Row>
                                <Nav variant={'pills'}>
                                    <Nav.Item className={'mr-2'}>
                                        <Nav.Link eventKey="tweets" style={{
                                            outline: 'none',
                                            fontWeight: 500
                                        }}>Tweets <strong>{tweetCount}</strong></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="users" style={{
                                            outline: 'none',
                                            fontWeight: 500
                                        }}>Users <strong>{usersCount}</strong></Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Row>
                            <hr/>
                            <Row className={'px-2 py-2'}>
                                <Tab.Content className={'w-100'}>
                                    <Tab.Pane eventKey="tweets">
                                        <Row className={'px-4'}>
                                            {tweetResult}
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="users">
                                        {userResult}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Tab.Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.DataReducer.AuthReducer.user,
        search: state.DataReducer.SearchReducer.search,
        follow: state.DataReducer.FollowReducer,
        error: state.DataReducer.SearchReducer.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        doFollow: (data) => dispatch(addFollowAction(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);