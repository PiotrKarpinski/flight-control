class CreateSeats < ActiveRecord::Migration[6.1]
  def change
    create_table :seats do |t|
      t.string :code
      t.string :passenger_first_name
      t.string :passenger_last_name
    end
    add_reference :seats, :flight, foreign_key: true
  end
end
