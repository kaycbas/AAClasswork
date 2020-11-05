FactoryBot.define do
  factory :user do
    username {Faker::Cannabis.strain}
    password {'420dude'}

    factory :dude do
      username {'dude'}
    end
  end
end
