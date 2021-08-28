require 'rails_helper'

RSpec.describe "Api::Sessions", type: :request do

    it 'creates a Session' do
        user_params = {username: "test_user", password: 'test_password' }

        # create user
        post '/api/user', params: { user: user_params }

        # log user in
        post '/api/session', params: {user: user_params}
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:partial => 'api/users/_user')
    end
    
    it 'returns error message when username not found' do
        post '/api/session', params: {user: {username: 'test_user', password: 'test_password'}}
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response.body).to eq({:username => ["not found"]}.to_json)
    end

    it 'returns error message when password does not match' do
        # create user
        post '/api/user', params: {user: {username: 'test_user', password: 'test_password'}}
        
        post '/api/session', params: {user: {username: 'test_user', password: 'wrong_password'}}
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response.body).to eq({:password => ["does not match"]}.to_json)
    end

end
