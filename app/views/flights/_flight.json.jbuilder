json.extract! flight, :id, :arrival_time, :take_off_time, :destination, :origin, :seats, :created_at, :updated_at
json.url flight_url(flight, format: :json)
