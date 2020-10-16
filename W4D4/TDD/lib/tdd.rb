class Array
    def my_uniq
        new_arr = []
        self.each { |el| new_arr << el unless new_arr.include?(el) }
        new_arr
    end

    def two_sum
        pairs = []
        (0...self.length).each do |idx1|
            (0...self.length).each do |idx2|
                pairs << [idx1, idx2] if idx2 > idx1 && self[idx1] + self[idx2] == 0
            end
        end
        pairs
    end
end

def my_transpose(mtx)
    mtx.first.zip(*mtx[1..-1])
end

def stock_picker(stks)
    day_pair = 0
    result = nil

    (0...stks.length).each do |idx1|
        (0...stks.length).each do |idx2|
            if stks[idx2] - stks[idx1] > day_pair && idx2 > idx1
                day_pair = stks[idx2] - stks[idx1]
                result = [idx1, idx2]
            end
        end
    end
    result
end

class TowersOfHanoi

    attr_accessor :towers

    def initialize
        @towers = [ [4,3,2,1], [], [] ]
    end

    def play
        until won?
            p @towers
            input = move 
            num = @towers[input[0]].pop
            @towers[input[1]].push(num)
        end
    end

    def move
        puts "Please enter a start and end tower seperated by a space"
        indices = gets.chomp.split(" ").map(&:to_i)
        indices
    end

    def won?
        return false unless towers[0].length == 0
        return false unless towers[1].length == 0
        return false unless towers[2] == towers[2].sort.reverse
        true
    end
end

game = TowersOfHanoi.new
game.play