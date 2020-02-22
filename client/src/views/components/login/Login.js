import React, {Component} from "react";
import {Form} from "react-bootstrap";
import {toast} from "react-toastify";

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = (e) => {
        let change = {[e.target.name]: e.target.value};
        this.setState(change);
    };

    login = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        const validation = !username || !password;
        if(validation)
            toast.error("Please fill all the fields", {
                position: toast.POSITION.TOP_RIGHT
            });
        else
            this.props.authenticate({username, password},'login');
    };

    render() {
        return (
            <div className={'mt-2'}>
                <h1 style={{fontWeight: '600'}}>Welcome, back</h1>
                <h4>Sign in to continue</h4>
                <br/>
                <form onSubmit={this.login} className={'mt-3'}>
                    <Form.Control className={'mt-3'} name="username"
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.username}
                                  type="text" placeholder="Username" />

                    <Form.Control className={'mt-3'} name="password"
                                  onChange={this.handleChange.bind(this)}
                                  value={this.state.password}
                                  type="password" placeholder="Password" />
                    <br/>
                    <button className="button" onClick={this.login} type={'submit'} style={{outline: 'none'}}>Login</button>

                </form>
            </div>
        );
    }
}

export default Login;