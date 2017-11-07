module IndexedSerializer
  def self.serialize(objects, options, &block)
    serialized_values = ActiveModel::Serializer.
      serializer_for(objects).
      new(objects, options).
      as_json

    objects.
      map(&block).
      zip(serialized_values).
      sort_by(&:first).
      to_h
  end

  def self.serialize_collection(objects, options, &block)
    serialized_values = ActiveModel::Serializer.
      serializer_for(objects).
      new(objects, options).
      as_json

    objects.
      map(&block).
      zip(serialized_values).
      sort_by(&:first).
      group_by(&:first).
      each_with_object({}) do |value, memo|
        memo[value.first] = value.second.map(&:second)
      end
  end
end
