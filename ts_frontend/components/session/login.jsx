import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }


    handleSubmit(e) {
        // override default action from the form
        e.preventDefault;

        this.props.loginUser(this.state)
            .then( // redirect to page after login
                this.setState({ isLoggedIn: true })
            );
    }


    render() {

        if (this.state.isLoggedIn){
            return <Redirect to="/homepage" />
        }

        return (
            <div className="login-form">
                <h2>Log In</h2>
                <form>

                    <label>Username:
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInput('username')}
                        />
                    </label>
                    <br></br>
                    <label>Password:
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInput('password')}
                        />
                    </label>
                    <br></br>
                    <button
                        onClick={this.handleSubmit}
                    >Log in</button>

                </form>
            </div>
        );
    }
}

export default Login;
