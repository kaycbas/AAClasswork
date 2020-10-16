require 'deck'
require 'card'

describe Deck do
    subject(:deck) { Deck.new }

    describe "#initialize" do
        
        it "@cards is an array" do
            expect(deck.cards).to be_a(Array)
        end

        it "@cards has 52 cards" do
            expect(deck.cards.length).to eq(52)
            deck.cards.all? { |card| expect(card).to be_a(Card) }
        end
    end

    describe "#shuffle_deck" do
        it "should shuffle @cards" do
            cards = deck.cards.dup
            expect(deck.shuffle_deck).to_not eq(cards)
        end
    end

    describe "#deck_count" do
        it "should return the amount of cards left in the deck" do
            expect(deck.deck_count).to eq(deck.cards.length)
        end
    end

    describe "#pull_card" do
        it "should return pulled card" do
            pulled_card = deck.cards.last
            expect(deck.pull_card).to eq(pulled_card)
        end
    end
end