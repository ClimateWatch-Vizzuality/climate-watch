module Api
  module V1
    class MetadataController < ApiController
      def index
        metadata = ::WriMetadata::Source.
          includes(values: :property).
          order(:name)
        render json: metadata,
               each_serializer: Api::V1::WriMetadata::SourceSerializer
      end

      def show
        metadata = ::WriMetadata::Source.
          includes(values: :property).
          where(name: params[:slug]).
          first!

        render json: metadata,
               serializer: Api::V1::WriMetadata::SourceSerializer
      end

      def acronyms
        acronyms = ::WriMetadata::Acronym.
          order(:acronym).
          all
        render json: acronyms,
               each_serializer: Api::V1::WriMetadata::AcronymSerializer
      end
    end
  end
end
