require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
    background :each do 
        visit new_user_url 
    end

    scenario 'has a new user page' do
        expect(page).to have_content('signup')
    end
  #given(:other_user) { User.make(email: 'other@example.com', password: 'rous') }

    feature 'signing up a user' do
        scenario 'shows username on the homepage after signup' do
            # given(:user) { User.make(email: 'other@example.com', password: 'rous') }
            fill_in 'Username', with: 'example'
            fill_in 'Password', with: 'doesntreallymatter'
            click_button 'Sign Up'
            save_and_open_page
            expect(page).to have_content('example')
            # expect(click_button 'Sign Up').to visit users_url
        end
    end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login'

end

feature 'logging out' do
  scenario 'begins with a logged out state'

  scenario 'doesn\'t show username on the homepage after logout'

end