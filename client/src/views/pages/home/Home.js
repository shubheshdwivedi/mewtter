import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import ProfileCard from "../../components/profile_card";
import TweetBox from "../../components/tweet_box";
import postTweetAction from "../../../redux/store/actions/tweets/PostTweetAction";
import fetchTweetAction from "../../../redux/store/actions/tweets/FetchTweetAction";
import TweetFeed from "../../components/tweet_feed";
import fetchFollowAction from "../../../redux/store/actions/user/FetchFollowAction";
import {toast} from "react-toastify";
import Loader from "react-loader-spinner";

class Home extends Component {

    tweet = (tweetText) => {
        if (tweetText === '')
            toast.error("Empty tweet!", {
                position: toast.POSITION.TOP_RIGHT
            });
        else {
            const topics = tweetText.match(/#[a-z]+/gi);
            const tweetObject = {
                content: tweetText,
                topics: topics,
                author: this.props.user._id
            };
            this.props.postTweet(tweetObject);
        }
    };

    componentDidMount(): void {
        this.props.fetchTweets(this.props.user._id);
        this.props.fetchRelations(this.props.user._id);
    }

    render() {
        const {user, tweets, follow, isTweeting, isFetching} = this.props;
        const error = this.props.error;
        if (error)
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        return (
            <Container fluid>
                <Header defKey='/'/>
                <Row className={'py-4'}>
                    <Col md={3} className={'mb-3'}>
                        <ProfileCard user={user} follow={follow}/>
                    </Col>
                    <Col md={8} className={'px-3'}>
                        {
                            isTweeting ?
                                <Row className={'mb-3'}>
                                    <Col md={1} xs={3}>
                                        <Loader
                                            type="Puff"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    </Col>
                                    <Col md={8} xs={9} style={{lineHeight: 3}}>
                                        Pawblishing your meweet...
                                    </Col>
                                </Row>

                                :
                                <TweetBox sendTweet={this.tweet}/>
                        }
                        {
                            isFetching ?
                                <Row className={'mt-2'}>
                                    <Col md={1} xs={2}>
                                        <Loader
                                            type="Puff"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    </Col>
                                    <Col md={8} xs={8} style={{lineHeight: 3}}>
                                        Getting your meweets...
                                    </Col>
                                </Row>

                                :
                                <TweetFeed tweets={tweets}/>
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
        isTweeting: state.DataReducer.TweetReducer.isTweeting,
        isFetching: state.DataReducer.TweetReducer.isFetching,
        error: state.DataReducer.TweetReducer.error,
        tweets: state.DataReducer.TweetReducer.tweets,
        follow: state.DataReducer.FollowReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postTweet: (tweet) => dispatch(postTweetAction(tweet)),
        fetchTweets: (id) => dispatch(fetchTweetAction(id)),
        fetchRelations: (id) => dispatch(fetchFollowAction(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);