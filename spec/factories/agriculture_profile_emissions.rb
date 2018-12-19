FactoryBot.define do
  factory :agriculture_profile_emission, class: 'AgricultureProfile::Emission' do
    values { {
        '1990': '1.2',
        '1991': '1.3',
        '1992': '1.4',
        '1993': '1.6',
        '1994': '1.7',
        '1995': '1.9',
        '1996': '1.91',
        '1997': '1.92',
        '1998': '1.93',
        '1999': '1.94',
        '2000': '1.95',
        '2001': '1.96',
        '2002': '1.97'
    } }

    factory :agriculture_profile_emission_complete, class: 'AgricultureProfile::Emission' do
      association :location, factory: :location
      association :emission_subcategory, factory: :agriculture_profile_emission_subcategory
    end
  end
end