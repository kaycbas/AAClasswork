class Deck

    def self.generate_cards
        suits = [:hearts, :diamonds, :clubs, :spades]
        cards = []

        (2..14).each do |val|
            suits.each { |suit| cards << Card.new(val, suit) }
        end
        return cards
    end

    attr_reader :cards

    def initialize
        @cards = Deck.generate_cards
    end

    def shuffle_deck
        @cards.shuffle!
    end

    def deck_count
        @cards.length
    end

    def pull_card
        @cards.pop
    end
end