require 'rails_helper'
require 'tickdata'

RSpec.describe TickData do
    it 'creates seeded TickData' do
        start_time = 1631886300     # Fri Sep 17 2021 09:45:00 GMT-0400 (Eastern Daylight Time)
        end_time = 1631907840       # Fri Sep 17 2021 15:44:00 GMT-0400 (Eastern Daylight Time)
        t = TickData.new(['MSFT', 'AAPL'], start_time, end_time)
        
        expect(t.tickers).to eq(['MSFT', 'AAPL'])
        expect(t.start_time).to eq(start_time)
        expect(t.end_time).to eq(end_time + 60)
        expect(t.tick_data).to include(start_time)
        expect(t.tick_data).to include(end_time)
        expect(t.tick_data.length).to eq(60 * 60 * 6 + 1)
        expect(t.tick_data[start_time]).to eq([302.99, 147.475])
        # random number generator is seeded
        expect(t.tick_data[start_time + 1]).to  eq([303.0009701288065, 147.47820266811397])
        expect(t.tick_data[end_time - 1]).to    eq([300.45325467234494, 146.23161537848628])
    end
end