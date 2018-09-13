FactoryBot.define do
  factory :location, aliases: [:location_country] do
    sequence(:iso_code2) { |n| ('AA'..'ZZ').to_a[n] }
    sequence(:iso_code3) { |n| ('AAA'..'ZZZ').to_a[n] }
    pik_name { 'MyText' }
    cait_name { 'MyText' }
    ndcp_navigators_name { 'MyText' }
    wri_standard_name { 'MyText' }
    unfccc_group { 'MyText' }
    location_type { 'COUNTRY' }
    show_in_cw { true }

    factory :location_region do
      location_type { 'REGION' }

      transient do
        members_count { 3 }
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
