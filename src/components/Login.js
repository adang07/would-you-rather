import React, { Component } from 'react'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component{
    state={
        userID:''
    }
    handleSelectChange = (e)=>{
        const userId = e.target.value
        this.setState({
            userID: userId
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        

        this.state.userID ? this.props.authenticateUser(this.state.userID ) : alert("Select a user to log in");
    }

    render(){

        return(
            <div >
                <h1 className='centeredcontent'>Welcome to the Would You Rather App</h1>
                <div className='centeredcontent'>
                <Card style={{ width: '20rem' }}>
                    <Card.Header>
                        <strong>Sign In</strong>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit} ref={(id) => (this.userID = id)}>
                            <Form.Control
                                as='select'
                                onChange={this.handleSelectChange}
                                >
                               <option value=''>
                                    Select User
                               </option>
                               {
                                   Object.keys(this.props.users).map(id => 
                                    <option value={id} key={id}>{this.props.users[id].name}</option>
                                         )
                               }
                            </Form.Control>
                            <div className='centeredcontent'>
                        <Button type="submit" variant="outline-dark">
                            Submit
                        </Button>
                        </div>
                        </Form>
                    </Card.Body>
                </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return { users };
}

function mapDispatchToProps(dispatch) {
    return {
        authenticateUser: (id) => { dispatch(setAuthedUser(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);