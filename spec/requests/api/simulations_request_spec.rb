require 'rails_helper'

RSpec.describe "Api::Simulations", type: :request do

    it 'creates a Simulation' do
        # create a user for the test
        post '/api/user', params: { user: {username: "test_user", password: 'test_password' } }
        post '/api/simulation', params: { 
            simulation: {
                session_token: 'exampleToken',
                start_time: 1636554600,
                end_time: 1636555200,
                initial_cash: 10000.32,
                transaction_cost: 1.10,
                exec_delay_sec: 1,
                security_set: 'ABC_DEF_GHI'
            }
        }
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:show)
    end

end
