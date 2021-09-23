class Api::TicksController < ApplicationController

    def show
        # get simulation
        # verify that timestamp is between start and end of simulation
        
        @tick = Tick.find_by_timestamp(
            tick_params[:simulation_id],
            tick_params[:timestamp]
        )
        if !@tick.is_a?(Tick)
            # unexpected error fetching data from database
            render json: {tick: nil, errors: @tick}
        else
            # map simulation tickers to tick quotes
            render partial: 'api/ticks/tick', locals: {tick: @tick}
        end
    end

    private
    def tick_params
        params.require(:tick).permit(:simulation_id, :timestamp)
    end

end
