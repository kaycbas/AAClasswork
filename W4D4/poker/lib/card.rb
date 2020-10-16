class Card
    attr_reader :num, :suit

    def initialize(num, suit)
        @num, @suit = num, suit
    end
end