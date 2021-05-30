class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.float :total
      t.timestamps
    end
    add_reference :bookings, :user, foreign_key: true
    add_reference :bookings, :flight, foreign_key: true
    add_reference :seats, :booking, foreign_key: true

  end
end
