require_relative 'stepable'
require_relative 'slideable'


class Piece
    attr_reader :color, :pos
    attr_accessor :selected
    def initialize(color, board, pos)
        @color = color
        @board = board
        @pos = pos
    end

    def to_s
        raise "Subpieces must implement to_s"
    end

    def valid_moves
        # raise "Must implement valid_moves"
        self.moves
    end

    def valid_move?(pos)
        valid_moves.include?(pos)
        # duped_board = @board.deep_dup_board
        # valid_moves.reject { |mv|  }
    end

    def pos=(val)
        @pos = val
    end

    def set_board(board)
        @board = board
    end

    private
    def move_into_check?(end_pos)
        
    end
end

require "singleton"

class NullPiece < Piece
    include Singleton
    
    def initialize(color = nil, board = nil, pos = nil)
        super(nil, nil, nil)
    end

    def to_s
        '_'
    end
end

class Rook < Piece
    include Slideable

    def move_dirs
        [:horizontal, :vertical]
    end

    def to_s
        @color == :B ? '♜' : '♖'
    end
end

class Bishop < Piece
    include Slideable

    def move_dirs
        [:diagonal]
    end

    def to_s
        @color == :B ? '♝' : '♗'
    end
end

class Queen < Piece
    include Slideable

    def move_dirs
        [:diagonal, :horizontal, :vertical]
    end

    def to_s
        @color == :B ? '♛' : '♕' 
    end
end

class King < Piece

    include Stepable
    
    def move_diffs
        [[0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]        
    end

    def to_s
        @color == :B ? '♚' : '♔'
    end
end

class Knight < Piece
    include Stepable
    
    def move_diffs
        [[-2, 1], [-2, -1], [2, 1], [2, -1], [-1, -2], [1, -2], [-1, 2], [1, 2]]        
    end

    def to_s
        @color == :B ? '♞' : '♘'
    end
end

class Pawn < Piece
    def moves
        dy = move_dirs
        res = []
        row, col = @pos 

        fwd = [row + dy, col]
        fwd_fwd = [row + dy + dy, col]

        if @board.in_bounds?(fwd) && @board[fwd].is_a?(NullPiece)
            res << fwd
            res << fwd_fwd if @board.in_bounds?(fwd_fwd) && @board[fwd_fwd].is_a?(NullPiece) && at_start_row?
        end

        diags = [[row + dy, col + 1], [row + dy, col - 1]]
        diags.each do |pos|
            next unless @board.in_bounds?(pos)
            res << pos if @board[pos].color && @board[pos].color != @color
        end 
        res
    end

    def at_start_row?
        @color == :W && @pos[0] == 6 || @color == :B && @pos[0] == 1
    end

    def move_dirs
        @color == :B ? 1 : -1
    end

    def to_s
        @color == :B ? '♟︎' : '♙'
    end
end