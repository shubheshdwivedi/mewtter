import React, {Component} from "react";
import {Button} from "react-bootstrap";
import "./NotFound.scss"

class NotFound extends Component{
    render() {
        return (
            <div className="error-page">
                <div className="jumbotron">
                    <h1><strong>Well this is embarrassing!</strong></h1>
                    <br/>
                    <h3><q>Not until we are lost do we begin
                        to understand ourselves.</q></h3>
                    <h5>~ Henry David Thoreau</h5>
                </div>
                <a href="/">
                    <Button variant={'primary'} className={'go-home'}>
                        Go Home
                    </Button>
                </a>
            </div>
        );
    }
}
export default NotFound;