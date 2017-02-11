class CreatePolls < ActiveRecord::Migration[5.0]
  def change
    create_table :polls do |t|
        t.string :name
        t.text :description
        t.string :type
        t.string :token
        t.timestamps
    end
  end
end
