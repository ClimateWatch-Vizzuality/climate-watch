FactoryGirl.define do
  factory :location, aliases: [:location_country] do
    iso_code3 { (0...3).map { (65 + rand(26)).chr }.join }
    iso_code2 { (0...2).map { (65 + rand(26)).chr }.join }
    pik_name 'MyText'
    cait_name 'MyText'
    ndcp_navigators_name 'MyText'
    wri_standard_name 'MyText'
    unfccc_group 'MyText'
    location_type 'COUNTRY'
    show_in_cw true

    factory :location_region do
      location_type 'REGION'

      transient do
        members_count 3
      end

      after :create do |region, evaluator|
        region.members = create_list(
          :location_country,
          evaluator.members_count
        )
      end
    end
  end
end
