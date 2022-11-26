class Api::TicksController < ApplicationController

    def show
        # get simulation
        simulation = Simulation.find_by_simulation_id(tick_params[:simulation_id])

        # verify that timestamp is between start and end of simulation
        errors = []

        if !simulation.is_a?(Simulation)
            errors.append("Simulation id " + tick_params[:simulation_id] + " not found.")
            render json: {tick: nil, quotes: nil, errors: errors}
            return
        end

        if tick_params[:timestamp].to_i < simulation.start_time
            errors.append("Requested tick before simulation start.")
        elsif tick_params[:timestamp].to_i > simulation.end_time
            errors.append("Requested tick after simulation end.")
        end

        if errors.length > 0
            render json: {tick: nil, quotes: nil, errors: errors}
            return
        end

        @tick = Tick.find_by_timestamp(
            tick_params[:simulation_id],
            tick_params[:timestamp]
        )

        if !@tick.is_a?(Tick)
            # unexpected error fetching data from database
            errors.append("Cound not find tick for simulation " + tick_params[:simulation_id] +
                " at time " + tick_params[:timestamp] + ".");
            render json: {tick: nil, quotes: nil, errors: errors}
        else
            # map simulation tickers to tick quotes
            # @tick.errors.messages.concat(errors);
            quotes = @tick.map_tickers_to_quotes(simulation.security_set.split('_'))
            render partial: 'api/ticks/tick', locals: {tick: @tick, quotes: quotes}
        end
    end

    private
    def tick_params
        params.require(:tick).permit(:simulation_id, :timestamp)
    end

end
