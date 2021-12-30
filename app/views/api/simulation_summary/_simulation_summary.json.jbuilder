json.simulationSummary do
    json.simulation_id simulationSummary.simulation_id
    json.initial_cash simulationSummary.simulation.initial_cash.to_f
    json.win_loss_amount simulationSummary.win_loss_amount.to_f
    json.elapsed_time_string simulationSummary.elapsed_time_string
    json.tickers simulationSummary.simulation.security_set
    json.start_time simulationSummary.start_time
    json.stopped_time simulationSummary.stopped_time
    json.created_at simulationSummary.created_at
end
json.errors simulationSummary.errors.messages