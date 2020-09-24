import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {handleSaveAnswer} from '../actions/question'
import {Redirect} from "react-router-dom";
import QuestionPollResults from './QuestionPollResults';

class QuestionPoll extends Component {
    state = {
        optionSelected: ''
    }

    handleSubmit =(id, e) => {
        const answer = this.state.optionSelected;
        const {dispatch} = this.props;

        e.preventDefault();
        if (answer !== ""){
            dispatch(handleSaveAnswer(id, answer))
        }

        console.log(this.props.users)
    }

    handleAnswer = (e) => {
        const answer = e.target.value;
        this.setState(() => ({ optionSelected: answer}))
    }

    render() {
        const {  author, id, pathNotFound, optionOne, optionTwo  } = this.props

        if(pathNotFound){
            return (<Redirect to="/404"/>)
        }

        return (
            <div>
            {this.props.hasAnswer ? 
                <QuestionPollResults id={id}/>
                : 
            <div className='centeredcontent'>
            <Card style={{ width: '20rem' }} className='row justify-content-center'>
                <Card.Img variant="top" src={author.avatarURL} alt={`Avatar of ${author.name}`} className='avatar' size="80" />
                <Card.Header>
                    {author.name} asks: <br /> <strong>Would You Rather...</strong>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(e) => this.handleSubmit(id, e)}
						ref={(f) => (this.form = f)}>
                        <Form.Check
                            custom
                            type="radio"
                            id="option1"
                            label={optionOne.text}
                            value="optionOne"
                            name="answer"
                            onChange={this.handleAnswer}
                        />
                        <Form.Check
                            custom
                            type="radio"
                            id="option2"
                            label={optionTwo.text}
                            value="optionTwo"
                            name="answer"
                            onChange={this.handleAnswer}
                        />
                        <div className='centeredcontent'>
                        <Button type="submit" variant="outline-dark">
                            Vote
                        </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            </div>
            }
            </div>
        ); 
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const id = props.match.params.id;
    const question = questions[id];
    let pathNotFound = question ? false : true;
    const answers = users[authedUser].answers;
    return {
        id,
        question,
        author: question ? users[question.author] : null,
        pathNotFound,
        optionOne : question ? question.optionOne : null,
        optionTwo : question ? question.optionTwo : null,
        hasAnswer: answers.hasOwnProperty(id) ? answers[id] : null
    } 
}

export default connect(mapStateToProps)(QuestionPoll);