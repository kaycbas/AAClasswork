class AddIndexToArtworkShares < ActiveRecord::Migration[6.0]
  def change
    add_index :artwork_shares, :viewer_id
  end
end
