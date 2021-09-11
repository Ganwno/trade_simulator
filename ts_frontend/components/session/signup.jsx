import React from 'react';
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInput(type){
        return (e) => {
            this.setState({[type]: e.target.value });
        };
    }


    handleSubmit(e) {
        // override default action from the form
        e.preventDefault;

        this.props.createNewUser(this.state)
            .then( // redirect to page after login
                    this.setState({ isLoggedIn: true })
                );
    }


    render() {
        
        if (this.state.isLoggedIn){
            return <Redirect to="/homepage" />
        }

        return (
            <div className="signup-form">
                <h2>Sign Up</h2>
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
                    >Sign up!</button>

                </form>
            </div>
        );
    }
};

export default Signup;
