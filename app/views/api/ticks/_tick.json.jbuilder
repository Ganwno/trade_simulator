json.tick do
    json.extract! tick, :simulation_id, :timestamp
end
json.quotes quotes
json.errors tick.errors.messages
