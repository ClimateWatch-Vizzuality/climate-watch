# monkey patch to allow using a diffferent ranking function
# which takes proximity of matching lexemes into account
# currently not possible to specify this through pg_search options
# https://github.com/Casecommons/pg_search/issues/173

# another patch to allow "phrase searching" to sequences of terms in
# double quotes, using the <-> (followed by) search operator
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

      def tsquery
        return "''" if query.blank?
        tsquery_terms.join(options[:any_word] ? ' || ' : ' && ')
      end

      PHRASE_REGEXP = /".+?"/

      def tsquery_terms
        # match all phrases in query - sequences in double quotes
        phrases = query.to_enum(:scan, PHRASE_REGEXP).map do
          md = Regexp.last_match
          offset = md.offset(0)
          {start: offset[0], end: offset[1]}
        end
        term_sequences = []
        start_idx = 0
        phrases.each do |phrase|
          term_sequences << {
            type: :term,
            body: query.slice(start_idx, phrase[:start] - start_idx)
          } unless (phrase[:start] - start_idx).zero?
          term_sequences << {
            type: :phrase,
            body: query.slice(phrase[:start], phrase[:end] - phrase[:start])
          }
          start_idx = phrase[:end]
        end
        term_sequences << {type: :term, body: query} unless phrases.any?

        term_sequences.map do |term_sequence|
          query_terms = term_sequence[:body].split(' ')
          tsquery_terms = query_terms.map { |term| tsquery_for_term(term) }
          if term_sequence[:type] == :term
            tsquery_terms.join(options[:any_word] ? ' || ' : ' && ')
          else
            '(' + tsquery_terms.join(' <-> ') + ')'
          end
        end
      end
    end
  end
end
