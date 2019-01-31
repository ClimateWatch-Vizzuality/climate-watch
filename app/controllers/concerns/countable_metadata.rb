module CountableMetadata
  extend ActiveSupport::Concern

  private

  def meta(model, metadata)
    if params[:year]
      model.count_locations(params[:year]) + metadata
    else
      metadata
    end
  end
end
