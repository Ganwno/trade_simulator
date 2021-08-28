require 'rails_helper'

RSpec.describe "Api::Users", type: :request do

    it 'creates a User' do
        post '/api/user', params: { user: {username: "test_user", password: 'test_password' } }
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(response).to render_template(:show)
    end
    
    it 'returns error message for missing username' do
        post '/api/user', params: { user: {username: "", password: 'test_password'}}
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(assigns(:user).errors.messages[:username]).to eq(["can't be blank"])
    end

    it 'returns error message for short password' do
        post '/api/user', params: { user: {username: "test_user", password: 'passw'}}
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(assigns(:user).errors.messages[:password]).to eq(["is too short (minimum is 6 characters)"])
    end

    it 'returns error message for repeated usernames' do
        # create a user
        post '/api/user', params: { user: {username: "test_user", password: 'test_password' } }

        # reject repeated usernames
        post '/api/user', params: { user: {username: "test_user", password: 'test_password2' } }
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(assigns(:user).errors.messages[:username]).to eq(["already exists"])
    end

    it 'handles blank username and blank password' do
        post '/api/user', params: { user: {username: "", password: '' } }
        expect(response.content_type).to eq('application/json')
        expect(response).to have_http_status(200)
        expect(assigns(:user).errors.messages[:username]).to eq(["can't be blank"])
        expect(assigns(:user).errors.messages[:password]).to eq(["is too short (minimum is 6 characters)"])
    end


end
