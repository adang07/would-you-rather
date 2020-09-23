import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tabs } from 'react-tabs';
import { TabList } from 'react-tabs';
import { Tab } from 'react-tabs';
import { TabPanel } from 'react-tabs';

class Dashboard extends Component {

	state = {
		activeTab: '1'
	}

	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		return (
			<div className='centeredcontent'>
				<Tabs className=''>
					<TabList className='centeredcontent'> 
						<Tab>Unanswered Questions</Tab>
						<Tab>Answered Questions</Tab>
					</TabList>
					<TabPanel>
						<ul className='questions-list '>
							{this.props.unansweredQuestions.map((id) => (
								<div className="centered" key={id}>
									<Question id={id}/>
								</div>
							))}
						</ul>
					</TabPanel>
					<TabPanel>
						<ul className='questions-list'>
							{this.props.answeredQuestions.map((id) => (
								<div className="centered" key={id} >
								<Question id={id} />
							</div>
							))}
						</ul>
					</TabPanel>
				</Tabs>
			</div>
		)
	}
}

function mapStateToProps({ questions, authedUser, users }) {
	const answeredQuestions = Object.keys(questions)
	.filter((id) => users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	return {
		unansweredQuestions: Object.keys(questions).filter((id) => !users[authedUser].answers.hasOwnProperty(id))
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
		answeredQuestions
	}
}

export default connect(mapStateToProps)(Dashboard)