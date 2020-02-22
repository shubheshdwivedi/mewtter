import React, {Component} from "react";
import {Form, Row} from "react-bootstrap";
import {toast} from "react-toastify";

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
    };

    handleChange = (e) => {
        let change = {[e.target.name]: e.target.value};
        this.setState(change);
    };

    validateFields(field, string) {
        let re;
        switch (field) {
            case "email":
                re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(string).toLowerCase());
            case "username":
                re = /^[a-z0-9_-]{3,16}$/;
                return re.test(String(string).toLowerCase());
        }
    }

    validator = () => {
        const {username, password, email, first_name, last_name} = this.state;
        const validation = (username==='')
            || (password==='')
            || (email==='')
            || (first_name==='')
            || (last_name==='');
        const emailValidation = this.validateFields("email", email);
        const usernameValidation = this.validateFields("username", username);
        if (validation)
            toast.error("Please fill all the fields", {
                position: toast.POSITION.TOP_RIGHT
            });
        else {
            if (!emailValidation)
                toast.error("Enter valid email!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            if (!usernameValidation)
                toast.error("Enter Valid username", {
                    position: toast.POSITION.TOP_RIGHT
                });
        }
        return (!validation && emailValidation && usernameValidation);

    };

    signup = (e) => {
        e.preventDefault();
        const {username, password, email, first_name, last_name} = this.state;
        const noError = this.validator();
        if (noError)
            this.props.authenticate({
                username,
                password,
                email,
                first_name,
                last_name
            }, 'signup');
    };

    render() {
        return (
            <div className={'mt-3'}>
                <h1 style={{fontWeight: '600'}}>Hello there,</h1>
                <h4>Sign up to continue</h4>
                <br/>
                <form onSubmit={this.login} className={'mt-3'}>
                    <Row style={{margin: 0}} className={'flex-nowrap'}>
                        <Form.Control placeholder="First name" name="first_name"
                                      required
                                      className={'w-100 mr-1'}
                                      onChange={this.handleChange.bind(this)}
                                      value={this.state.first_name}/>
                        <Form.Control placeholder="Last name" name="last_name"
                                      className={'w-100 '}
                                      onChange={this.handleChange.bind(this)}
                                      value={this.state.last_name}/>
                    </Row>

                    <Form.Control placeholder="Username" name="username"
                                  className={'mt-3'}
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.username}/>

                    <Form.Control placeholder="Email" name="email"
                                  className={'mt-3'}
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.email}/>

                    <Form.Control placeholder="Password" name="password"
                                  className={'mt-3'}
                                  onChange={this.handleChange.bind(this)}
                                  type={'password'}
                                  value={this.state.password}/>
                    <br/>
                    <button className="button" onClick={this.signup} type={'submit'} style={{outline: 'none'}}>Sign up
                    </button>
                </form>
            </div>
        );
    }
}

export default SignUp;