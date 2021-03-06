class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |name|
      define_method(name) do 
        self.instance_variable_get("@#{name}")
      end
      setter = name.to_s + '='
      define_method(setter) do |val|
        self.instance_variable_set("@#{name}", val)
      end
    end
  end
end
