class User < ApplicationRecord
attr_reader :password

validates :username, :password_hash, :session_token, presence: true
validates :password, length: {minimum: 6, allow_nil: true}

before_validation :ensure_session_token

# public class methods

def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    # if username not found
    if user.nil?
        return {username: ["not found"]}
    end

    # if password does not match
    if !user.is_password?(password)
        return {password: ["does not match"]}
    end

    return user
end


# Session token generator
def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
end


# public instance methods

# Password encryption
def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(@password)
end


# Password verification
def is_password?(password)
    BCrypt::Password.new(self.password_hash).is_password?(password)
end


# Reset session token
def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
end


private 

def ensure_session_token
    self.session_token ||= User.generate_session_token
end

end
