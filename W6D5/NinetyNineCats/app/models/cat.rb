# == Schema Information
#
# Table name: cats
#
#  id          :bigint           not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "action_view"

class Cat < ApplicationRecord
    include ActionView::Helpers::DateHelper

    COLORS = %w(white black green yellow red)

    validates :birth_date, :name, presence: true
    validates :color, presence: true, inclusion: {in: COLORS }
    validates :sex, presence: true, inclusion: {in: %w(m f) }

    def age
        age = Date.today.year - birth_date.year
        age -= 1 if Date.today < birth_date + age.years #for days before birthday
        age
    end
end
