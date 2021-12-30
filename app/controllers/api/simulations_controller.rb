require 'tickdata'

class Api::SimulationsController < ApplicationController

    before_action :require_current_user!

    def create
        @simulation = Simulation.new(simulation_params)

        simulation_saved_successfully = @simulation.save
        if simulation_saved_successfully
            # generate TickData
            # Use a new thread so that the response can return while ticks are still being loaded into the db in the background.
            Thread.new do
                tick_data = TickData.new(@simulation.security_set.split('_'), @simulation.start_time, @simulation.end_time)
                Tick.save_tick_data(@simulation.id, tick_data)
            end
            load_simulation!(@simulation)
            render :show
        else
            render json: {id: nil, errors: @simulation.errors.messages}
        end

    end


    def show

        @simulation = Simulation.find_by_simulation_id(simulation_id[:id])
        render :show
    end


    def destroy
        # Tear down TickData
        @simulation = Simulation.find_by_simulation_id(simulation_id[:id])
        if (simulation_id[:session_token] == @simulation.session_token)
            # Use a new Thread so that the page can redirect while db is being cleaned up
            Thread.new do
                Tick.delete_tick_data(@simulation.id, @simulation.start_time, @simulation.end_time)
            end
        end
        # wrap up simulation
        head :no_content
    end


    private
    # param helpers
    def simulation_params
        params.require(:simulation).permit(
            :session_token,
            :start_time,
            :end_time,
            :initial_cash,
            :security_set,
            :transaction_cost,
            :exec_delay_sec
        )
    end


    def simulation_id
        params.require(:simulation).permit(
            :id,
            :session_token
        )
    end

end
