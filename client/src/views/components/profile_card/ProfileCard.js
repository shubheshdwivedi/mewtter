import React, {Component} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {titleCase} from "../../../helpers/helpers";
import {FaCat} from "react-icons/all";

class ProfileCard extends Component {
    render() {
        const {user, follow} = this.props;
        return (
            <div>
                <Card>
                    <Row className={'pl-3 py-3'}>
                        <Col md={2} xs={2}>
                            <div className={'img'}>
                                <FaCat/>
                            </div>
                        </Col>
                        <Col md={10} xs={10} className={'px-4'}>
                            <Card.Title>{titleCase(user.first_name + " " + user.last_name)}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{"@"+user.username}</Card.Subtitle>
                        </Col>
                    </Row>
                    <Row className={'px-2 mt-2 mb-3 justify-content-center'}>
                        <div className={'counter-tabs mr-2'}>followers: {follow.followers.length} </div>
                        <div className={'counter-tabs'}>following: {follow.following.length}</div>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default ProfileCard;