import React from 'react';

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };

        this.logout = this.props.logoutUser.bind(this);
    }

    render() {

        this.logout();

        return (
            <div className="logout-page">
                You have been logged out.
            </div>
        );
    }

}

export default Logout;
