class CreateSimulationSummaries < ActiveRecord::Migration[5.2]
  def change
    create_table :simulation_summaries do |t|
      t.string :username
      t.integer :simulation_id
      t.decimal :final_cash
      t.integer :stopped_time

      t.timestamps
    end
  end
end
