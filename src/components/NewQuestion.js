import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/question'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }

    handleChange = (e) => {
        const name = e.target.name
        const text = e.target.value
        this.setState({
            [name]: text
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOneText, optionTwoText));

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        }))
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/' />;
        }

        return (
            <div className='centeredcontent'>
                <Card style={{ width: '20rem' }} >
                    <Card.Header>
                        <strong>Create New Question</strong>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Complete the question: <br />
                            <strong>Would you rather...</strong>
                        </Card.Text>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group widths='equal' controlId="control1" >
                                <div className='row centeredcontent'>
                                    <Form.Control
                                        type="text"
                                        name="optionOneText"
                                        value={this.state.optionOneText}
                                        onChange={this.handleChange}
                                        placeholder="Enter option one text here... "
                                    />
                                </div>
                                <h3 className='centeredcontent'>
                                    <small> OR </small>
                                </h3>
                                <div className='row centeredcontent'>
                                    <Form.Control
                                        type="text"
                                        name="optionTwoText"
                                        value={this.state.optionTwoText}
                                        onChange={this.handleChange}
                                        placeholder="Enter option two text here... "
                                    />
                                </div>
                            </Form.Group>
                            <div className='row centeredcontent'>
                                <Button variant="outline-dark" type='submit' disabled={this.state.optionOneText === '' || this.state.optionTwoText === ''} >
                                    Submit
                            </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default connect()(NewQuestion);