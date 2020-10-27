# == Schema Information
#
# Table name: responses
#
#  id               :bigint           not null, primary key
#  respondent_id    :integer          not null
#  answer_choice_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Response < ApplicationRecord
    validate :not_duplicate_response
    validate :not_author_answering_own

    belongs_to :respondent,
        foreign_key: :respondent_id,
        class_name: :User
    
    belongs_to :answer_choice

    has_one :question,
        through: :answer_choice,
        source: :question

    def sibling_responses
        self.question.responses.where.not(id: self.id)
    end

    private
    def respondent_already_answered?
        sibling_responses.pluck(:respondent_id).include?(self.respondent_id)
    end

    def not_duplicate_response
        if respondent_already_answered?
            errors[:respondent_id] << 'already answered'
        end
    end

    def not_author_answering_own
        if self.question.poll.author.id == self.respondent_id
            errors[:respondent_id] << 'can\'t answer their own question.'
        end
    end
end
