import React, {Component} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {titleCase} from "../../../helpers/helpers";
import addFollowAction from "../../../redux/store/actions/user/AddFollowAction";
import {connect} from "react-redux";
import {FaCat} from "react-icons/all";

class UserList extends Component {

    addRelation = (e, toFollow, user, op) => this.props.follow({toFollow, user, op});

    render() {
        const {users, currentUser, followData} = this.props;
        const userList = users.map((user, k) => {
            let buttonActive = true;
            if (user.username === currentUser.username)
                buttonActive = false;
            const buttonText = followData.following.includes(user._id) ? 'unfollow' : 'follow';
            return <Card key={k}>
                <Card.Body>
                    <Row>
                        <Col md={9} xs={12}>
                            <Row>
                                <Col md={1} xs={2}>
                                    <div className={'img'}>
                                        <FaCat/>
                                    </div>
                                </Col>
                                <Col md={11} xs={10} className={'px-4'}>
                                    <Card.Title>{
                                        titleCase(user.first_name + " " + user.last_name)}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{"@" + user.username}</Card.Subtitle>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3} xs={12}>
                            <Card.Text>
                                {buttonActive && <button className={"button mt-2"}
                                                         onClick={(e) =>
                                                             this.addRelation(e, user._id, currentUser._id, buttonText)}
                                                         style={{outline: 'none', padding: '0.3rem 0.7rem'}}>
                                    {buttonText}
                                </button>}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        });
        return (
            <div>
                {userList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.DataReducer.AuthReducer.user,
        followData: state.DataReducer.FollowReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (data) => dispatch(addFollowAction(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);