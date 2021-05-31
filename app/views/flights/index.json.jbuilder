json.content @flights do |f|
  json.extract! f, :id, :origin, :destination
  json.available_seats f.seats_amount - f.seats.length
  json.arrival_time f.arrival_time.strftime('%Y-%m-%d %I:%M')
  json.take_off_time f.take_off_time.strftime('%Y-%m-%d %I:%M')
end
json.total @total

