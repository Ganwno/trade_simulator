require 'rails_helper'
require 'tickdata'

RSpec.describe Tick, type: :model do

    it { should validate_presence_of(:simulation_id)}
    it { should validate_presence_of(:timestamp)}
    it { should validate_presence_of(:quote_set)}

    it {should have_db_column(:simulation_id)}
    it {should have_db_column(:timestamp)}
    it {should have_db_column(:quote_set)}

    it 'creates Ticks from TickData and maps tickers to quotes' do
        start_time = 1631886300
        end_time = start_time
        t = TickData.new(['K', 'MS'], start_time, end_time)
        timestamp = start_time
        tick = Tick.new_from_quote_array('simulation_id', timestamp, t.tick_data[timestamp])
        expect(tick.quote_set).to eq('63.4_103.39')

        mappedQuotes = tick.map_tickers_to_quotes(t.tickers)
        expect(mappedQuotes).to eq({'K'=>63.4, 'MS'=>103.39})
    end

end
