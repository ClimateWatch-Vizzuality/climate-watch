class CustomHashSerializer < ActiveModel::Serializer
  def read_attribute_for_serialization(attr)
    object[attr]
  end
end
