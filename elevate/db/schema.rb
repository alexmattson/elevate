# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170212013606) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "polls", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.string   "poll_type",   null: false
    t.string   "token",       null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["name"], name: "index_polls_on_name", using: :btree
    t.index ["poll_type"], name: "index_polls_on_poll_type", using: :btree
    t.index ["token"], name: "index_polls_on_token", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "microsoft_id"
    t.string   "email"
    t.string   "name"
    t.text     "oauth_token"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

end
