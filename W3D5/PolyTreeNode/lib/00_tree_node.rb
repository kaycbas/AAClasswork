class PolyTreeNode
    attr_reader :value, :children, :parent

    def initialize(value)
        @value = value
        @parent = nil
        @children = []
    end

    def parent=(parent_node)
        self.parent.remove_child(self) unless self.parent.nil? || !self.parent.children.include?(self)
        @parent = parent_node  
        parent_node.children << self unless parent_node.nil? || parent_node.children.include?(self)
    end

    def add_child(child_node)
        @children << child_node unless self.children.include?(child_node)
        child_node.parent = self
    end

    def remove_child(child_node)
        deleted = @children.delete(child_node)
        raise "Not a child" if deleted.nil?
        child_node.parent = nil
    end

    def dfs(target)
        return self if self.value == target
        self.children.each do |child|
            found = child.dfs(target)
            return found unless found.nil?
        end
        return nil
    end

    def bfs(target)
        children = [self]
        until children.empty?
            child = children.shift
            return child if child.value == target
            children += child.children
        end
        nil
    end


    private
    attr_writer :children

end





