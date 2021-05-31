json.content @flights do |f|
  json.label "#{f.origin} to #{f.destination}"
  json.value f.id
end
