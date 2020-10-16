require 'card'

describe Card do
    describe "#initialize" do
        let(:card) { Card.new(10, :hearts) }

        it "assigns proper value to @num" do
            expect(card.num).to eq(10)
        end

        it "assigns proper suit to @suit" do
            expect(card.suit).to eq(:hearts)
        end
    end
end