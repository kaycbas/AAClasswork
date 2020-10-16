# Classes #
###########
# Card
    # @val
    # @suit

# Deck
    # @cards: array of 52 Cards
    # ---
    # #initialize: calls a generator to create 52 correct cards
    # #shuffle: shuffles cards
    # #count: returns num of cards in deck
    # #pull_card: pops top card off and returns it

# Hand
    # @cards: array of Cards in hand
    # @rank: holds the rank of the current hand
    # ----
    # #add_card: adds card to hand
    # #discard_card: removes a card from hand and returns it
    # #calculate_rank: calculates the rank of the hand
    # ----
    # The logic of calculating pair, three-of-a-kind, two-pair, etc. goes here.

# Player
    # Each player has a hand, plus a pot
    # Player has methods to ask the user:
    # Which cards they wish to discard
    # Whether they wish to fold, see, or raise.

# Game
    # Holds the deck
    # Keeps track of whose turn it is
    # Keeps track of the amount in the pot.