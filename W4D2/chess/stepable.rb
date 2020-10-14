module Stepable
    MOVES = {
        left: [0, -1],
        right: [0, 1],
        up: [-1, 0],
        down: [1, 0],
        upleft: [-1, -1],
        upright: [-1, 1],
        downleft: [1, -1],
        downright: [1, 1]
    }

    def moves
        case self.class
        when Knight
            moves = [[1, -2], [2, -1], [2, 1], [1, 2], [2, -1], [1, -2], [-2, -1]]
            moves.map do |x, y|
                [@pos[0] + x, @pos[1] + y]
            end
        when King
            valid_moves = []
            MOVES.keys.each do |dir|
                new_move = move(@pos, dir)
            end
        end
    end
    
    def move(pos, dir)
        [@pos[0] + MOVES[dir][0], @pos[1] + MOVES[dir][1]]
    end
end



# module Stepable
#     MOVES = {
#         knight: [[-2, 1], [-2, -1], [2, 1], [2, -1], [-1, -2], [1, -2], [-1, 2], [1, 2]]
#         king: [[0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
#     }

#     def moves
#         valid_moves = []
#         MOVES[@symbol].each { |delta| valid_moves << new_pos(delta) }
#         # filter valid_moves to be in board? on empty space?
#         valid_moves
#     end

#     def new_pos(delta)
#         [@pos[0] + delta[0], @pos[1] + delta[1]]
#     end
# end
