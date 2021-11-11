json.simulation do
    json.id simulation.id
    json.start_time simulation.start_time
    json.end_time simulation.end_time
    json.security_set simulation.security_set
    json.initial_cash simulation.initial_cash.to_f
    json.transaction_cost simulation.transaction_cost.to_f
    json.exec_delay_sec simulation.exec_delay_sec
end
json.errors simulation.errors.messages
