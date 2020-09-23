import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { resetAuthedUser } from '../actions/authedUser'

function NavBar(props) {
    console.log(props.user)
    const { user, dispatch } = props;
    const handleLogOut = () =>{
        dispatch(resetAuthedUser());
    }
    

    
    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Navbar.Brand as={Link} to='/'>Would you rather? </Navbar.Brand>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" exact>
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add">
                        New Question
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/leaderboard">
                        Leaderboard
                    </Nav.Link>
                    {user != null &&
                        <div className='padding'>
                            Logged in as: {user.name}
                        </div>
                    }
                    <Button
                        onClick={handleLogOut}
                        variant="link"
                        href="/"
                        className='padding'
                    >
                        Log Out
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

function mapStateToProps({ users, authedUser }) {
    return {
        user: users[authedUser]
    };
}

export default connect(mapStateToProps)(NavBar);