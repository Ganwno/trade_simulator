class Api::SimulationsController < ApplicationController

    before_action :require_current_user!

    def create
        @simulation = Simulation.new(simulation_params)

        simulation_saved_successfully = @simulation.save
        if simulation_saved_successfully
            # generate TickData

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
        # wrap up simulation
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
            :id
        )
    end

end
