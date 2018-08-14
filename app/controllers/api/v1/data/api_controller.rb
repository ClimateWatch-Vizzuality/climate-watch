module Api
  module V1
    module Data
      class ApiController < Api::V1::ApiController
        include ::ClimateWatchEngine::Caching

        private

        # rubocop:disable Naming/AccessorMethodName
        # @param links_with_rels [Array<Hash>]
        def set_links_header(links_with_rels)
          links = (headers['Link'] || '').split(',').map(&:strip)
          links_with_rels.each do |link_with_rel|
            links << %(<#{link_with_rel[:link]}>; rel="#{link_with_rel[:rel]}")
          end
          headers['Link'] = links.join(', ')
        end
        # rubocop:enable Naming/AccessorMethodName
      end
    end
  end
end
