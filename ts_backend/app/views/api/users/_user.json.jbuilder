 json.user do 
    json.extract! user, :id, :username, :session_token, :created_at, :updated_at
 end
 json.errors user.errors.messages