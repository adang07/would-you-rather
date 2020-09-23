import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render() {
        const { users } = this.props

        console.log(users)
        return (
            <div >
                {users.map((user, index) => (
                    <div key={index} className='centeredcontent' >
                        <Card style={{ width: '20rem' }} >
                            <Card.Img variant="top" src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar' size="80" />
                            <Card.Title>
                                <strong>{user.name}</strong>
                            </Card.Title>
                            <Card.Body>
                                <Card.Text>
                                    Answered Questions: {Object.keys(user.answers).length}
                                </Card.Text>
                                <Card.Text>
                                    Created Questions: {Object.keys(user.questions).length}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Score: {Object.keys(user.answers).length + Object.keys(user.questions).length}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const userScore = user => Object.keys(user.answers).length + user.questions.length;
    return {
        users: Object.values(users).sort((a, b) => userScore(b) - userScore(a)),
    }
}

export default connect(mapStateToProps)(Leaderboard)