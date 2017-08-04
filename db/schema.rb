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

ActiveRecord::Schema.define(version: 20170804121352) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.text "code", null: false
    t.text "pik_name"
    t.text "cait_name"
    t.text "ndcp_navigators_name"
    t.text "wri_standard_name", null: false
    t.text "unfccc_group"
    t.boolean "group", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_locations_on_code"
  end

  create_table "ndcs", force: :cascade do |t|
    t.bigint "location_id"
    t.text "content"
    t.tsvector "content_tsv"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["content_tsv"], name: "index_ndcs_on_content_tsv", using: :gin
    t.index ["location_id"], name: "index_ndcs_on_location_id"
  end

  add_foreign_key "ndcs", "locations", on_delete: :cascade
end
