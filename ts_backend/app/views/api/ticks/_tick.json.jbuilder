json.tick do
    json.extract! tick, :simulation_id, :timestamp
end
json.errors tick.errors.messages
