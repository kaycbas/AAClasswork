class CreateAnswerChoices < ActiveRecord::Migration[6.0]
  def change
    create_table :answer_choices do |t|
      t.text :text
      t.integer :question_id, null: false

      t.timestamps
    end
    add_index :answer_choices, :question_id
  end
end
