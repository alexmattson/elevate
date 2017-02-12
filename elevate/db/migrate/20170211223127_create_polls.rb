class CreatePolls < ActiveRecord::Migration[5.0]
  def change
    create_table :polls do |t|
      t.string :name, null: false, index: true, unique: true
      t.text :description
      t.string :poll_type, index: true
      t.string :token, null: false, index: true, unique: true
      t.integer :user_id, index: true
      t.timestamps
    end
  end
end
