require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"

  describe "validations" do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe "::self.find_by_credentials" do
    it 'should find the right user' do
      dude = FactoryBot.create(:dude)
      expect(User.find_by_credentials('dude', '420dude')).to eq(dude)
    end
  end

  describe "#password=" do
      let(:user) { FactoryBot.build(:user) }

      it 'Should have a password' do
        expect(user.password).to eq('420dude')
      end

      it 'encrypts the password' do
        expect(BCrypt::Password).to receive(:create).with('420dude')
        FactoryBot.build(:user)
      end
  end

  describe "#is_password?" do
    let(:user) { FactoryBot.create(:user) }
      context 'with valid password' do
        it "Should return true" do
          expect(user.is_password?('420dude')).to be true 
        end
      end
       context 'with invalid password' do
        it "Should return false" do
          expect(user.is_password?('420bruh')).to be false 
        end
      end
  end

  describe "#reset_session_token!" do
    let(:user) { FactoryBot.create(:user) }

    it 'should set a session token' do
      expect(user.session_token).not_to eq(nil)
    end

    it 'resets the session token' do
      prev_token = user.session_token
      user.reset_session_token!
      expect(prev_token).not_to eq(user.session_token)
    end
  end

  describe "#ensure_session_token" do
    let(:user) { FactoryBot.create(:user) }

    it 'should set a session token' do
      expect(user.session_token).not_to eq(nil)
    end
  end

end #!


