class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    unless include?(key)
      self[key.hash] << key
      @count += 1
    end
    resize! if @count >= @store.length
  end

  def include?(key)
    self[key.hash].include?(key)
  end

  def remove(key)
    if include?(key)
      self[key.hash].delete(key)
      @count -= 1
    end
  end

  private

  def [](num)
    @store[num % @store.length] 
  end

  def num_buckets
    @store.length
  end

  def resize!
    new_store = Array.new(@store.length) { Array.new }

    keys = []
    @store.each do |bucket|
      bucket.each do |key|
        keys << key
      end
    end

    keys.each do |key|
      remove(key)
    end

    @store += new_store
    keys.each do |key|
      insert(key)
    end
  end
end
