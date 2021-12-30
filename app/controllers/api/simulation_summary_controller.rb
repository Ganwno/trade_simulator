class Api::SimulationSummaryController < ApplicationController

    before_action :require_current_user!

    def create
        @simulationSummary = SimulationSummary.new(simulation_summary_params)

        simulationSummary_saved_successfully = @simulationSummary.save
        if simulationSummary_saved_successfully
            render :show
        else
            render json: {errors: @simulationSummary.errors.messages}
        end
    end


    def index
        @simulation_summaries = SimulationSummary.where(username: simulation_summaries_params[:username])

        render :index
    end

    private
    # param helpers
    def simulation_summary_params
        params.require(:simulation).permit(
            :simulation_id,
            :username,
            :final_cash,
            :stopped_time
        )
    end

    def simulation_summaries_params
        params.require(:user).permit(
            :username
        )
    end

end
