module IndexedSerializer
  def self.serialize(objects, options, &block)
    serialized_values = ActiveModelSerializers::SerializableResource.new(
      objects, options
    ).as_json

    objects.
      map(&block).
      zip(serialized_values).
      sort.
      to_h
  end
end
