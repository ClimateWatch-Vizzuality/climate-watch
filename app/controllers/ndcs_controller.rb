class NdcsController < BaseController
  def show
    @ndc = Ndc.joins(:location).where(
      'locations.code' => params[:code].upcase
    ).first
    md_content = @ndc.content
    markdown = Redcarpet::Markdown.new(
      ClimateWatchRender, tables: true, quote: true
    )
    render html: markdown.render(md_content).html_safe
  end
end
