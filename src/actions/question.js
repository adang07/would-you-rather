import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function saveAnswer({ authedUser, qid, answer }) {
	return {
		type: SAVE_ANSWER,
		qid,
		answer,
		authedUser
	};
}

function addQuestion(question){
	return{
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion(optionOneText, optionTwoText){
	return (dispatch, getState) => {
		const {authedUser} = getState();
		dispatch(showLoading());

		return saveQuestion({
			optionOneText: optionOneText,
			optionTwoText: optionTwoText,
			author: authedUser
		})
		.then((question) => dispatch(addQuestion(question)))
		.then(() => dispatch(hideLoading()));
	}
}

export function handleSaveAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState()

		saveQuestionAnswer({
			authedUser,
			qid: qid,
			answer: answer
		})
			.then(() => {
				dispatch(saveAnswer({
					authedUser,
					qid,
					answer
				}));
			});
	}

}