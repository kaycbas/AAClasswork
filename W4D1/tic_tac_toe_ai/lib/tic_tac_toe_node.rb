require_relative 'tic_tac_toe'
require "byebug"

class TicTacToeNode
    attr_reader :board, :next_mover_mark, :prev_move_pos
  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def empty?(pos)
    @board[pos].nil?
  end

  def children
    childs = []
    (0..2).each do |row|
        (0..2).each do |col|
            if empty?([row, col])
                new_board = @board.dup
                new_board[[row,col]] = @next_mover_mark
                @next_mover_mark == :x ? next_mark = :o : next_mark = :x 
                prev = [row,col]
                child_node = TicTacToeNode.new(new_board,next_mark, prev)
                childs << child_node
            end
        end
    end
    childs
  end

  def losing_node?(evaluator)
    return true if @board.over? && @board.winner != evaluator && !@board.winner.nil?
    return false if @board.over? && (@board.winner == evaluator || @board.winner.nil?)
    if evaluator == @next_mover_mark 
        return true if self.children.all? { |child| child.losing_node?(evaluator) }
    else
        return true if self.children.any? { |child| child.losing_node?(evaluator) }
    end
    return false
  end

  def winning_node?(evaluator)
    return true if @board.over? && @board.winner == evaluator
    return false if @board.over? && @board.winner != evaluator

    if evaluator == @next_mover_mark
      return true if self.children.any? { |child| child.winning_node?(evaluator) }
    else
      return true if self.children.all? { |child| child.winning_node?(evaluator) }
    end
    false
  end
end

