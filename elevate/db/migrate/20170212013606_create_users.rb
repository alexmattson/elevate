class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :microsoft_id
      t.string :docusign_id
      t.string :email
      t.string :name
      t.text :oauth_token
      t.timestamps
    end
  end
end
