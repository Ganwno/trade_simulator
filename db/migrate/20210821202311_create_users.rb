class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_hash
      t.string :session_token
      
      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
