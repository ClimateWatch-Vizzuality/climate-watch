FactoryGirl.define do
  factory :location do
    iso_code3 { (0...3).map { (65 + rand(26)).chr }.join }
    iso_code2 { (0...2).map { (65 + rand(26)).chr }.join }
    pik_name 'MyText'
    cait_name 'MyText'
    ndcp_navigators_name 'MyText'
    wri_standard_name 'MyText'
    unfccc_group 'MyText'
    location_type 'COUNTRY'
    show_in_cw true
  end
end
