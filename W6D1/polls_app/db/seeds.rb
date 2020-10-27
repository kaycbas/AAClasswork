# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

usernames = ['Luke', "D'Artagnan", 'Gandalf']
titles = ['title 1', 'title 2']
text = ['text 1', 'text 2']
choices = ['choice 1', 'choice 2']

# create two users
User.create(username: usernames.first)
User.create(username: usernames.last)

# create two polls
Poll.create(title: titles.sample, author_id: 1)
Poll.create(title: titles.sample, author_id: 2)

# create questions
4.times { Question.create(text: text.sample, poll_id: 1) }
4.times { Question.create(text: text.sample, poll_id: 2) }

# create answer choices
8.times do |i|
    3.times { AnswerChoice.create(text: text.sample, question_id: i+1) }
end

# create responses
6.times { Response.create(respondent_id: 1, answer_choice_id: rand(13..24)) }
6.times { Response.create(respondent_id: 2, answer_choice_id: rand(1..12)) }

### 

ActiveRecord::Base.transaction do
#   User.destroy_all
#   Poll.destroy_all
#   Question.destroy_all
#   AnswerChoice.destroy_all
#   Response.destroy_all

  u1 = User.create!(username: 'Markov')
  u2 = User.create!(username: 'Gizmo')

  p1 = Poll.create!(title: 'Cats Poll', author: u1)

  q1 = Question.create!(text: 'What Cat Is Cutest?', poll: p1)
  ac1 = AnswerChoice.create!(text: 'Markov', question: q1)
  ac2 = AnswerChoice.create!(text: 'Curie', question: q1)
  ac3 = AnswerChoice.create!(text: 'Sally', question: q1)

  q2 = Question.create!(text: 'Which Toy Is Most Fun?', poll: p1)
  ac4 = AnswerChoice.create!(text: 'String', question: q2)
  ac5 = AnswerChoice.create!(text: 'Ball', question: q2)
  ac6 = AnswerChoice.create!(text: 'Bird', question: q2)

  r1 = Response.create!(
    respondent: u2,
    answer_choice: ac3
  )
  r2 = Response.create!(
    respondent: u2,
    answer_choice: ac4
  )
end