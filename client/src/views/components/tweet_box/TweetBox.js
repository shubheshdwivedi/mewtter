import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import "./TweetBox.scss";
import {FaCat} from "react-icons/all";

class TweetBox extends Component {
    state = {
        tweet: '',
        charCount: 243
    };

    handleChange = (e) => {
        let change = {[e.target.name]: e.target.value};
        let charCount = 243 - e.target.value.length;
        if (charCount >= 0)
            this.setState({
                ...this.state,
                ...change,
                charCount,
            });
    };

    tweet = (e) => {
        e.preventDefault();
        this.setState({
            tweet: '',
            charCount: 243
        });
        this.props.sendTweet(this.state.tweet);
    };

    render() {
        return (
            <div className={'px-3 py-3 card'}>
                <div>
                    <form onSubmit={this.tweet}>
                        <Row className={'px-3'}>
                            <Col md={1} xs={2} style={{padding: '0'}}>
                                <div className={'img'}>
                                    <FaCat/>
                                </div>
                            </Col>
                            <Col md={11} xs={9}>
                        <textarea rows={5} className={'tweet-box w-100'}
                                  name={'tweet'}
                                  placeholder={'Share your thoughts!'}
                                  value={this.state.tweet}
                                  onChange={this.handleChange}
                        />
                            </Col>
                        </Row>
                        <Row className={'px-3 justify-content-end'}>
                            <h6 className={'px-3 mt-2 counter-tabs'}>
                                {this.state.charCount}
                            </h6>
                            <button className="button"
                                    onClick={this.tweet}
                                    type={'submit'}
                                    style={{outline: 'none'}}>
                                Pawblish
                            </button>
                        </Row>
                    </form>
                </div>
            </div>
        );
    }
}

export default TweetBox;