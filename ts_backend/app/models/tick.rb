class Tick < ApplicationRecord
@@quote_sep = '_'

validates :simulation_id, :timestamp, :quote_set, presence: true

# public class methods

def self.new_from_quote_array(simulation_id, timestamp, quote_array)
    quote_set = (quote_array.map { |quote| quote.to_s}).join(@@quote_sep)
    Tick.new({simulation_id: simulation_id, timestamp: timestamp, quote_set: quote_set})
end


def self.find_by_timestamp(simulation_id, timestamp)
    Tick.find_by(simulation_id: simulation_id, timestamp: timestamp)
end


# public instance methods

def map_tickers_to_quotes(ticker_array)
    quotes = self.quote_set.split(@@quote_sep).map { |quote_str| quote_str.to_f }
    quote_dict = Hash.new()
    (0...ticker_array.length).each do |i|
        quote_dict[ticker_array[i]] = quotes[i]
    end
    quote_dict
end

end
