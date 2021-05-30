if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_flight-control', domain: 'name-of-you-app-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_flight-control', expire_after: 12.hours
end
