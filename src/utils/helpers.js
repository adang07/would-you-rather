import includes from "core-js/fn/array/includes";
  
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