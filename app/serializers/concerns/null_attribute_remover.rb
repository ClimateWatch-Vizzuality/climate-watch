module NullAttributeRemover
  def serializable_hash(*args)
    hash = super
    hash.each { |key, value| hash.delete(key) if value.nil? }
    hash
  end
end
