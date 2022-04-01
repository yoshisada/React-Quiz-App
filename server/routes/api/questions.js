/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();

// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');

// Question Data
const questions = require('../../models/questions-data.json');
const Questions = shuffleArray(questions)
const questionsCopy = JSON.parse(JSON.stringify(Questions));
var numberOfQuestions = 0;

/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */
router.get('/', (req, res) => {
  questionsCopy.map((q) => {
    delete q.answer
  })
  res.json(questionsCopy);
})

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  numberOfQuestions = Object.keys(Questions).length

  if(numberOfQuestions < 1){
    res.status(500).send({
      error: 'No questions'
    })
  }else{
    res.send({
      count: numberOfQuestions
    })
  }
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {
  // Remove the lines below and write your implementation
  const found = Questions.some(q => q.id === (req.params.qId))
  if (found){
    res.send(Questions.filter(q => q.id === (req.params.qId)))
  }else{
    res.status(400).json({msg: `No question with id of: ${req.params.id}`})
  }
  res.send(found)
})


/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
router.post('/result', (req, res) => {

  let correctAns = 0
  let userAns = req.body

  for (let i = 0; i < Questions.length; i++) {
    let id = Questions[i]['id']

    if (Questions[i]['answer'] === userAns[id]) {
      correctAns += 1;
    }
  }

  let results = {
    summary: null,
    score: correctAns,
    total: numberOfQuestions
  }

  if (correctAns > (numberOfQuestions / 2)) {
    results.summary = 'passed!'
  } else {
    results.summary = 'failed'
  }

  res.json(results);

})


module.exports = router;
