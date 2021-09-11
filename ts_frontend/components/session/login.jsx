import React from 'react';
import { Redirect } from 'react-router-dom';

import store from '../../store/store';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            successfulLogin: false
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

        this.props.loginUser({  
            username: this.state.username,
            password: this.state.password 
            }
        ).then( () => {
            const errors = this.props.errors;
            console.log(errors);
                
            const successfulLogin = Object.keys(errors).length == 0;
            if (successfulLogin){
                // redirect to page after login
                this.setState({ successfulLogin: true });
            }
            else {
                // handle errors
                Object.keys(errors).forEach(k => errors[k].forEach(v => console.log(k + " " + v)));
            }

            }
            );
    }


    render() {

        if (this.state.successfulLogin){
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
