FactoryGirl.define do
  factory :cait_indc_location_datum, class: 'CaitIndc::LocationDatum' do
    location
    highlight_outline true
    marker_lat 0
    marker_lng 0
    data {}
  end
end
