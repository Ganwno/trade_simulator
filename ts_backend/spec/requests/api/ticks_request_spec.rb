require 'rails_helper'

RSpec.describe "Api::Ticks", type: :request do
    
    it 'shows a Tick' do
        # put a tick in the test database
        tick = Tick.new_from_quote_array('test_tick', 1632000000, [1.1, 2.2, 3.3])
        tick.save

        # show a tick
        get '/api/tick', params: { tick: {simulation_id: 'test_tick', timestamp: 1632000000 } }
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:partial => 'api/ticks/_tick')
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['tick']['simulation_id']).to eq('test_tick')
        expect(parsed_response['tick']['timestamp']).to eq(1632000000)
    end

end
