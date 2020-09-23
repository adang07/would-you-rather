import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

class Question extends Component {
    render() {
        const { question, pathNotFound } = this.props
        const { name, id, avatar, optionOne, hasVoted } = question;
        const redirectLink = hasVoted ? `/question/${id}/results` : `/question/${id}`;
    
        if(pathNotFound){
            return (<Redirect to="/404"/>)
        }

        return (
            <div className='centeredcontent'>
                <Card style={{ width: '20rem' }} >
                    <Card.Img variant="top" src={avatar} alt={`Avatar of ${name}`} className='avatar' size="80" />
                    <Card.Header>
                        {name} asks: <strong>Would You Rather</strong>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {optionOne.text.slice(0, 50)}...?
                    </Card.Text>
                        <Link to={redirectLink} className='centeredcontent'>
                            <Button variant="outline-dark">View Poll</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const pathNotFound = question ? false : true;

    return {
        id,
        authedUser,
        question: formatQuestion(question, users[question.author], authedUser),
        pathNotFound
    }
}

export default connect(mapStateToProps)(Question)