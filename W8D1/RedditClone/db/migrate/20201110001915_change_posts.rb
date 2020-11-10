class ChangePosts < ActiveRecord::Migration[6.0]
  def change
    change_column :posts, :sub_id, :integer, null: true
  end
end
