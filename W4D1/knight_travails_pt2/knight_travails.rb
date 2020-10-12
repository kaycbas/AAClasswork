require_relative 'poly_tree_node.rb'

require 'byebug'

class KnightPathFinder

    KNIGHT_MOVES = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]

    def self.valid_moves(pos)
        x,y = pos
        valid_moves = []

        KnightPathFinder::KNIGHT_MOVES.each do |pos|
            new_pos = [x+pos.first, y+pos.last]
            valid_moves << new_pos if valid_pos?(new_pos)
        end
        valid_moves
    end

    def new_move_positions(pos)
        valid_moves = self.class.valid_moves(pos)
        valids = valid_moves.select{|pos| !@considered_positions.include?(pos)}
        @considered_positions += valids
        valids
    end

    def self.valid_pos?(pos)
        x, y = pos
        return true if x < 8 && x >= 0 && y < 8 && y >= 0
        false
    end

    def initialize(starting_pos)
        @root_node = PolyTreeNode.new(starting_pos)
        @considered_positions = [starting_pos]
        build_move_tree
    end

    def build_move_tree
        queue = [@root_node]

        until queue.empty?
            move = queue.shift
            next_moves = new_move_positions(move.value)

            next_moves.map! do |next_move| 
                next_node = PolyTreeNode.new(next_move)
                move.add_child(next_node)
                next_node
            end
            
            queue += next_moves
        end
    end

    def find_path(end_pos)
        found_node = @root_node.bfs(end_pos)
        found_node.nil? ? nil : trace_back_path(found_node)
    end

    def trace_back_path(found_node)
        path = [found_node]
        node = found_node
        until node.parent.nil?
            path.unshift(node.parent)
            node = node.parent
        end
        path
    end
    
end

# kpf = KnightPathFinder.new([0, 0])
# p kpf.find_path([7, 6]) # => [[0, 0], [1, 2], [2, 4], [3, 6], [5, 5], [7, 6]]
# p kpf.find_path([6, 2]) # => [[0, 0], [1, 2], [2, 0], [4, 1], [6, 2]]