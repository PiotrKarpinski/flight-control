class CreateFlights < ActiveRecord::Migration[6.1]
  def change
    create_table :flights do |t|
      t.datetime :arrival_time
      t.datetime :take_off_time
      t.string :destination
      t.string :origin
      t.integer :seats_amount
    end
  end
end
