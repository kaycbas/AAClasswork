# == Schema Information
#
# Table name: poke_moves
#
#  id         :bigint           not null, primary key
#  move_id    :integer
#  pokemon_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PokeMove < ApplicationRecord

    belongs_to :pokemon

    belongs_to :move
    
end
