class AddAuthorIdPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :author_id, :integer, null: false
    add_index :posts, :author_id
  end
end
