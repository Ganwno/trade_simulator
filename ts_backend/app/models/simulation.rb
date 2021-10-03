class Simulation < ApplicationRecord
    attr_reader :id, :start_time, :end_time, :security_set, :transaction_cost, :exec_delay_sec

    validates :session_token, :start_time, :end_time, :security_set, :initial_cash, :transaction_cost, :exec_delay_sec, presence: true

    # public class methods

    def self.find_by_session_token(session_token)
        simulation = Simulation.find_by(session_token: session_token)
    end

end
