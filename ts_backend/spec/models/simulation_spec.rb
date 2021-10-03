require 'rails_helper'

RSpec.describe Simulation, type: :model do

    it { should validate_presence_of(:session_token) }
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:security_set) }
    it { should validate_presence_of(:initial_cash) }
    it { should validate_presence_of(:transaction_cost) }   
    it { should validate_presence_of(:exec_delay_sec) } 

end
