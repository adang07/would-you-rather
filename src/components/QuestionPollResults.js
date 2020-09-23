import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';

class QuestionPollResults extends Component {
    render() {
        const { question, author, authedUser } = this.props
        const { optionOne, optionTwo } = question;

        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const optionOnePercent = Math.round((optionOne.votes.length / totalVotes) * 100);
        const optionTwoPercent = Math.round((optionTwo.votes.length / totalVotes) * 100);

        return (
            <div className='centeredcontent'>
            <Card style={{ width: '20rem' }} className='row justify-content-center'>
                <Card.Img variant="top" src={author.avatarURL} alt={`Avatar of ${author.name}`} className='avatar' size="80" />
                <Card.Header>
                    Asked by {author.name}
                </Card.Header>
                <Card.Body>
                    <strong>Results:</strong>
                    <ul>
                        <li>
                            {optionOne.text}
                            {optionOne.votes.includes(authedUser) ? (
                                <span className="text-danger ml-2 "><b>
                                 &lt;- Your choice
                                </b></span>) : null }
                        </li>
                    </ul>
                    <ProgressBar
                        now={optionOnePercent}
                        label={`${optionOnePercent}%`}
                        striped variant="info"
                    />
                    <ul>
                        <li>
                            {optionTwo.text}
                            {optionTwo.votes.includes(authedUser) ? (
                                <span className="text-danger ml-2">
                                    <b>
                                 &lt;- Your choice
                                </b></span>) : null }
                        </li>
                    </ul>
                    <ProgressBar
                        now={optionTwoPercent}
                        label={`${optionTwoPercent}%`}
                        striped variant="info"
                    />
                </Card.Body>
            </Card>
            </div>
        )
    }
}


function mapStateToProps({ questions, users, authedUser }, props) {
    const id = props.match.params.id
    const question = questions[id];

    return {
        id,
        question,
        author: question ? users[question.author] : null,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionPollResults);