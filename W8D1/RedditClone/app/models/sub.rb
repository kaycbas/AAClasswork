# == Schema Information
#
# Table name: subs
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  description  :string
#  moderator_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Sub < ApplicationRecord
    validates :title, :moderator_id, presence: true
   
    belongs_to :moderator,
        foreign_key: :moderator_id,
        class_name: :User
        
    # has_many :posts,
    #     foreign_key: :sub_id,
    #     class_name: :Post

    has_many :post_subs,
        foreign_key: :sub_id,
        class_name: :PostSub,
        dependent: :destroy,
        inverse_of: :sub

    has_many :posts,
        through: :post_subs,
        source: :post
end
