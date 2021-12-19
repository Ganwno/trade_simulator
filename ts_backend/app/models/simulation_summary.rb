class SimulationSummary < ApplicationRecord
    attr_reader :simulation

    validates :username, :simulation_id, :final_cash, presence: true
    validates :stopped_time, presence: true, numericality: { only_integer: true, greater_than: 0}

    after_initialize :simulation=

    # public class methods

    def self.find_by_username_and_simulation_id(username, simulation_id)
        simulationSummary = SimulationSummary.find_by(username: username, simulation_id: simulation_id)
    end


    # public instance methods

    def simulation=()
        @simulation = Simulation.find_by_simulation_id(self.simulation_id)
    end


    def win_loss_amount()
        return self.final_cash - @simulation.initial_cash
    end


    def start_time()
        return @simulation.start_time
    end


    def end_time()
        return @simulation.end_time
    end

    
    def elapsed_time_string()
        elapsed_seconds = self.stopped_time - @simulation.start_time
        elapsed_hours = elapsed_seconds / 3600
        elapsed_minutes = (elapsed_seconds % 3600) / 60
        remaining_seconds = elapsed_seconds % 60

        time_string = ''
        if elapsed_hours > 1
            time_string += elapsed_hours.to_s + ' hours'
        elsif elapsed_hours == 1
            time_string += '1 hour'
        end

        sep = time_string.length == 0 ? '' : ', '
        if elapsed_minutes > 1
            time_string += sep + elapsed_minutes.to_s + ' minutes'
        elsif elapsed_minutes == 1
            time_string += sep + '1 minute'
        end

        sep = time_string.length == 0 ? '' : ', '
        if remaining_seconds > 1
            time_string += sep + remaining_seconds.to_s + ' seconds'
        elsif remaining_seconds == 1
            time_string += sep + '1 second'
        end

        return time_string
    end

end
