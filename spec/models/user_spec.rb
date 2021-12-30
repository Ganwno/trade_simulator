require 'rails_helper'

RSpec.describe User, type: :model do

    it { should validate_presence_of(:username)}
    it { should validate_presence_of(:password_hash)}
    it { should validate_length_of(:password).is_at_least(6).allow_nil}

    it {should have_db_column(:username)}
    it {should have_db_column(:password_hash)}
    it {should have_db_column(:session_token)}

end
