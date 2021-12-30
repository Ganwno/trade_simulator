require 'rails_helper'

RSpec.describe "Api::Ticks", type: :request do
    
    it 'shows a Tick' do
        # create a simulation in the test database
        post '/api/user', params: { user: {username: "test_user", password: 'test_password' } }
        post '/api/simulation', params: {
            simulation: {
                session_token: 'exampleToken',
                start_time: 1637159400,
                end_time: 1637159460,
                initial_cash: 10000.32,
                transaction_cost: 1.10,
                exec_delay_sec: 1,
                security_set: 'AAPL_MSFT'
            }
        }
        parsed_simulation_response = JSON.parse(response.body)
        test_simulation_id = parsed_simulation_response['simulation']['id']

        # put a tick in the test database
        tick = Tick.new_from_quote_array(test_simulation_id, 1637159400, [1.1, 2.2])
        tick.save

        # show a tick
        get '/api/tick', params: { tick: {simulation_id: test_simulation_id, timestamp: 1637159400 } }
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:partial => 'api/ticks/_tick')

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['tick']['simulation_id']).to eq(test_simulation_id.to_s)
        expect(parsed_response['tick']['timestamp']).to eq(1637159400)
        expect(parsed_response['quotes']).to eq({'AAPL'=>1.1, 'MSFT'=>2.2})
    end

end
