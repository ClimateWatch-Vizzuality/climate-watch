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

ActiveRecord::Schema.define(version: 20170914191538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adaptation_values", force: :cascade do |t|
    t.bigint "variable_id"
    t.bigint "location_id"
    t.text "string_value"
    t.float "number_value"
    t.boolean "boolean_value"
    t.integer "absolute_rank"
    t.float "relative_rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_adaptation_values_on_location_id"
    t.index ["variable_id"], name: "index_adaptation_values_on_variable_id"
  end

  create_table "adaptation_variables", force: :cascade do |t|
    t.text "slug"
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_adaptation_variables_on_slug", unique: true
  end

  create_table "cait_indc_categories", force: :cascade do |t|
    t.text "name", null: false
    t.text "slug", null: false
  end

  create_table "cait_indc_charts", force: :cascade do |t|
    t.text "name", null: false
  end

  create_table "cait_indc_indicator_types", force: :cascade do |t|
    t.text "name", null: false
  end

  create_table "cait_indc_indicators", force: :cascade do |t|
    t.bigint "chart_id"
    t.bigint "indicator_type_id"
    t.bigint "category_id"
    t.text "name", null: false
    t.text "slug", null: false
    t.boolean "summary_list", default: false, null: false
    t.boolean "on_map", default: false, null: false
    t.boolean "omit_from_detailed_view", default: false, null: false
    t.boolean "show_in_dashboard", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_cait_indc_indicators_on_category_id"
    t.index ["chart_id"], name: "index_cait_indc_indicators_on_chart_id"
    t.index ["indicator_type_id"], name: "index_cait_indc_indicators_on_indicator_type_id"
  end

  create_table "cait_indc_labels", force: :cascade do |t|
    t.bigint "indicator_id"
    t.text "name", null: false
    t.text "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["indicator_id"], name: "index_cait_indc_labels_on_indicator_id"
  end

  create_table "cait_indc_location_data", force: :cascade do |t|
    t.bigint "location_id"
    t.boolean "highlight_outline", default: false, null: false
    t.decimal "marker_lat"
    t.decimal "marker_lng"
    t.jsonb "data", null: false
    t.index ["location_id"], name: "index_cait_indc_location_data_on_location_id"
  end

  create_table "cait_indc_values", force: :cascade do |t|
    t.bigint "location_id"
    t.bigint "indicator_id"
    t.bigint "label_id"
    t.text "value", null: false
    t.index ["indicator_id"], name: "index_cait_indc_values_on_indicator_id"
    t.index ["label_id"], name: "index_cait_indc_values_on_label_id"
    t.index ["location_id"], name: "index_cait_indc_values_on_location_id"
  end

  create_table "data_sources", force: :cascade do |t|
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gases", force: :cascade do |t|
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "historical_emissions", force: :cascade do |t|
    t.bigint "location_id"
    t.bigint "data_source_id"
    t.bigint "sector_id"
    t.bigint "gas_id"
    t.text "gwp"
    t.jsonb "emissions"
    t.index ["data_source_id"], name: "index_historical_emissions_on_data_source_id"
    t.index ["gas_id"], name: "index_historical_emissions_on_gas_id"
    t.index ["location_id"], name: "index_historical_emissions_on_location_id"
    t.index ["sector_id"], name: "index_historical_emissions_on_sector_id"
  end

  create_table "location_members", force: :cascade do |t|
    t.bigint "location_id"
    t.bigint "member_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_location_members_on_location_id"
    t.index ["member_id"], name: "index_location_members_on_member_id"
  end

  create_table "locations", force: :cascade do |t|
    t.text "iso_code3", null: false
    t.text "pik_name"
    t.text "cait_name"
    t.text "ndcp_navigators_name"
    t.text "wri_standard_name", null: false
    t.text "unfccc_group"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "iso_code2", null: false
    t.text "location_type", null: false
    t.boolean "show_in_cw", default: true
    t.json "topojson"
    t.index ["iso_code2"], name: "index_locations_on_iso_code2"
    t.index ["iso_code3"], name: "index_locations_on_iso_code3"
  end

  create_table "ndc_sdg_goals", force: :cascade do |t|
    t.text "number", null: false
    t.text "title", null: false
    t.text "cw_title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "colour", null: false
    t.index ["number"], name: "index_ndc_sdg_goals_on_number", unique: true
  end

  create_table "ndc_sdg_ndc_target_sectors", force: :cascade do |t|
    t.bigint "ndc_target_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "sector_id"
    t.index ["ndc_target_id"], name: "index_ndc_sdg_ndc_target_sectors_on_ndc_target_id"
    t.index ["sector_id"], name: "index_ndc_sdg_ndc_target_sectors_on_sector_id"
  end

  create_table "ndc_sdg_ndc_targets", force: :cascade do |t|
    t.bigint "ndc_id"
    t.bigint "target_id"
    t.text "indc_text"
    t.text "status"
    t.text "climate_response"
    t.text "type_of_information"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ndc_id"], name: "index_ndc_sdg_ndc_targets_on_ndc_id"
    t.index ["target_id"], name: "index_ndc_sdg_ndc_targets_on_target_id"
  end

  create_table "ndc_sdg_sectors", force: :cascade do |t|
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ndc_sdg_targets", force: :cascade do |t|
    t.text "number", null: false
    t.text "title", null: false
    t.bigint "goal_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goal_id"], name: "index_ndc_sdg_targets_on_goal_id"
    t.index ["number"], name: "index_ndc_sdg_targets_on_number", unique: true
  end

  create_table "ndcs", force: :cascade do |t|
    t.bigint "location_id"
    t.text "full_text"
    t.tsvector "full_text_tsv"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["full_text_tsv"], name: "index_ndcs_on_full_text_tsv", using: :gin
    t.index ["location_id"], name: "index_ndcs_on_location_id"
  end

  create_table "sectors", force: :cascade do |t|
    t.bigint "parent_id"
    t.bigint "data_source_id"
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_source_id"], name: "index_sectors_on_data_source_id"
    t.index ["parent_id"], name: "index_sectors_on_parent_id"
  end

  add_foreign_key "adaptation_values", "adaptation_variables", column: "variable_id", on_delete: :cascade
  add_foreign_key "adaptation_values", "locations", on_delete: :cascade
  add_foreign_key "cait_indc_indicators", "cait_indc_categories", column: "category_id", on_delete: :cascade
  add_foreign_key "cait_indc_indicators", "cait_indc_charts", column: "chart_id", on_delete: :cascade
  add_foreign_key "cait_indc_indicators", "cait_indc_indicator_types", column: "indicator_type_id", on_delete: :cascade
  add_foreign_key "cait_indc_labels", "cait_indc_indicators", column: "indicator_id", on_delete: :cascade
  add_foreign_key "cait_indc_location_data", "locations", on_delete: :cascade
  add_foreign_key "cait_indc_values", "cait_indc_indicators", column: "indicator_id", on_delete: :cascade
  add_foreign_key "cait_indc_values", "cait_indc_labels", column: "label_id", on_delete: :cascade
  add_foreign_key "cait_indc_values", "locations", on_delete: :cascade
  add_foreign_key "historical_emissions", "data_sources", on_delete: :cascade
  add_foreign_key "historical_emissions", "gases", on_delete: :cascade
  add_foreign_key "historical_emissions", "locations", on_delete: :cascade
  add_foreign_key "historical_emissions", "sectors", on_delete: :cascade
  add_foreign_key "location_members", "locations", column: "member_id", on_delete: :cascade
  add_foreign_key "location_members", "locations", on_delete: :cascade
  add_foreign_key "ndc_sdg_ndc_target_sectors", "ndc_sdg_ndc_targets", column: "ndc_target_id"
  add_foreign_key "ndc_sdg_ndc_target_sectors", "ndc_sdg_sectors", column: "sector_id"
  add_foreign_key "ndc_sdg_ndc_targets", "ndc_sdg_targets", column: "target_id"
  add_foreign_key "ndc_sdg_ndc_targets", "ndcs"
  add_foreign_key "ndc_sdg_targets", "ndc_sdg_goals", column: "goal_id"
  add_foreign_key "ndcs", "locations", on_delete: :cascade
  add_foreign_key "sectors", "data_sources", on_delete: :cascade
  add_foreign_key "sectors", "sectors", column: "parent_id", on_delete: :cascade
end
