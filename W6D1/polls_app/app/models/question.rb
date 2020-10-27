# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  text       :text             not null
#  poll_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
    validates :text, presence: true

    belongs_to :poll

    has_many :answer_choices

    has_many :responses,
        through: :answer_choices,
        source: :responses

    def results
        results = Hash.new(0)
        choices = Question
                    .select('answer_choices.id, COUNT(*) as res_count')
                    .where('questions.id = ?', self.id)
                    .joins(:responses)
                    .group('answer_choices.id')

        choices.each { |choice| results[choice.id] = choice.res_count }
        results
    end
end