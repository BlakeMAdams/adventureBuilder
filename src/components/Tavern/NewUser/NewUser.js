// Displays user name input the first time a user logs in
// Used by Tavern Component
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser, updateUser } from '../../../ducks/reducer';


class NewUser extends Component {

    constructor() {
        super();

        this.state = {

            username: ''

        }
        this.usernameChange = this.usernameChange.bind(this);
        this.usernameClick = this.usernameClick.bind(this);
    }

    usernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }
    usernameClick(username) {
        this.props.updateUser(username)
            
        
    }

    render() {
        return (
            <div className="new-user"> {console.log('state:', this.props.state)}
                { this.props.username ? <h3>Welcome {this.props.username}</h3> : (<div>
                    <h3>Set Your Author Name:</h3>
                    <p><input type="text" onChange={(e) => this.usernameChange(e)}  placeholder="Author Name" /></p>
                    <a><button className="btn" onClick={()=>this.usernameClick(this.state.username)} >Save</button></a>

                    {this.props.username}
                </div>)
                }
            </div>
        );
    }

       
}

function mapStateToProps(state) {
    return {
        username: state.user.user_name,
        state: state
    }
}

export default connect(mapStateToProps, { getUser, updateUser })(NewUser)