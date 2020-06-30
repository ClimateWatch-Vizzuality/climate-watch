class CustomHashSerializer < ActiveModel::Serializer
  def read_attribute_for_serialization(attr)
    if attr == :slug
      object[:name].parameterize
    else
      object[attr]
    end
  end
end
