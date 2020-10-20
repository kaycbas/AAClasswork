class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    # 1. convert the array into a number
    # 2. call num.hash and return value
    binary = self.to_s.unpack("B*")
    binary.first.to_i.hash
  end
end

class String
  def hash
    self.split('').hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    0
  end
end
