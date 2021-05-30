json.extract! booking, :id, :total, :created_at, :updated_at
json.url booking_url(booking, format: :json)
