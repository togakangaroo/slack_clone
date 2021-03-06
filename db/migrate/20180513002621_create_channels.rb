class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :title, null: false
      t.text :topic
      t.string :slug, null: false
      t.integer :owner_id, null: false
      t.integer :workspace_id, null: false

      t.timestamps
    end

    add_index :channels, :owner_id
    add_index :channels, :slug, unique: true

    add_foreign_key :channels, :users, column: :owner_id
    add_foreign_key :channels, :workspaces
  end
end
