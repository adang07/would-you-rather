import includes from "core-js/fn/array/includes";

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  export function formatQuestion(question, author, authedUser) {
      const {id, optionOne, optionTwo, timestamp} = question;
      const {name, avatarURL} = author;
  
      return {
          name,
          id,
          timestamp,
          avatar: avatarURL,
          optionOne,
          optionTwo,
          hasVoted: includes(optionOne.votes, authedUser) || includes(optionTwo.votes, authedUser)
      }
  }