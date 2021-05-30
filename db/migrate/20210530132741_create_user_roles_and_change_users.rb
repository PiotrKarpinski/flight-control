class CreateUserRolesAndChangeUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :user_roles do |t|
      t.string :name
    end
    add_reference :users, :user_role, foreign_key: true
  end
end
