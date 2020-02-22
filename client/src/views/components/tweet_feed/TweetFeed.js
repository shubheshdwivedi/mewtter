import React, {Component} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {getRelativeTime, titleCase} from "../../../helpers/helpers";
import Hashtags from "react-highlight-hashtags";
import {FaCat} from "react-icons/all";

class TweetFeed extends Component {
    render() {
        const {tweets} = this.props;
        const feed = tweets.map((tweet,k) =>
            <Card key={k} border={'dark'} className={'mb-3 w-100'}>
                <Card.Body>
                    <Row>
                        <Col md={1} xs={2} >
                            <div className={'img'}>
                                <FaCat/>
                            </div>
                        </Col>

                        <Col md={11} xs={10} className={'px-4'}>
                            <Card.Title>{
                                titleCase(tweet.author.first_name+ " " + tweet.author.last_name)}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{"@"+tweet.author.username}</Card.Subtitle>
                        </Col>
                    </Row>

                    <Card.Text style={{fontWeight: 500}} className={'py-2'}>
                        <Hashtags>{tweet.content}</Hashtags>
                        <br/>
                        <small>{getRelativeTime(new Date(tweet.time).getTime())}</small>
                    </Card.Text>

                </Card.Body>
            </Card>
        );

        return (
            <div className={'py-4 w-100'}>
                {feed}
            </div>
        );
    }
}

export default TweetFeed;