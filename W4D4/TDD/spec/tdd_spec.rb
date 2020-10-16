require 'tdd'

describe "#my_uniq" do
    let(:arr) { [5, 5, 6, 6, 9] }

    it "returns an array" do
        expect(arr.my_uniq).to be_a(Array)
    end

    it "removes duplicates" do
        expect(arr.my_uniq).to eq([5, 6, 9])
    end
end

describe "#two_sum" do
    let(:arr) { [1, 3, 7, -3, -1] }

    it "returns an array" do
        expect(arr.my_uniq).to be_a(Array)
    end

    it "array includes subarrays of indices that sum to zero" do
        expect(arr.two_sum).to contain_exactly([0, 4], [1, 3])
    end

    it "subarrays are in dictionary order" do
        expect(arr.two_sum).to eq([[0, 4], [1, 3]])
    end
end

describe "#my_transpose" do
    let(:mtx) { [[0, 1, 2], [3, 4, 5], [6, 7, 8]] }

    it "returns a 2d array" do
        res = my_transpose(mtx)
        expect(res.all? { |el| el.is_a?(Array) }).to eq(true)
    end

    it "2d array is correctly transposed" do
        res = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
        expect(my_transpose(mtx)).to eq(res)
    end


    it "does not use #transpose" do
        expect_any_instance_of(Array).to_not receive(:transpose)
        my_transpose(mtx)
    end
end

describe "#stock_picker" do
    let(:stks) { [23, 45, 32, 33, 56, 78, 90, 1] }

    it "return array of length two" do 
        expect(stock_picker(stks)).to be_a(Array)
        expect(stock_picker(stks).length).to eq(2)
    end

    it "first price was earlier than second price" do 
        expect(stock_picker(stks)[0] < stock_picker(stks)[1]).to eq(true)
    end

    it "returns the correct answer" do
        expect(stock_picker(stks)).to eq([0, 6])
    end
end

describe TowersOfHanoi do
    subject(:toh) { TowersOfHanoi.new }

    context "when play is called" do
        it "should call #move" do
            expect_any_instance_of(TowersOfHanoi).to receive(:move)
            toh.play
        end

        it "should call #won?" do
            expect_any_instance_of(TowersOfHanoi).to receive(:won?)
            toh.play
        end
    end

    context "when move is called" do
        it "returns an array of length two" do
            res = toh.move

            expect(res).to be_a(Array)
            expect(res.length).to eq(2)
        end

        it "returned array contains numbers between 0 and 2" do
            res = toh.move

            res.each do |num|
                expect(num >= 0).to eq(true)
                expect(num < 3).to eq(true)
            end
        end
    end

    context "when game is over" do
        let(:win_piles) { [[], [], [4,3,2,1]] }
        let(:lose_piles) { [[], [4], [3,2,1]] }

        it "should correctly identify win state" do
            toh.towers = win_piles
            expect(toh.won?).to eq(true)
        end

        it "should correctly identify lose state" do 
            toh.towers = lose_piles
            expect(toh.won?).to eq(false)        
        end
    end

end

#TowersOfHanoi 
    #should call #move
        #returns an array of length 2
        #array numbers should be between 0-2
    #should call #won?
        #correctly determine win state



