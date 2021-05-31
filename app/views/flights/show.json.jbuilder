json.extract! @flight, :id, :origin, :destination, :seats_amount
json.seats @flight.seats.pluck(:code)
json.arrival_time @flight.arrival_time.strftime('%Y-%m-%d %I:%M')
json.take_off_time @flight.take_off_time.strftime('%Y-%m-%d %I:%M')
