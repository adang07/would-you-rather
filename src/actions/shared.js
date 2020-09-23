import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/question'


const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
	return async (dispatch) => {
    	const { users, questions } = await getInitialData()
		dispatch(receiveUsers(users))
		dispatch(receiveQuestions(questions))
    }
}