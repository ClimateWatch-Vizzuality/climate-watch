export const sectionsData = [
  {
    label: 'General questions',
    slug: 'general_questions',
    content: [
      {
        type: 'text',
        title: 'What is Climate Watch?',
        answer:
          "Climate Watch offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries' climate progress."
      },
      {
        type: 'html',
        title: 'Who is this tool for? ',
        answer:
          'Government ministries, development organizations, civil society organizations and researchers can use Climate Watch to find and download data about global emissions, climate commitments, sustainable development and other topics. Visit our <Link to="/" innertext="homepage" /> to see what we can offer you. '
      },
      {
        type: 'html',
        title: 'Can I download the data?',
        answer:
          '<span>Yes, all the data published on Climate Watch are free and open. This means you can download data and use it for your own analysis with proper attribution (see question 4). Use the Data Explorer at the top right corner of the homepage to explore the datasets and download one or more of them. Visit our <Link to="/about/permissions" innertext="Permissions and Licensing" />  page for more information about using the data.<span>'
      },
      {
        type: 'html',
        title: 'How do I cite Climate Watch data as a source?',
        answer:
          '<span>Use the info button next to each dataset and figure on Climate Watch to see its citation information.  A general citation for Climate Watch is as follows: Climate Watch. 2019. Washington, D.C.: World Resources Institute. Available online at: <link to="/" innerText="www.climatewatchdata.org"></link>. See our <Link to="/about/permissions" innertext="Permissions and Licensing" />  page for more information about citation.  '
      },
      {
        type: 'html',
        title: 'What makes Climate Watch data credible?',
        answer:
          'Climate Watch is based on data sources that are: <ul><li>Officially reported by national governments under the United Nations Framework Convention on Climate Change or gathered by reputable institutions (e.g., World Bank, United Nations Development Programme) and research organizations (e.g., Potsdam Institute for Climate Impact Research, World Resources Institute).</li><li>Well-documented in terms of a methodology that takes into account rigorous quality checks and data validation</li><li>Available for the majority of the countries and updated on a regular basis</li><li>Publicly available </li></ul>'
      },
      {
        type: 'html',
        title: 'Who is behind Climate Watch?',
        answer:
          'Visit our <Link to="/about/partners" innertext="Partners" /> page to see all the organizations involved in developing and managing Climate Watch. The platform is managed on a daily basis by the World Resources Institute and is part of the <a href="https://resourcewatch.org/" rel="noopener noreferrer" target="_blank">Resource Watch</a> family of data platforms. The name “Climate Watch” refers only to the platform and not to any particular organization.'
      },
      {
        type: 'text',
        title: 'How significant are uncertainties in the data? ',
        answer:
          'The level of uncertainly depends on the data source. Each page includes links to data sources and methodology documentation that has additional details. You can view this information by clicking on the (i) buttons on any page and dataset. '
      },
      {
        type: 'html',
        title: 'How frequently is the data updated?',
        answer:
          '<Link to="/countries" innertext="Country profiles" /> are updated at least once per year. Links to UNFCCC submissions are updated more frequently as new documents are submitted. <Link to="/ghg-emissions" innertext="Historical GHG emissions" /> are updated as available. It takes at least 1-2 years for organizations to compile, process and report GHG data; thus, the last year of complete GHG data will often be 2-3 years behind the current calendar year.<p><Link to="/ndcs-content" innertext="NDC content" /> is updated as new NDCs are submitted to the UNFCCC.</p><p> <Link to="/ndcs-sdg" innertext="NDC-SDG linkages" /> are updated as new NDCs are submitted to the UNFCCC.</p>'
      },
      {
        type: 'html',
        title:
          'What should I do if I believe a dataset on Climate Watch is inaccurate or that better data exists?',
        answer:
          'Much of the data on Climate Watch are obtained from other sources and we aim to make them all transparent. Make sure you have read and understood the sources and methodologies when using Climate Watch data. If you have additional questions, please contact us at <a href="mailto:climatewatch@wri.org"> climatewatch@wri.org</a>.'
      },
      {
        type: 'table',
        title: 'What acronyms are used on Climate Watch?',
        answer: '<table />',
        tableData: [
          {
            Acronym: 'AR2',
            'Acronym definition': "IPCC's Second Assessment Report in 1995"
          },
          {
            Acronym: 'AR4',
            'Acronym definition': "IPCC's Fourth Assessment Report in 2007"
          },
          { Acronym: 'BAU', 'Acronym definition': 'Business As Usual' },
          { Acronym: 'BR', 'Acronym definition': 'Biennial Report' },
          { Acronym: 'BUR', 'Acronym definition': 'Biennial Update Report' },
          {
            Acronym: 'CAIT',
            'Acronym definition': 'Climate Analysis Indicators Tool'
          },
          {
            Acronym: 'CDIAC',
            'Acronym definition':
              'Carbon Dioxide Information Analysis Center (of the U.S. Dept. of Energy)'
          },
          {
            Acronym: '<span>CH<sub>4</sub></span>',
            'Acronym definition': 'Methane'
          },
          {
            Acronym: '<span>CO<sub>2</sub></span>',
            'Acronym definition': 'Carbon Dioxide'
          },
          {
            Acronym: 'EIA',
            'Acronym definition':
              'Energy Information Administration (of the U.S. Dept. of Energy)'
          },
          {
            Acronym: 'EPA',
            'Acronym definition':
              'United States Environmental Protection Agency'
          },
          {
            Acronym: 'EUU',
            'Acronym definition': 'European Union group of countries'
          },
          {
            Acronym: 'F-gases',
            'Acronym definition':
              'Hydrofluorocarbons, perfluorocarbons, sulfur hexafluoride, Nitrogen Trifluoride'
          },
          {
            Acronym: 'FAO',
            'Acronym definition':
              'Food and Agriculture Organization of the United Nations'
          },
          { Acronym: 'GDP', 'Acronym definition': 'Gross Domestic Product' },
          { Acronym: 'GHG', 'Acronym definition': 'Greenhouse Gas' },
          {
            Acronym: 'Gt',
            'Acronym definition': 'Gigatonnes, or billion metric tons'
          },
          { Acronym: 'GWP', 'Acronym definition': 'Global Warming Potential' },
          { Acronym: 'HFC', 'Acronym definition': 'Hydrofluorocarbon' },
          {
            Acronym: 'IEA',
            'Acronym definition': 'International Energy Agency'
          },
          {
            Acronym: 'INDC',
            'Acronym definition': 'Intended Nationally Determined Contribution'
          },
          {
            Acronym: 'IPCC',
            'Acronym definition': 'Intergovernmental Panel on Climate Change'
          },
          { Acronym: 'LTS', 'Acronym definition': 'Long-term Strategy' },
          {
            Acronym: 'LUCF',
            'Acronym definition': 'Land-use Change and Forestry'
          },
          {
            Acronym: 'LULUCF',
            'Acronym definition': 'Land-use, land-use Change and Forestry'
          },
          { Acronym: 'Mt', 'Acronym definition': 'Million metric tonnes' },
          {
            Acronym: '<span>MtCO<sub>2</sub>e</span>',
            'Acronym definition':
              'Million metric tonnes of Carbon Dioxide equivalent'
          },
          {
            Acronym: '<span>N<sub>2</sub>O</span>',
            'Acronym definition': 'Nitrous Oxide'
          },
          { Acronym: 'NC', 'Acronym definition': 'National Communication' },
          {
            Acronym: 'NDC',
            'Acronym definition': 'Nationally Determined Contributions'
          },
          {
            Acronym: '<span>NF<sub>3</sub></span>',
            'Acronym definition': 'Nitrogen Trifluoride'
          },
          {
            Acronym: 'OECD',
            'Acronym definition':
              'Organization for Economic Co-operation and Development'
          },
          { Acronym: 'PFC', 'Acronym definition': 'Perfluorocarbon' },
          {
            Acronym: 'SDG',
            'Acronym definition': 'Sustainable Development Goals'
          },
          {
            Acronym: '<span>SF<sub>6</sub></span>',
            'Acronym definition': 'Sulfur Hexafluoride'
          },
          { Acronym: 'UN', 'Acronym definition': 'United Nations' },
          {
            Acronym: 'UNFCCC',
            'Acronym definition':
              'United Nations Framework Convention on Climate Change'
          },
          { Acronym: 'WRI', 'Acronym definition': 'World Resources Institute' }
        ]
      }
    ]
  },
  {
    label: 'GHG emissions module',
    slug: 'ghg',
    content: [
      {
        type: 'table',
        title:
          'Which data sources does Climate Watch use? What are the differences between these data sources?',
        answer:
          '<p>Climate Watch uses four different historical emissions data sources that are all slightly different in their scope and methodology. Depending on what you are using the data for, there are certain advantages and disadvantages of each source. The table below provides information on the differences between the datasets included in Climate Watch that can help you decide which source is most appropriate for your use. Please note that in some cases, the data included in Climate Watch is only a subset of the data available from the original source.</p><table />',
        tableData: [
          {
            '': 'Summary',
            CAIT:
              'The CAIT dataset is the most comprehensive included on Climate Watch and includes all sectors and gases. In order to emphasize comparability of data across countries, it does not use countries’ official inventories reported to the UNFCCC. It has a 3 year lag.',
            'PIK PRIMAP-hist':
              'The PIK PRIMAP-hist dataset included on Climate Watch combines UNFCCC reported data where available and fills gaps with other sources. It does not include land use change and forestry (LUCF) but covers all other sectors and has a 3 year lag. Additional data to what is shown on Climate Watch is available from <a href="http://dataservices.gfz-potsdam.de/pik/showshort.php?id=escidoc:3842934">PIK</a>.',
            UNFCCC:
              'UNFCCC includes only officially reported data by countries. It has large data gaps for non-Annex I countries. Due to different reporting requirements for Annex I and non-Annex I countries, the data is not internally comparable. It covers all sectors and has 2-3 year lag.',
            GCP:
              'GCP provides the most recent CO2 emissions with a 1 year lag (new data is released in December for the previous year). It includes CO2 emissions from fossil fuel combustion, cement production, and bunkers.'
          },
          {
            '': 'Original data sources used',
            CAIT:
              'Carbon Dioxide Information Analysis Center (CDIAC), International Energy Agency (IEA), U.S. Environmental Protection Agency, U.N. Food and Agriculture Organization, and U.S. Energy Information Administration. See more detailed information about sources <a href="http://cait.wri.org/docs/CAIT2.0_CountryGHG_Methods.pdf">here</a>.',
            'PIK PRIMAP-hist':
              'Uses countries’ official inventories reported to the UNFCCC as a basis, and fills in with data from other sources, including CDIAC, Emissions Database for Global Atmospheric Research (EDGAR), and FAO, among others. See all sources <a href="http://dataservices.gfz-potsdam.de/pik/showshort.php?id=escidoc:3842934">here</a>.',
            UNFCCC:
              'The inventory data are provided in the annual GHG inventory submissions by Annex I Parties and in the National Communications and Biennial Update Reports by non-Annex I Parties.',
            GCP:
              'CDIAC for fossil fuel and industry data for 1959-2014; where available countries’ data reported to the UNFCCC are used in preference. BP Statistical Review of World Energy is used for preliminary estimates of 2015-2017 data. For more information about methodology and sources, see Section 2.1.1 <a href="https://www.earth-syst-sci-data.net/10/2141/2018/essd-10-2141-2018.pdf">here</a>.'
          },
          {
            '': 'Temporal coverage',
            CAIT: '1990-2016',
            'PIK PRIMAP-hist': '1850-2016',
            UNFCCC:
              '1990-2017 for Annex I countries; Varied coverage for non-Annex I countries',
            GCP: '1960-2018'
          },
          {
            '': 'Geographic coverage',
            CAIT: '197 Parties to the UNFCCC (196 countries plus the EU)',
            'PIK PRIMAP-hist':
              '216 countries, regions and country groups, with the 196 of the 197 Parties to the UNFCCC shown on Climate Watch (State of Palestine is not included).',
            UNFCCC:
              'All 43 Annex I Parties; 148 of the 154 non-Annex I Parties',
            GCP:
              '229 countries, regions, and country groups; 195 of 197 Parties to the UNFCCC shown on Climate Watch (Monaco and San Marino are not included).'
          },
          {
            '': 'Sector coverage (sector definitions may vary across sources)',
            CAIT:
              'Main IPCC sectors, including energy sub-sectors. Includes:<ul><li>agriculture</li><li>bunker fuels</li><li>energy<ul><li>electricity/heat</li><li>fugitive emissions</li><li>manufacturing/ construction</li><li>other fuel combustion</li><li>transportation</li></ul></li><li>industrial processes</li><li>land-use change and forestry</li><li>waste</li>',
            'PIK PRIMAP-hist':
              'Main IPCC sectors excluding LUCF. Includes: <ul><li>agriculture</li><li>energy</li><li>industrial processes and product use</li><li>other</li><li>waste</li></ul>Excludes: <ul><li>land use change and forestry</li><li>bunker fuels</li></ul> Additional sub-sectors are included in the original source and not reflected on Climate Watch.',
            UNFCCC:
              'Main IPCC sectors; energy sub-sectors are reported but not included on Climate Watch. For Annex I countries: <ul><li>agriculture</li><li>energy</li><li>industrial processes and product use</li><li>land use, land-use change, and forestry</li><li>other</li><li>waste</li></ul>Excludes: <ul><li>bunker fuels (reported separately)</li></ul>For non-Annex I countries: <ul><li>agriculture</li><li>energy</li><li>industrial processes</li><li>land-use change and forestry</li><li>other</li><li>solvent and other product use</li><li>waste</li></ul>Excludes: <ul><li>bunker fuels (reported separately)</li></ul>',
            GCP:
              'Fossil fuel combustion and cement production. Bunkers are reported at the global rather than territorial level and included on Climate Watch. Land use, land use change and forestry emissions are reported at the global, but not territorial, level and not included on Climate Watch. Includes:<ul><li>fossil fuel combustion</li><li>cement production</li></ul>Excludes:<ul><li>land use change and forestry (reported separately)</li><li>waste</li></ul>'
          },
          {
            '': 'Gas coverage ',
            CAIT: 'Kyoto GHGs (CH4, CO2, N2O, F-gases)',
            'PIK PRIMAP-hist': 'Kyoto GHGs (CH4, CO2, N2O, F-gases)',
            UNFCCC: 'Kyoto GHGs (CH4, CO2, N2O, F-gases)',
            GCP: 'CO2 only'
          },
          {
            '': 'Timeliness',
            CAIT: '3 year lag',
            'PIK PRIMAP-hist': '3 year lag',
            UNFCCC: '2-3 year lag',
            GCP: '1-2 year lag'
          },
          {
            '': 'Use of country reported data to the UNFCC',
            CAIT: 'Does not use UNFCCC reported data',
            'PIK PRIMAP-hist': 'Uses UNFCCC reported data and fills gaps',
            UNFCCC: 'Only uses UNFCCC reported data',
            GCP: 'Uses UNFCCC reported data and fills gaps'
          },
          {
            '': 'Comparable methodology across countries',
            CAIT:
              'Consistent methodology used across all countries to maximize comparability',
            'PIK PRIMAP-hist':
              'Uses national inventories where available and fills in the gaps. Therefore, comparability varies depending on country groups (Annex 1 / non-Annex 1) and years.',
            UNFCCC:
              'Comparable across Annex 1 Parties, but not to non-Annex 1 Parties due to different reporting requirements between Annex 1 and non-Annex 1 Parties.',
            GCP: 'Comparable across countries.'
          }
        ]
      },
      {
        type: 'html',
        title:
          'How significant are uncertainties in the emissions data, particularly in the land-use change and forestry sector? ',
        answer:
          'According to the Working Group III Contribution to the IPCC Fifth Assessment Report, global CO<sub>2</sub> emissions from fossil fuel combustion are known within 8% uncertainty (90% confidence interval). CO<sub>2</sub> emissions from FOLU (forestry and other land use) have very large uncertainties associated with them in the order of ± 50%. Uncertainty for global emissions of CH<sub>4</sub>, N<sub>2</sub>O and the F-gases has been estimated as 20%, 60% and 20% respectively. For the PIK dataset, regional deforestation emissions are downscaled to the country level using estimates of the deforested area obtained from potential vegetation and calculations for the needed agricultural land. Accordingly levels of uncertainty are quite high for earlier years of data (closer to 1850).  '
      }
    ]
  },
  {
    label: 'Explore NDCs module',
    slug: 'ndc',
    content: [
      {
        type: 'text',
        title: 'What are NDCs? ',
        answer:
          'In the lead up to the Paris climate conference in December 2015, Parties were invited by the UNFCCC to communicate their national plans to address climate change, known as Intended Nationally Determined Contributions, or INDCs. A country’s INDC is converted to a Nationally Determined Contribution (NDC) when it formally joins the Paris Agreement by submitting an instrument of ratification, acceptance, approval or accession.'
      },
      {
        type: 'text',
        title: 'How are NDCs assessed? ',
        answer:
          'The NDC Content module of Climate Watch presents contributions submitted by Parties in different forms, including visualizations, structured indicators, and original text. The module does not evaluate the ambition of contributions. The data presented are submitted by countries and are intended to make these documents more transparent, accessible, comparable and easier to understand.  '
      },
      {
        type: 'html',
        title:
          'Can you explain some of the terms used, like target, policy, action and plan?',
        answer:
          '<ul><li>Targets are an intention to achieve a specific result, for example, to reduce GHG emissions to a specific level (a GHG target) or increase energy efficiency or renewable energy to a specific level (a non-GHG target), typically by a certain date.</li><li>Actions are an intention to implement specific means of achieving GHG reductions, such as policies or projects.</li><li>Policies are larger in scale while projects are implemented at a smaller and more specific scale. </li><li>Plans and strategies are broader than specific policies or projects, such as a general intention to ‘improve efficiency’, ‘develop renewable energy’, etc. The terms come from the World Bank\'s <a href="http://spappssecext.worldbank.org/sites/indc/Pages/INDCHome.aspx" rel="noopener noreferrer" target="_blank" >NDC platform</a> and WRI\'s <a href="https://www.wri.org/sites/default/files/designing-preparing-indcs-report.pdf" rel="noopener noreferrer" target="_blank" >publication</a> (Figure 4.1). </li></ul>'
      },
      {
        type: 'html',
        title: 'What is the methodology behind the data? ',
        answer: `<p>The structured indicators used for presenting NDC information are adapted from several data sources, including the <a href="http://cait.wri.org/indc/?_ga=2.28118332.1668429314.1539630180-1825175710.1480702135" rel="noopener noreferrer" target="_blank">CAIT Paris Contributions Map</a>, <a href="http://spappssecext.worldbank.org/sites/indc/Pages/INDCHome.aspx" rel="noopener noreferrer" target="_blank">World Bank’s NDC Platform</a>, and  <a href="https://klimalog.die-gdi.de/ndc/#NDCExplorer/worldMap?NDC??income???catIncome" rel="noopener noreferrer" target="_blank">DIE’s NDC Explorer</a>. Please refer to respective resources for detailed documentation. The terms and phrases used in this tool follow, to the extent possible, WRI’s publication <a href="https://www.wri.org/publication/designing-and-preparing-indcs" rel="noopener noreferrer" target="_blank">“Designing and Preparing INDCs.”</a></p><p>Some of the key indicators are explained below.<p><strong>Overview </strong> </p> <p><strong>Overview of Commitments </strong> </p> <ul> <li> Mitigation contribution type </li> <ul> <li> Mitigation contribution in general take the form of actions, outcomes (GHG or non-GHG outcomes), or a combination of actions and outcomes. </li> </ul></ul> <ul> <li> GHG target type </li> <ul> <li> GHG targets refer to contributions framed as targeted outcomes in GHG terms (including Base year target, Fixed level target, Baseline scenario target, Intensity target, and Trajectory target) </li> <ul> <li> <span class="underline">Base year target:</span> A commitment to reduce, or control the increase of, emissions by a specified quantity relative to a base year. </li> <li> <span class="underline">Fixed level target</span>: A commitment to reduce, or control the increase of, emissions to an absolute emissions level in a target year. One type of fixed-level goal is a carbon neutrality goal, which is designed to reach zero net emissions by a certain date. </li> <li> <span class="underline">Baseline scenario target:</span> A commitment to reduce emissions by a specified quantity relative to a projected emissions baseline scenario. A baseline scenario is a reference case that represents future events or conditions most likely to occur in the absence of activities taken to meet the mitigation goal. </li> <li> <span class="underline">Intensity target:</span> A commitment to reduce emissions intensity (emissions per unit of another variable, typically GDP) by a specified quantity relative to a historical base year. </li> </ul> <ul> <li> <span class="underline">Trajectory target:</span> A commitment to reduce, or control the increase of, emissions to specified emissions quantities in multiple target years or periods over a long time period (such as targets for 2020, 2030, and 2040 over the period 2020-2050). </li> </ul></ul></ul> <ul> <li> Non-GHG target </li> <ul> <li> Non-GHG targets refer to contributions that are framed in terms of specific, quantifiable, desired outcomes in energy efficiency, renewable energy, forestry or other sectors, and that are not expressed in terms of GHG emissions or emission reductions. </li> </ul></ul> <ul> <li> Conditionality </li> <ul> <li> An “unconditional contribution” is what countries could implement without any conditions and based on their own resources and capabilities. A “conditional contribution” is one that countries would undertake if international means of support are provided, or other conditions are met. </li> </ul></ul> <p><strong>Comparison with Previous NDC </strong> </p> <p>See further explanation in <a href="https://www.wri.org/publication/enhancing-ndcs%22%20/"><span class="underline">Enhancing NDCs: A Guide to Strengthening National Plans</span></a> </p> <ul> <li> Revised from previous submission </li> <ul> <li> Whether the NDC is revised from the previous submission. </li> </ul></ul> <ul> <li> Strengthened or added GHG target </li> <ul> <li> Whether the NDC adopts strengthened or GHG target compared to previous submission. </li> </ul></ul> <ul> <li> Strengthened or added sectoral target </li> <ul> <li> Whether the NDC adopts strengthened or new sectoral non-GHG target compared to previous submission. </li> </ul></ul> <ul> <li> Strengthened or added policies and actions </li> <ul> <li> Whether the NDC adopts strengthened or new policies and actions compared to previous submission. </li> </ul></ul> <ul> <li> Provided additional information for clarity, transparency, and understanding </li> <ul> <li> Whether the NDC provides additional information for clarity, transparency and understanding compared to the previous submission. </li> </ul></ul> <p><strong>Planning Process</strong> </p> <ul> <li> NDC preparation: stakeholder consultation </li> <ul> <li> Mentioning of stakeholder consultation processes in the formulation of (I)NDC, as well as the involvement of specific actors (government institutions, private sector, academia, international experts, etc.). </li> </ul></ul> <ul> <li> Planning of NDC implementation </li> <ul> <li> Mentioning of (I)NDC implementation, and whether Parties aim to create specific laws and policies for the implementation. </li> </ul></ul> <ul> <li> Education </li> <ul> <li> Mentioning of education, and whether countries plan to do education to implement their (I)NDC (adaptation, mitigation or both). </li> </ul></ul> <ul> <li> Awareness raising </li> <ul> <li> Mentioning of awareness raising on climate change, and whether countries plan to raise people's awareness to implement their (I)NDC (adaptation, mitigation or both). </li> </ul></ul> <ul> <li> Training </li> <ul> <li> Mentioning of training on climate change, and whether countries plan to do training to implement their (I)NDC (adaptation, mitigation or both). </li> </ul></ul> <ul> <li> Access to information </li> <ul> <li> Mentioning of access to information, and whether countries plan to improve information access to implement their (I)NDC (adaptation, mitigation or both). </li> </ul></ul> <ul> <li> Monitoring and review </li> <ul> <li> Mentioning of assessment or review of (I)NDCs, and whether they intend to track the implementation of their (I)NDCs. </li> </ul></ul> <ul> <li> Co-benefits of mitigation </li> <ul> <li> Mentioning the consideration and description of co-benefits of mitigation. Parties’ specific examples are included. </li> </ul></ul> <ul> <li> Co-benefits of adaptation </li> <ul> <li> Mentioning the consideration and description of co-benefits of adaptation. Parties’ specific examples are included. </li> </ul></ul> <p><strong>Finance and Support </strong> </p> <ul> <li> Conditionality of adaptation finance </li> <ul> <li> Mentioning of adaptation finance/support, and whether countries make such international finance conditional for the adaptation contribution in their (I)NDC.<span class="underline"> </span> </li> </ul></ul> <ul> <li> Conditionality of mitigation finance </li> <ul> <li> Mentioning of mitigation finance/support, and whether countries make such international finance conditional for the adaptation contribution in their (I)NDC. </li> </ul></ul> <ul> <li> Conditionality of technology transfer </li> <ul> <li> Mentioning of technology transfer, and whether the implementation of (I)NDCs is (partly) conditional technology transfer. </li> </ul></ul> <ul> <li> Conditionality of capacity building </li> <ul> <li> Mentioning of capacity building and whether the implementation of (I)NDCs is (partly) conditional to capacity building. </li> </ul></ul> <ul> <li> Climate risk insurance </li> <ul> <li> Mentioning of existing risk insurance mechanisms or plan to develop risk insurance mechanisms to deal with climate change impacts. </li> </ul></ul> <strong>Broader Picture</strong> <ul> <li> Historical responsibility </li> <ul> <li> The thought behind historical responsibility is that countries with high emissions in the past (historical emissions) have a larger responsibility to address climate change than countries with low historical emissions. </li> </ul></ul> <ul> <li> Limiting global temperature increase </li> <ul> <li> This sub-category shows whether countries refer to limiting the global temperature increase (above pre-industrial levels) as negotiated under the UNFCCC. The subcategory also shows which (I)NDCs claim to be consistent with limiting the global temperature increase to 2°C or 1.5<del> </del>°C above pre-industrial levels. </li> </ul></ul> <ul> <li> Gender </li> <ul> <li> Indicating gender aspects and included in a specific context (fairness and equity /adaptation/ capacity building). </li> </ul></ul> <ul> <li> Human rights </li> <ul> <li> Indicating human rights aspects and included in a specific context (fairness and equity, adaptation, capacity building). </li> </ul></ul> <ul> <li> Green growth/green economy </li> <ul> <li> Green growth is a relatively new concept that describes low-emission and resource efficient economic growth. Ultimately, green growth should lead to green economies. </li> </ul></ul> <ul> <li> Loss and damage </li> <ul> <li> Mentioning of loss and damage(L&amp;D) and whether this is done so in the context of finance needs. Denotes climate change impacts that occur despite mitigation and adaptation efforts. </li> </ul></ul> <p><strong>Mitigation </strong> </p> <p><strong>GHG Target </strong> </p> <ul> <li> Single or multi-year target </li> <ul> <li> Whether a target is designed to achieve emission reductions or reductions in intensity by a single target year (Single year target), or over several years of a target period (Multi-year target). </li> </ul></ul> <ul> <li> Target level of emissions </li> <ul> <li> Expected emissions in the target year or period if the target is achieved. </li> </ul></ul> <ul> <li> Target year </li> <ul> <li> The year(s) by when or over which the goal is to be achieved. For actions: Target year refers to the date actions comes into effect and date of completion. </li> </ul></ul> <ul> <li> Base year </li> <ul>
          <li> A specific year of historical data against which the emissions are compared over time. </li> </ul></ul> <p><strong>Scope and Coverage </strong> </p> <ul> <li> Greenhouse gases covered </li> <ul> <li> Greenhouse gases covered in the GHG target of the NDC </li> </ul></ul> <ul> <li> Sectors covered </li> <ul> <li> Sectors covered in the GHG target of the NDC </li> </ul></ul> <ul> <li> IPCC inventory methodologies to be used to track progress </li> <ul> <li> IPCC inventory methodologies to be used to track progress in the (I)NDC. For example, 2006 IPCC Guidelines for National Greenhouse Gas Inventories </li> </ul></ul> <p><strong>Overall Assumptions and Methodologies</strong> </p> <ul> <li> Global warming potential (GWP) values to be used to track progress </li> <ul> <li> The Global Warming Potential (GWP) values are used to describe the radiative forcing impact of non-CO<sub>2 </sub>greenhouse gases. The AR2 or AR4 refer to GWP values provided by the <a href="https://www.ipcc.ch/publications_and_data/ar4/wg1/en/ch2s2-10-2.html"><span class="underline">IPCC</span></a> in its 2<sup>nd</sup> and 4<sup>th</sup> Assessment Reports, respectively. </li> </ul></ul> <ul> <li> Baseline scenario targets: Static or dynamic baseline scenario </li> <ul> <li> Whether the baseline scenario is static (will be fixed over the period) or dynamic (will change over the period) baseline scenario. </li> </ul></ul> <ul> <li> Baseline scenario targets: Cut-off year for policies included in the baseline scenario, and any significant policies excluded from the baseline scenario </li> <ul> <li> The cut-off year for policies included in the baseline scenario, and any significant policies excluded from the baseline scenario. </li> </ul></ul> <ul> <li> Baseline scenario targets: Projection method </li> <ul> <li> Projection method (e.g., name and type of models). </li> </ul></ul> <ul> <li> Baseline scenario targets: Emission drivers included and assumptions and data sources for key drivers </li> <ul> <li> Emission drivers included and assumptions and data sources for key drivers. </li> </ul></ul> <ul> <li> Baseline scenario targets: For dynamic baseline scenario targets, under what conditions will the baseline be recalculated </li> <ul> <li> For dynamic baseline scenario targets, under what conditions will the baseline be recalculated and if applicable, any significance threshold used to determine whether changes in emissions drivers are significant enough to warrant recalculation of the scenario. </li> </ul></ul> <ul> <li> Assumptions and methodological approaches for GHG reduction targets relative to emissions intensity </li> <ul> <li> For GHG reduction targets relative to emissions intensity, information such as level of output (e.g., GDP) in the base year, projected level of output in the target year/period (and an uncertainty range, if available), and units and data sources used. </li> </ul></ul> <ul> <li> Assumptions and methodological approaches for NDCs that include actions </li> <ul> <li> For NDCs that include actions, information such as estimated impact on GHG emissions or non-GHG indicators; methodologies used to estimate impacts on GHG emissions, including the baseline scenario and other assumptions; uncertainty of estimated impacts (estimate or description); information on potential interactions with other policies/actions. </li> </ul></ul> <ul> <li> Planned use of international market mechanisms </li> <ul> <li> Whether the Party intends to use or sell/transfer units from international market mechanisms. </li> </ul></ul> <p><strong>Accounting for Emissions and Removals from the Land Sector</strong> </p> <ul> <li> Treatment of land sector </li> <ul> <li> Treatment of land sector: included as part of the broader target; treated as a separate sectoral target; used to offset emissions within the target boundary; or not included in a target. </li> </ul></ul> <ul> <li> Coverage of the land sector as compared to total net emissions from the land sector, as a percentage if known </li> <ul> <li> If the land sector is included, coverage of the land sector (net emissions and removals from land-use activities and/or categories) as compared to total net emissions from the land sector, as a percentage if known. </li> </ul></ul> <ul> <li> Assumed accounting approach for the land sector (activity-based or land-based) </li> <ul> <li> The way land sector emissions and removals are accounted for toward the target—from either select land-use categories or select land-use activities. There are two accounting approaches for the land sector: land-based accounting and activity-based accounting. </li> </ul></ul> <ul> <li> Assumed accounting method for the land sector (net-net, forward-looking baseline, or gross-net) </li> <ul> <li> Method used to assess emissions and removals within each selected land-use category or activity. Land-use accounting methods include the net-net (accounting relative to base year/period emissions), forward-looking baseline, and gross-net methods (accounting without reference to base year/period or baseline scenario emissions). </li> </ul></ul> <ul> <li> Level against which emissions and removals from the land sector are accounted, including policy assumptions and methodologies employed </li> <ul> <li> If the land sector is included, level against which emissions and removals from the land sector are accounted, if known, including policy assumptions and methodologies employed. </li> </ul></ul> <ul> <li> Any assumed use of methodologies to quantify and account for natural disturbances and legacy effects </li> <ul> <li> Any assumed use of methodologies to quantify and account for natural disturbances and legacy effects. </li> </ul></ul> <ul> <li> Any other relevant accounting approaches, assumptions or methodologies </li> <ul> <li> Any other relevant accounting approaches, assumptions or methodologies, such as relevant IPCC guidance, the Party's forest definition, definition of managed land, list of land-use activities and/or categories included and their definitions, or others. </li> </ul></ul> <p><strong>International Market Mechanism</strong> </p> <ul> <li> Limit on the percentage of emission reductions that may be achieved through the use of units from international market mechanisms </li> <ul> <li> If units are to be used, any limit on the percentage of emission reductions that may be achieved through the use of units from international market mechanisms. </li> </ul></ul> <ul> <li> Assumed types and years of units to be applied </li> <ul> <li> If units are to be used, the assumed types and years of units to be applied, if known. </li> </ul></ul> <ul> <li> Whether and how any units purchased/acquired or sold/transferred abroad will ensure environmental integrity and avoid double counting </li> <ul> <li> Description of whether and how any units purchased/acquired or sold/transferred abroad will ensure environmental integrity and avoid double counting. </li> </ul></ul> <p><strong>Adaptation </strong> </p> <p><strong>Vulnerability </strong> </p> <ul> <li> Migration and displacement </li> <ul> <li> Reference to migration/displacement as a consequence of climate impacts and/or relocation as adaptation strategy. Party-specific information is indicated. </li> </ul></ul> <ul> <li> Costs of recent climate-related hazards (currency US$) </li> <ul> <li> Describes monetary and non-monetary costs countries suffered from recent climate-related hazards, such as floods, storms and droughts. Specific impacts, year and events are illustrated if available. </li> </ul></ul> <ul> <li> Costs of future climate-related hazards (currency US$) </li> <ul> <li> Describes expected monetary and non-monetary costs from climate-related hazards, such as floods, storms and droughts. Specific impacts and events are illustrated if available. </li> </ul></ul>`
      },
      {
        type: 'text',
        title: 'How does the module handle non-English NDCs? ',
        answer:
          'NDCs can be submitted using any of the 6 official UN languages: Arabic, Chinese, English, French, Spanish, and Portuguese. For non-English submissions that are accompanied by an English translation, the English version is used as the basis for analysis. For those that don’t provide translations, Google Translate is used, and the translated version is presented, along with the original full text. '
      },
      {
        type: 'text',
        title: 'How does the NDC keyword search work with translation? ',
        answer:
          'Searching for a word in English will produce results only among I/NDCs that are in English; similarly searching for a word in French would produce results among I/NDCs in French. '
      }
    ]
  },
  {
    label: 'Explore LTS module',
    slug: 'lts',
    content: [
      {
        type: 'html',
        title: 'What is a long-term strategy? ',
        answer:
          'Under the Paris Agreement, countries are invited to communicate mid-century "long-term low greenhouse gas emissions development strategies" (long-term strategies, or LTS). These strategies are central to the goal of limiting global warming to well below 2&#8451 and pursuing efforts to limit the increase to 1.5&#8451, representing a significant opportunity for countries to lay out their vision for achieving a low-carbon economy by 2050 while also pursuing sustainable development. It is advantageous for countries to align their NDCs and long-term strategies for consistency and to avoid the lock-in of carbon-intensive behavior, technologies and policies. In addition to Climate Watch’s <a href="https://www.climatewatchdata.org/lts-explore" rel="noopener noreferrer" target="_blank">Explore LTS Module</a>, WRI offers a wealth of other resources related to long-term strategy design and communication. These include expert perspectives, case studies, and working papers available at <a href="https://longtermstrategies.org" rel="noopener noreferrer" target="_blank">longtermstrategies.org</a>.'
      },
      {
        type: 'html',
        title: 'Why are long-term strategies needed? ',
        answer:
          'Ambitious long-term strategies are vital since current national commitments are only sufficient enough to limit warming to 2.7-3.7&#8451 (4.9-6.7&#8457). Not only do long-term strategies present an opportunity to bring national action in line with needed ambition, but they also encourage countries to avoid costly investments in high-emissions technologies.'
      },
      {
        type: 'html',
        title: 'What are the key elements of long-term strategies? ',
        answer:
          '<p>The scope and depth of long-term strategies will be determined by countries. Accordingly, there is no one-size-fits-all format or structure for a long-term strategy. However, some key elements of a long-term strategy could include:</p><ul><li>A long-term vision; </li><li>Sustainable development considerations; </li><li>Mitigation elements (including a long-term quantified outcome for GHG emissions reductions and results of mitigation models and scenarios); </li><li>Adaptation elements;  </li><li>Sectoral strategies (including policies and actions, milestones to be achieved over time, information on managing the transition to the long-term goals, among others); </li><li>Implementation approaches; </li><li>Monitoring plans and revisions processes. </li></ul>'
      },
      {
        type: 'html',
        title:
          'What methodology is used to collect and sort data on long-term strategies?  ',
        answer:
          // eslint-disable-next-line quotes
          `<p>The structured indicators used for presenting LTS information are adapted from several previous WRI papers, including <a href="https://www.wri.org/publication/early-insights-long-term-climate-strategies" rel="noopener noreferrer" target="_blank">Early Insights on Long-term Climate Strategies</a> and <a href="https://www.wri.org/publication/designing-G20-long-term-strategies" rel="noopener noreferrer" target="_blank">Long-term Low Greenhouse Gas Emission Development Strategies: Approaches and Methodologies for Their Design</a>.</p><p>All data collected in this database come strictly from the LTS submissions only. No evaluation of ambition has been undertaken. Rather the database is provided to facilitate transparency and understanding of countries' long-term strategies.</p>`
      },
      {
        type: 'html',
        title:
          'Is there a way to compare several long-term strategies together? ',
        answer:
          'Yes - Climate Watch has developed a Compare All Targets Module that enables users to view and compare multiple long-term strategies at once. It also allows users to compare other commitments, including NDC targets, laws, and policies. Explore a summary of which countries have adopted each type of document and compare all of them side-by-side <a href="https://www.climatewatchdata.org/compare-all-targets" rel="noopener noreferrer" target="_blank">here</a>. '
      }
    ]
  },
  {
    label: 'Net-Zero module',
    slug: 'nz',
    content: [
      {
        type: 'html',
        title: 'What is a net-zero target? ',
        answer:
          '<p>At a country level, reaching or committing to reach net-zero emissions by a certain year means that GHG emissions released to the atmosphere from sources within the country’s territory in the target year do not exceed GHGs removed from the atmosphere by sinks within the country’s territory in the target year.</p><p>At the global level, the term net-zero emissions means achieving a balance between anthropogenic emissions and removals of GHGs in a given time period (typically a year).</p>'
      },
      {
        type: 'html',
        title: 'Why is the target year for a net-zero target important? ',
        answer:
          'According to IPCC scenarios, if warming is to be limited to below 1.5&#8451, any country that still has net-positive CO<sub>2</sub> emissions in 2044 or net-positive GHG emissions in 2066 will need to be matched by negative emissions in other countries. Accordingly, countries should aim to achieve their net-zero target as early as feasible, taking into consideration the current national inventory of emissions and removals, pathways and options for emissions and removals, and equity.'
      },
      {
        type: 'html',
        title:
          'How does the target status or legal status of a net-zero target affect the target? ',
        answer:
          'Net-zero targets have taken a number of different forms, in different policy instruments, and differ widely regarding the binding nature of the commitment. The strength of the policy setting for the net-zero target will likely affect the extent to which it compels a country to take near-term action towards achieving the target. '
      },
      {
        type: 'html',
        title:
          'Why is it important to track whether a net-zero target permits use of international GHG mitigation? ',
        answer:
          'To ensure the highest level of ambition, countries should prioritize reducing domestic GHG emissions and enhancing domestic GHG removals rather than relying on purchases of GHG mitigation as a primary means of meeting a net-zero target. However, if international transfers of GHG mitigation are deemed necessary to meet the target, countries should consider limiting the portion of the net-zero target that may be met through international GHG mitigation. A limit will maintain clear signals for domestic mitigation and investment and avoid locking in long-lived carbon-intensive infrastructure. '
      },
      {
        type: 'html',
        title:
          'Why is it important to track whether a net-zero target includes international shipping and aviation? ',
        answer:
          'Since emissions from international shipping and aviation fall outside of national boundaries (and, consequently, out of jurisdiction), inclusion or exclusion of these sectors within a net-zero target determines the ambition of the commitment. Net-zero targets that include all emissions from international shipping and aviation reflect the highest possible level of ambition. '
      }
    ]
  },
  {
    label: 'NDC-SDG linkages module',
    slug: 'ndc_sdg',
    content: [
      {
        type: 'html',
        title: 'How are the NDC-SDG linkages determined?',
        answer:
          'WRI\'s working paper <a href="https://www.wri.org/publication/examining-alignment-between-intended-nationally-determined-contributions-and-sustainable" rel="noopener noreferrer" target="_blank" >"Examining the Alignment between the Intended Nationally Determined Contributions and the Sustainable Development Goals"</a> outlines the methodology and a more detailed technical note is forthcoming. Linkages are determined through textual analysis of the Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) to identify alignments of targets, actions, policy measures and needs. Analysis was only conducted at the target level, meaning the texts of submitted NDCs were compared against the text of the 169 SDG targets. The language in the 17 SDGs is broader than in the targets, so analysis was not conducted at that level. What appears as goal level analysis (on the landing page of the NDC-SDG module) is an aggregation of the analysis at the target level. It is important to note that this analysis only looks at countries’ NDCs and so does not necessarily reflect a country’s actions in the real world. Lastly, the analysis is inherently subjective, so other analysis may result in different conclusions. If this is the case, please let us know at <a href="mailto:climatewatch@wri.org">climatewatch@wri.org</a>. Our aim is to be entirely transparent in our analysis, identifying the exact text in the NDC for each point of alignment identified so that users can confirm for themselves.'
      },
      {
        type: 'text',
        title:
          'How are NDCs submitted in other languages dealt with when analyzing the linkages? ',
        answer:
          'The NDCs of 22 countries included in the NDC-SDG linkages analysis don’t have an official or unofficial translations; for those, analysts at the World Resources Institute relied on Google translation services and native speaker verification. '
      },
      {
        type: 'text',
        title: 'How frequently is the data updated? ',
        answer:
          'NDC-SDG linkages data are updated as new NDCs are submitted or revised.'
      },
      {
        type: 'html',
        title:
          "Why is no text highlighted when I choose an SDG target from some countries' NDCs? ",
        answer:
          '<p>The NDC-SDG highlighted text feature only works with the English version of the latest I/NDC submitted countries.</p><p>On each country page, clicking on one of the dots in the NDC-SDG linkage summary at the bottom of the page will direct the users to the country’s latest NDC submission and highlight where the linkage between the NDC’s text and that SDG target was identified. However, if this latest submission is not in English, no highlights will appear. The users will have to refer to the English version of that same submission to be able to use the NDC-SDG highlighted text feature.</p><p>On the NDC-SDG Linkages Map, clicking on a country will direct you to the country’s latest NDC submission. However, if this latest submission is not in English, no highlights will appear. The users will have to refer to the English version of that same submission to be able to use the NDC-SDG highlighted text feature.</p>'
      },
      {
        type: 'text',
        title: 'Why are data missing for some countries? ',
        answer:
          'As per our methodology, no data could be captured for the following Parties: Andorra, Iceland, Kyrgyzstan, New Zealand, Serbia, Ukraine and the United Arab Emirates (UAE).  '
      }
    ]
  },
  {
    label: 'Pathways',
    slug: 'pathways',
    content: [
      {
        type: 'text',
        title: 'What is the Pathways tool?',
        answer:
          'Pathways allows you to explore economic and emissions scenarios from a database of models from the IPCC, private sector and country-specific providers.'
      },
      {
        type: 'html',
        title: 'How can I use the Pathways tool?',
        answer:
          'Pathways can be used to better understand the different development paths a country can take to reach its emission and sustainable development targets. The tool lets the user explore indicators and assumptions that make up each development pathway. It can be used to inform policy decisions to follow a certain pathway and work toward targets.<p> To watch a demo of the tool, please watch <a href="https://register.gotowebinar.com/register/7938728331287880705" rel="noopener noreferrer" target="_blank">this webinar</a>.</p>'
      },
      {
        type: 'text',
        title:
          'What is your criteria for selecting models and scenarios? Will more be added?',
        answer:
          'The models included on Pathways are published in peer-reviewed publications or are part of a government report, or have been widely used by governments. We welcome additional modeling teams and institutions to add their models and contact us about uploading their data.'
      },
      {
        type: 'html',
        title: 'What are the differences between the models and scenarios?',
        answer:
          "<p>Models in this context are computer programs used to investigate climate change mitigation and adaptation options as well as other potential targets, like economic targets or energy targets. They can be run using different input assumptions, for example a certain mix of energy sources. The inputs and outputs used in a model are collectively referred to as a “scenario,” so there may be multiple scenarios under one model.</p><p>Please note that using scenarios is different from forecasting or making projections. A forecast or projection tries to predict the future state of a system, like what the economy or a country's energy mix will be in ten years; a scenario within one of these models is a set of outputs assuming one of many different combinations of a country’s energy mix. </p>"
      },
      {
        type: 'text',
        title:
          'What do the models say about whether we’re on track to keep global warming below 2°C? ',
        answer:
          'The answer to this question varies by scenario. Almost all Business as Usual or Reference Case scenarios show that we are not on track to keep global warming under 1.5-2°C. However, more ambitious scenarios show that it is possible to keep the global warming under 1.5-2°C. Many rely on carbon removal approaches, such as  carbon capture and storage with bioenergy (BECCS), coupled with greater mitigation ambitions, such as increased renewable energy generation.'
      },
      {
        type: 'text',
        title:
          'Why can’t I compare countries and regions across different models?',
        answer:
          'Comparisons across multiple models introduce concerns about comparability, since indicators have different definitions and models might vary significantly in their scope, complexity and assumptions.'
      },
      {
        type: 'html',
        title: 'I am a modeler. How can I submit information for my model? ',
        answer:
          'We are always looking to grow our database by adding new models. To upload your model and scenarios to Pathways, send us an email at <a href="climatewatch@wri.org">ClimateWatch@WRI.org</a> and we will send you with further information about model management and the data upload process. '
      }
    ]
  },
  {
    label: 'Country profiles',
    slug: 'countries',
    content: [
      {
        type: 'text',
        title: 'Is there a country profile for every country? ',
        answer:
          'There are country profiles for all parties to the United National Framework Convention on Climate Change (UNFCCC) – 196 countries plus the European Union group of 28 counties, which submitted their NDC together.'
      },
      {
        type: 'text',
        title:
          'What was the process for choosing the metrics for the “Climate Vulnerability and Readiness” section?',
        answer:
          'The indicators were selected because they have data that are geographically comprehensive, updated regularly and tells a compelling story that links poverty, vulnerability and climate impacts. These indicators show that the poor are most vulnerable to climate risks such as sea level rise, increases in temperature and more erratic rainfall. This section also includes indicators that show the extent to which a country is ready to adapt to climate change to reduce its vulnerability to climate impacts.'
      },
      {
        type: 'html',
        title:
          'How can the data be used in the "Climate Vulnerability and Readiness" section? ',
        answer:
          '<p>Policymakers and donors can use this data to get a snapshot overview of a country’s need to reduce its vulnerability to climate impacts and in comparison with other countries.</p><p>Civil society and media can use information on poverty, risks, vulnerabilities and readiness for communications and advocacy on adaptation and reducing a country’s vulnerability to climate impacts. </p><p>For researchers and adaptation planners, this information acts as a gateway to more detailed information and data sets on adaptation through platforms such as the <a href="http://sdwebx.worldbank.org/climateportal/" rel="noopener noreferrer" target="_blank">Climate Change Knowledge Portal</a> and <a href="https://www.predata.com/" rel="noopener noreferrer" target="_blank">PREPdata.</a></p>'
      },
      {
        type: 'table',
        title:
          'What document types are included in the timelines on the country profile pages? ',
        answer:
          '<p>The country profiles include links to documents submitted to the UNFCCC by parties. A summary of the document types, their purposes, which Parties submit them and how often is below:</p><table />',
        tableData: [
          {
            'Document type': 'National Communication (NC)',
            Purpose:
              'All Parties include information on national circumstances and GHG inventories. Annex 1 Parties also include projections and total effect of policies and measures; vulnerability assessment, climate change impacts, and adaptation measures; financial resources and transfer of technology; research and systematic observation; and education, training, and public awareness. Non-Annex 1 countries include a general description of steps taken or envisioned to implement the Convention; other information considered relevant to the achievement of the objective of the Convention; and constraints, gaps, and related financial, technical, and capacity needs',
            'Submitting Parties': 'All Parties',
            Frequency:
              'Non-Annex I Parties are required to submit their first NC within three years of entering the Convention and every four years thereafter. Annex I Parties submit every four years.'
          },
          {
            'Document type': 'Biennial Report (BR)',
            Purpose:
              'BRs include GHG emission trends, quantified economy-wide emission reduction target and progress in achievement of this target, GHG projections and provision of financial, technological and capacity building support.',
            'Submitting Parties': 'Annex I Parties',
            Frequency:
              'The first BR should have been submitted by January 1, 2014, and every two years after that.'
          },
          {
            'Document type': 'Biennial Update Report (BUR)',
            Purpose:
              'BURs include information on national circumstances and institutional arrangements; national GHG inventory; mitigation actions and their effects; constraints and gaps, and related financial, technical and capacity needs, including a description of support needed and received; information on the level of support received; and information on domestic measurement reporting and verification.',
            'Submitting Parties': 'Non-Annex I Parties',
            Frequency:
              "The first BUR should have been submitted by December 2014, or consistent with the Party's capabilities or level of support, and every two years thereafter in conjunction with their NC or as a stand-alone report."
          },
          {
            'Document type': 'Pre-2020 Cancun Targets and Actions',
            Purpose:
              'The Cancun pledges are quantified economy-wide emission reduction targets for the period to 2020.',
            'Submitting Parties':
              'Annex I Parties and many non-Annex I Parties',
            Frequency:
              'These were one-time only pledges submitted at the 2010 Conference of the Parties in Cancun, Mexico.'
          },
          {
            'Document type': 'I/NDC',
            Purpose:
              'Post-2020 climate actions submitted by countries in the run up to COP21 in Paris in 2015. The “I” is dropped once countries as Parties formally join the agreement. Some countries also submitted NDCs either as an update to their INDC or as their first submission. There is no standard format for I/NDCs, but they should be ambitious, equitable, and transparent.',
            'Submitting Parties': 'All Parties',
            Frequency:
              'INDCs were submitted before COP21 in 2015, and in early 2016, and Parties are expected to make revisions by 2020 and every five years thereafter. '
          },
          {
            'Document type': 'Long-term Strategy',
            Purpose:
              'These are long-term low greenhouse gas emission development strategies for the period to mid-century (2050).',
            'Submitting Parties': 'All Parties',
            Frequency:
              'Parties are invited to communicate long-term strategies by 2020, in accordance with Article 4, paragraph 19, of the Paris Agreement.'
          },
          {
            'Document type':
              'National GHG Inventory (full inventory and common tabular format)',
            Purpose:
              'The inventory covers emissions and removals of direct GHGs (carbon dioxide, methane, nitrous oxide, perfluorocarbons, hydrofluorocarbons, sulphur hexafluoride and nitrogen trifluoride) from five sectors (energy; industrial processes and product use; agriculture; land use, land-use change and forestry; and waste), and for all years from the base year (or period) to two years before the inventory is due (e.g. the inventories due 15 April 2016 cover emissions and removals for all years from the base year to 2014).',
            'Submitting Parties': 'Annex I Parties ',
            Frequency:
              'Annex I Parties are required to submit by April 15 every year. '
          },
          {
            'Document type':
              'Strategies and Approaches for Scaling Up Climate Finance ',
            Purpose:
              'Strategies and approaches for scaling up finance during the period from 2014 to 2020. ',
            'Submitting Parties': 'Annex I Parties ',
            Frequency: 'Every two years. '
          },
          {
            'Document type': 'National Adaptation Plans  ',
            Purpose:
              'NAPs are a means of identifying medium- and long-term adaptation needs and developing and implementing strategies and programs to address those needs. ',
            'Submitting Parties': 'All Parties ',
            Frequency:
              'Not applicable – it is a continuous, progressive and iterative process.  '
          }
        ]
      }
    ]
  },
  {
    label: 'My Climate Watch',
    slug: 'my_climate_watch',
    content: [
      {
        type: 'text',
        title: 'How can I use MyClimateWatch?',
        answer:
          'My Climate Watch is a feature that allows you to explore data on emission and economic scenarios from the Pathways module in depth and create and easily share custom visualizations such as timeseries charts, stacked bar charts and pie charts. '
      },
      {
        type: 'html',
        title: 'How do I log into MyClimateWatch?',
        answer:
          'Log into <link to="/my-climate-watch" innertext="MyClimateWatch"> using your Google, Twitter or Facebook account. Registration and log-in via email are forthcoming.'
      }
    ]
  }
];
