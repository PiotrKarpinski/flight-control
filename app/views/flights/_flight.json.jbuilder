json.extract! flight, :id, :arrival_time, :take_off_time, :destination, :origin, :seats
json.url flight_url(flight, format: :json)
