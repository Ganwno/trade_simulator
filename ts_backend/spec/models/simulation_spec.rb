require 'rails_helper'

RSpec.describe Simulation, type: :model do

    it { should validate_presence_of(:session_token) }
    it { should validate_presence_of(:start_time) }
    it { should validate_numericality_of(:start_time).only_integer.is_greater_than(0)}
    it { should validate_presence_of(:end_time) }
    it { should validate_numericality_of(:end_time).only_integer.is_greater_than(0)}
    it { should validate_presence_of(:security_set) }
    it { should validate_presence_of(:initial_cash) }
    it { should validate_numericality_of(:initial_cash).is_greater_than(0)}
    it { should validate_presence_of(:transaction_cost) }
    it { should validate_numericality_of(:transaction_cost).is_greater_than_or_equal_to(0)} 
    it { should validate_presence_of(:exec_delay_sec) }
    it { should validate_numericality_of(:exec_delay_sec).only_integer.is_greater_than_or_equal_to(0)}

end
