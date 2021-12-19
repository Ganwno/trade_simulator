require 'rails_helper'
require 'user'
require 'simulation'

RSpec.describe SimulationSummary, type: :model do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:simulation_id) }
    it { should validate_presence_of(:final_cash) }
    it { should validate_presence_of(:stopped_time) }
    it { should validate_numericality_of(:stopped_time).only_integer.is_greater_than(0)}

    it 'sets the simulation' do

        simulation = Simulation.new({
                session_token: 'exampleToken',
                start_time: 1636554600,
                end_time: 1636555200,
                initial_cash: 10000.32,
                transaction_cost: 1.10,
                exec_delay_sec: 1,
                security_set: 'ABC_DEF_GHI'
            })
        
        # set id before saving, else it will change every time test is run
        simulation.id = 1
        simulation.save!

        simulationSummary = SimulationSummary.new({
            username: "test_user",
            simulation_id: 1,
            final_cash: 10001.0,
            stopped_time: 1636554703}
        )

        expect(simulationSummary.start_time).to eq(1636554600)
        expect(simulationSummary.end_time).to eq(1636555200)
        expect(simulationSummary.win_loss_amount).to eq(0.68)
        expect(simulationSummary.elapsed_time_string).to eq('1 minute, 43 seconds')
    end

end
