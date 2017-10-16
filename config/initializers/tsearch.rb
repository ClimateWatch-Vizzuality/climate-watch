# monkey patch to allow using a diffferent ranking function
# which takes proximity of matching lexemes into account
# currently not possible to specify this through pg_search options
# https://github.com/Casecommons/pg_search/issues/173

require "active_support/core_ext/module/delegation"

module PgSearch
  module Features
    class TSearch < Feature # rubocop:disable Metrics/ClassLength
      private
      # use ts_rank_cd (cover density) instead of ts_rank
      def tsearch_rank
        Arel::Nodes::NamedFunction.new("ts_rank_cd", [
          arel_wrap(tsdocument),
          arel_wrap(tsquery),
          normalization
        ]).to_sql
      end
    end
  end
end