import React, {Component} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import searchAction from "../../../redux/store/actions/search/SearchAction";
import {FiSearch} from "react-icons/all";
import {toast} from "react-toastify";

class Searchbar extends Component {
    state = {
        query: '',
    };

    handleChange = (e) => {
        let change = {[e.target.name]: e.target.value};
        this.setState(change);
    };

    search = (e) => {
        e.preventDefault();
        if(this.state.query === '')
            toast.error("Empty query!", {
                position: toast.POSITION.TOP_RIGHT
            });
        else
            this.props.search({query: this.state.query});
    };

    render() {
        const error = this.props.error;
        if (error)
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        return (
            <div className={' mb-3'}>
                <form onSubmit={this.search}>
                    <Row className={'px-3'}>
                        <Col md={10} xs={10}>
                    <Form.Control name="query"
                                  style={{background: '#ffffff'}}
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.query}
                                  type="text" placeholder="Search" />
                        </Col>
                        <Col md={2} xs={2}>
                    <button className="button" onClick={this.login} type={'submit'}
                            style={{outline: 'none', padding: '0.4rem 1rem'}}><FiSearch/></button>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.DataReducer.SearchReducer.error
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        search: (query) => dispatch(searchAction(query))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);