require 'rails_helper'

RSpec.describe "Api::SimulationSummaries", type: :request do
    it 'creates a SimulationSummary' do
        post '/api/user', params: { user: {username: "test_user", password: 'test_password' } }
        
        # create simulation for the test
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

        post '/api/simulation_summary', params: {
            simulation: {
                simulation_id: 1,
                session_token: 'exampleToken',
                username: 'test_user',
                final_cash: 10100,
                stopped_time: 1636555260
            }
        }

        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:show)

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['simulationSummary']['simulation_id']).to eq(1)
        expect(parsed_response['simulationSummary']['initial_cash']).to eq(10000.32)
        expect(parsed_response['simulationSummary']['win_loss_amount']).to eq(99.68)
        expect(parsed_response['simulationSummary']['elapsed_time_string']).to eq('11 minutes')
        expect(parsed_response['simulationSummary']['tickers']).to eq('ABC_DEF_GHI')
        expect(parsed_response['simulationSummary']['start_time']).to eq(1636554600)
        expect(parsed_response['simulationSummary']['stopped_time']).to eq(1636555260)
    end


    it 'displays SimulationSummaries' do
        post '/api/user', params: { user: {username: "test_user", password: 'test_password' } }

        # create simulation for the test
        simulation1 = Simulation.new({
            session_token: 'exampleToken',
            start_time: 1636554600,
            end_time: 1636555200,
            initial_cash: 10000.32,
            transaction_cost: 1.10,
            exec_delay_sec: 1,
            security_set: 'ABC_DEF_GHI'
        })

        # set id before saving, else it will change every time test is run
        simulation1.id = 1
        simulation1.save!

        simulationSummary1 = SimulationSummary.new({
            username: "test_user",
            simulation_id: 1,
            final_cash: 10001.0,
            stopped_time: 1636554703}
        )

        simulationSummary1.save!

        simulation2 = Simulation.new({
            session_token: 'exampleToken',
            start_time: 1636555200,
            end_time: 1636555800,
            initial_cash: 20000.00,
            transaction_cost: 0,
            exec_delay_sec: 0,
            security_set: 'AAPL_MSFT'
        })

        # set id before saving, else it will change every time test is run
        simulation2.id = 2
        simulation2.save!

        simulationSummary2 = SimulationSummary.new({
            username: "test_user",
            simulation_id: 2,
            final_cash: 19882.12,
            stopped_time: 1636555501}
        )

        simulationSummary2.save!

        get '/api/simulation_summary', params: {
            user: { username: 'test_user'}
        }

        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:index)

        parsed_response = JSON.parse(response.body)
        expect(parsed_response[0]['simulationSummary']['simulation_id']).to eq(1)

        expect(parsed_response[1]['simulationSummary']['simulation_id']).to eq(2)
        expect(parsed_response[1]['simulationSummary']['initial_cash']).to eq(20000.00)
        expect(parsed_response[1]['simulationSummary']['win_loss_amount']).to eq(-117.88)
        expect(parsed_response[1]['simulationSummary']['elapsed_time_string']).to eq('5 minutes, 1 second')
        expect(parsed_response[1]['simulationSummary']['tickers']).to eq('AAPL_MSFT')
        expect(parsed_response[1]['simulationSummary']['start_time']).to eq(1636555200)
        expect(parsed_response[1]['simulationSummary']['stopped_time']).to eq(1636555501)

    end

end
