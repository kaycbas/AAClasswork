require_relative 'piece'
require 'colorize'

class Board
    def self.populate_pieces(board)
        board.rows[0] = self.populate_row(board, 0, :B)
        board.rows[1].fill { |col| Pawn.new(:B, board, [1, col]) }
        board.rows[6].fill { |col| Pawn.new(:W, board, [6, col]) }
        board.rows[7] = self.populate_row(board, 7, :W)
        {
            B: board.rows[0] + board.rows[1],
            W: board.rows[6] + board.rows[7]
        }
    end

    def self.populate_row(board, row, color)
        [
            Rook.new(color, board, [row, 0]),
            Knight.new(color, board, [row, 1]),
            Bishop.new(color, board, [row,2]),
            Queen.new(color, board, [row, 3]),
            King.new(color, board, [row, 4]),
            Bishop.new(color, board, [row,5]),
            Knight.new(color, board, [row, 6]),
            Rook.new(color, board, [row, 7])
        ]
    end

    attr_reader :rows
    attr_accessor :selected

    def initialize()
        @sentinel = NullPiece.instance
        @rows = Array.new(8) { Array.new(8, @sentinel) }
        @pieces = Board.populate_pieces(self)
        @selected = [0, 0]
    end

    def print
        puts
        @rows.each_with_index do |row, i|
            mapped = row.map.with_index do |ele, j|
                str = @selected == [i, j] ? ele.to_s.red : ele.to_s
            end
            puts mapped.join(' ')
        end
    end

    def move_piece(start_pos, end_pos)
        piece = self[start_pos]
        raise "Invalid piece: no piece at #{start_pos}" if piece.is_a?(NullPiece)
        raise "Invalid move: #{piece.class} from #{start_pos} to #{end_pos}" unless piece.valid_move?(end_pos)
        piece.pos = end_pos
        self[end_pos] = piece
        self[start_pos] = @sentinel
    end

    def in_bounds?(pos)
        x, y = pos
        x >= 0 && x < 8 && y >= 0 && y < 8
    end

    def [](pos)
        return nil unless in_bounds?(pos)
        x, y = pos
        @rows[x][y]
    end

    def []=(pos, val)
        x, y = pos
        @rows[x][y] = val
    end

    def opposite_color(color)
        color == :B ? :W : :B
    end
    
    def in_check?(color)
        king = @pieces[color].find { |p| p.is_a?(King) }
        opponent_moves = []
        @pieces[opposite_color(color)].each { |p| opponent_moves += p.valid_moves } # note: unsure if valid_moves or moves
        opponent_moves.include?(king.pos)
    end

    def checkmate?(color)
        in_check?(color) && @pieces[color].none? { |p| p.valid_moves.length > 0 }
    end

    def deep_dup_board
        duped_board = @board.map { |row| row.map(&:dup) }
        duped_board.each { |row| row.each { |piece| piece.set_board(duped_board) } }
        duped_board
    end
end

if __FILE__ == $PROGRAM_NAME
    board = Board.new
    board.print

    # get all black non-pawn pieces
    rook_0 = board[[0, 0]]
    knight_0 = board[[0, 1]]
    bishop_0 = board[[0, 2]]
    queen = board[[0, 3]]
    king = board[[0, 4]]
    bishop_1 = board[[0, 5]]
    knight_1 = board[[0, 6]]
    rook_1 = board[[0, 7]]

    # get all black pawn pieces
    pawn_0 = board[[1, 0]]
    pawn_1 = board[[1, 1]]
    pawn_2 = board[[1, 2]]
    pawn_3 = board[[1, 3]]
    pawn_4 = board[[1, 4]]
    pawn_5 = board[[1, 5]]
    pawn_6 = board[[1, 6]]
    pawn_7 = board[[1, 7]]
end
