export const sectionsData = [
  {
    label: 'General questions',
    slug: 'general_questions',
    content: [
      {
        type: 'text',
        title: 'What is Climate Watch?',
        answer:
          "Climate Watch offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries' climate progress."
      },
      {
        type: 'html',
        title: 'Who is this tool for? ',
        answer:
          'Government ministries, development organizations, civil society organizations and researchers can use Climate Watch to find and download data about global emissions, climate commitments, sustainable development and other topics. Visit our <Link to="/" innertext="homepage" /> to see what we can offer you. '
      },
      {
        type: 'html',
        title: 'Can I download the data?',
        answer:
          '<span>Yes, all the data published on Climate Watch are free and open. This means you can download data and use it for your own analysis with proper attribution (see question 4). Use the Data Explorer at the top right corner of the homepage to explore the datasets and download one or more of them. Visit our <Link to="/about/permissions" innertext="Permissions and Licensing" />  page for more information about using the data.<span>'
      },
      {
        type: 'html',
        title: 'How do I cite Climate Watch data as a source?',
        answer:
          '<span>Use the info button next to each dataset and figure on Climate Watch to see its citation information.  A general citation for Climate Watch is as follows: Climate Watch. 2022. Washington, D.C.: World Resources Institute. Available online at: <link to="/" innerText="www.climatewatchdata.org"></link>. See our <Link to="/about/permissions" innertext="Permissions and Licensing" />  page for more information about citation.  '
      },
      {
        type: 'html',
        title: 'What makes Climate Watch data credible?',
        answer:
          'Climate Watch is based on data sources that are: <ul><li>Officially reported by national governments under the United Nations Framework Convention on Climate Change or gathered by reputable institutions (e.g., World Bank, United Nations Development Programme) and research organizations (e.g., Potsdam Institute for Climate Impact Research, World Resources Institute).</li><li>Well-documented with a methodology that includes rigorous quality checks and data validation</li><li>Available for the majority of countries and updated on a regular basis</li><li>Publicly available </li></ul>'
      },
      {
        type: 'html',
        title: 'Who is behind Climate Watch?',
        answer:
          'Visit our <Link to="/about/partners" innertext="Partners" /> page to see all the organizations involved in developing and managing Climate Watch. The platform is managed on a daily basis by World Resources Institute and is part of the <a href="https://resourcewatch.org/" rel="noopener noreferrer" target="_blank">Resource Watch</a> family of data platforms. The name “Climate Watch” refers only to the platform and not to any particular organization.'
      },
      {
        type: 'text',
        title: 'How significant are uncertainties in the data? ',
        answer:
          'The level of uncertainly depends on the data source. Each page includes links to data sources and methodology documentation that has additional details. You can view this information by clicking on the (i) buttons on any page and dataset. '
      },
      {
        type: 'html',
        title: 'How frequently is the data updated?',
        answer:
          '<Link to="/countries" innertext="Country profiles" /> are updated at least once per year. Links to UNFCCC submissions are updated more frequently as new documents are submitted. <Link to="/ghg-emissions" innertext="Historical GHG emissions" /> are updated as available. It takes at least 1-2 years for organizations to compile, process and report GHG data; thus, the last year of complete GHG data will often be 2-3 years behind the current calendar year.<p><Link to="/ndcs-content" innertext="NDC content" /> is updated as new NDCs are submitted to the UNFCCC.</p><p> <Link to="/ndcs-sdg" innertext="NDC-SDG linkages" /> are not regularly updated, but are up to date covering NDCs submitted prior to May 2021.</p>'
      },
      {
        type: 'html',
        title:
          'What should I do if I believe a dataset on Climate Watch is inaccurate or that better data exists?',
        answer:
          'Much of the data on Climate Watch are obtained from other sources and we aim to make them all transparent. Make sure you have read and understood the sources and methodologies when using Climate Watch data. If you have additional questions, please contact us at <a href="mailto:climatewatch@wri.org"> climatewatch@wri.org</a>.'
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
            'Climate Watch':
              'The Climate Watch dataset is the most comprehensive included on Climate Watch and includes all sectors and gases. In order to emphasize comparability of data across countries, it does not use countries’ official inventories reported to the UNFCCC. It has a 3 year lag.',
            'PIK PRIMAP-hist':
              'The PIK PRIMAP-hist dataset included on Climate Watch combines UNFCCC reported data where available and fills gaps with other sources. It does not include land use change and forestry (LUCF) but covers all other sectors and has a 3 year lag. Additional data to what is shown on Climate Watch is available from <a href="https://www.pik-potsdam.de/paris-reality-check/primap-hist/">PIK</a>.',
            UNFCCC:
              'UNFCCC includes only officially reported data by countries. It has large data gaps for non-Annex I countries. Due to different reporting requirements for Annex I and non-Annex I countries, the data is not internally comparable. It covers all sectors and has 2-3 year lag.',
            GCP:
              'GCP provides the most recent CO2 emissions with a 1 year lag (new data is released in December for the previous year). It includes CO2 emissions from fossil fuel combustion, cement production, and bunkers.'
          },
          {
            '': 'Original data sources used',
            'Climate Watch':
              'International Energy Agency (IEA), U.S. Environmental Protection Agency, U.N. Food and Agriculture Organization, Global Carbon Project. See more detailed information about sources <a href="https://wri-sites.s3.us-east-1.amazonaws.com/climatewatch.org/www.climatewatch.org/climate-watch/wri_metadata/CW_GHG_Method_Note.pdf">here</a>.',
            'PIK PRIMAP-hist':
              'Uses countries’ official inventories reported to the UNFCCC as a basis, and fills in with data from other sources, including CDIAC, Emissions Database for Global Atmospheric Research (EDGAR), and FAO, among others. See all sources <a href="https://doi.org/10.5194/essd-8-571-2016">here</a>.',
            UNFCCC:
              'The inventory data are provided in the annual GHG inventory submissions by Annex I Parties and in the National Communications and Biennial Update Reports by non-Annex I Parties.',
            GCP:
              ' The CDIAC-FF emissions dataset, derived largely from UN energy data, forms the foundation. Emissions are extended to year Y-1 using energy growth   rates reported by BP. Estimates are then replaced using data from what consider to be superior sources, for example Annex 1 countries’ official submissions to the UNFCCC. For full details see sources section on Global Carbon Atlas <a href="http://www.globalcarbonatlas.org/en/CO2-emissions">here</a>.'
          },
          {
            '': 'Temporal coverage',
            'Climate Watch': '1990-2019',
            'PIK PRIMAP-hist': '1850-2019',
            UNFCCC:
              '1990-2019 for Annex I countries; Varied coverage for non-Annex I countries',
            GCP: '1960-2020'
          },
          {
            '': 'Geographic coverage',
            'Climate Watch': 'UNFCCC member states',
            'PIK PRIMAP-hist':
              'UNFCCC member states and non-UNFCCC territories',
            UNFCCC:
              'All 43 Annex I Parties; 148 of the 154 non-Annex I Parties',
            GCP:
              'UNFCCC member states and non-UNFCCC territories, additional regions and country groups'
          },
          {
            '': 'Sector coverage (sector definitions may vary across sources)',
            'Climate Watch':
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
            'Climate Watch': 'Kyoto GHGs (CH4, CO2, N2O, F-gases)',
            'PIK PRIMAP-hist': 'Kyoto GHGs (CH4, CO2, N2O, F-gases)',
            UNFCCC: 'Kyoto GHGs (CH4, CO2, N2O, F-gases)',
            GCP: 'CO2 only'
          },
          {
            '': 'Timeliness',
            'Climate Watch': '3 year lag',
            'PIK PRIMAP-hist': '3 year lag',
            UNFCCC: '2-3 year lag',
            GCP: '1-2 year lag'
          },
          {
            '': 'Use of country reported data to the UNFCC',
            'Climate Watch': 'Does not use UNFCCC reported data',
            'PIK PRIMAP-hist': 'Uses UNFCCC reported data and fills gaps',
            UNFCCC: 'Only uses UNFCCC reported data',
            GCP: 'Uses UNFCCC reported data and fills gaps'
          },
          {
            '': 'Comparable methodology across countries',
            'Climate Watch':
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
          'What are the definitions of the different emissions sectors from the Climate Watch data? ',
        answer:
          'You can find the definitions of all Climate Watch data sectors in our <a href="https://wri-sites.s3.us-east-1.amazonaws.com/climatewatch.org/www.climatewatch.org/climate-watch/wri_metadata/CW_GHG_Method_Note.pdf">Climate Watch Methodology</a>.'
      },
      {
        type: 'html',
        title:
          'How significant are uncertainties in the emissions data, particularly in the land-use change and forestry sector? ',
        answer:
          'According to the Working Group III Contribution to the IPCC Sixth Assessment Report, estimated uncertainly for global CO<sub>2</sub> emissions from fossil fuels is relatively low, about 8%. For non-CO<sub>2</sub> GHG emissions, CH<sub>4</sub> and F-gases have relatively ‘intermediate’ uncertainties of around 30%, while N<sub>2</sub>O has a higher uncertainty of around 60%. CO22 emissions from land-use change and forestry have very large uncertainties of 70%. In total, when combining these uncertainties, estimates of global total GHG emissions have an uncertainty of around 10%.<br>You can find out more about the uncertainties in the Climate Watch data in our <a href="https://wri-sites.s3.us-east-1.amazonaws.com/climatewatch.org/www.climatewatch.org/climate-watch/wri_metadata/CW_GHG_Method_Note.pdf">Methodology</a> document.'
      },
      {
        type: 'html',
        title: 'Why do some countries have sectors with negative emissions?',
        answer:
          '<p>The Land-use Change & Forestry (LUCF) sector can be a carbon sink or a source of emissions. Trees and other vegetation take up carbon dioxide from the atmosphere, but they also release emissions when they are cut down, burned or converted to other land uses. Depending on the balance between emissions and carbon sequestration in this sector within a country’s territory, the resulting net emissions could be positive or negative.</p><p>This WRI <a href="https://www.wri.org/insights/forests-absorb-twice-much-carbon-they-emit-each-year">article</a> has more detail on how trees contribute to carbon sequestration.</p>'
      },
      {
        type: 'html',
        title:
          'Why is the value from total World GHG emissions different from the aggregation of all individual countries GHG emissions?',
        answer:
          'It is important to note that the sum of all countries’ emissions data available in Climate Watch dataset will not be the same as the World total. This is due to two reasons: <ul><li>International bunker fuel related emissions are not included in the country-level totals following the IPCC methodology, which account for around 1.3 GtCO<sub>2</sub>e;</li><li>In addition, Climate Watch dataset only covers 190+ countries (all of which are parties to the UNFCCC), leaving out other territories that could also be releasing anthropogenic emissions data.</li></ul>'
      },
      {
        type: 'html',
        title:
          'Is Climate Watch’s GHG emissions data production or consumption based?',
        answer:
          '<p>Climate Watch provides production-based emissions data.</p><p>The Paris Agreement requires participating countries to submit emission inventories that are based on activities within their territory. All the inventories on Climate Watch are based on this production-based accounting.</p><p>Consumption-based accounting tracks emissions based on where the end products are used or consumed, as opposed to where they are produced. This information can help to identify which actions on a product level could be most efficient to reduce emissions globally. For example, countries that import a lot of emission-intensive products could decide to help exporting countries to improve their carbon intensity of manufacturing.</p><p>There are other data sources that publish consumption-based numbers, including <a href="https://ourworldindata.org/consumption-based-co2">Our World in Data</a>.</p>'
      },
      {
        type: 'html',
        title:
          'Why are emissions estimates fluctuating significantly from year to year for some countries?',
        answer:
          '<p>The jumps in emissions data are often related to the forestry sector emissions. These jumps result from the reporting methodology of its underlying data source, FAOSTAT, which uses the Forest Resource Assessment published every 5 years. FAOSTAT is interpolating this data over those 5-year periods and if there were significant differences in emissions between these periods, it may result in a jump on our graphics.</p><p>To find out more about the Forest Resource Assessment, you can access this <a href="https://www.wri.org/insights/insider-global-forest-watch-and-forest-resources-assessment-explained-5-graphics">blogpost</a>.</p>'
      },
      {
        type: 'html',
        title:
          'WWhy are UNFCCC emissions estimates scattered for certain Non-Annex I countries?',
        answer:
          '<p>The reporting requirements for GHG inventories are different for Annex I and Non-Annex I Parties of the UNFCCC. Unlike Annex-I countries who report their GHG inventories annually through National Inventory Reports and in common reporting format (CRF) tables, Non-Annex I countries report their emissions data through National Communications and Biennial Update Reports which are submitted in different points and in varied forms.</p><p>Furthermore, Climate Watch only publishes data collected and made available through UNFCCC’s GHG data interface, which displays data ‘as received’ from Parties. Climate Watch does not attempt data collection on our own. Some Non-Annex I Parties submitted their GHG inventory data using the format of the 2006 IPCC Guidelines for reporting GHG emissions/removals and are not included in UNFCCC’s data interface. Thus, those emissions inventories are not available through Climate Watch.</p><p>For the most up to date list of latest reports, please visit UNFCCC page <a href="https://unfccc.int/process-and-meetings/transparency-and-reporting/greenhouse-gas-data/notes-on-ghg-data">here</a>. Direct access to the latest NCs and BURs documents can be found in the UNFCCC timeline  at the top of each Climate Watch Country Profile page.</p>'
      },
      {
        type: 'html',
        title:
          'Why are Climate Watch emissions estimates different from those reported by countries in their national inventories?',
        answer:
          '<p>Due to the differences in data sources and methodologies used, Climate Watch estimated country GHG emissions are inevitably different from official inventories reported by countries.</p><p>Parties to the UNFCCC are required to “develop, update periodically, publish and make available to the Conference of the Parties (COP), their national inventories of anthropogenic emissions by sources and removals by sinks of all greenhouse gases not controlled by the Montreal Protocol.” Due to differences in capacity and resources available for Annex I Parties to the Convention and Non-Annex I Parties, not all countries have a full time-series GHG data available. With the different reporting requirements and guidelines, not all inventories reported by parties to the UNFCCC are comparable to each other.</p><p>Climate Watch Country GHG Emissions dataset is provided to offer a comprehensive and comparable dataset across countries, and as a complement to the official inventories that are available.</p>'
      }
    ]
  },
  {
    label: 'Explore NDCs module',
    slug: 'ndc',
    content: [
      {
        type: 'text',
        title: 'What are NDCs? ',
        answer:
          'In the lead up to the Paris Climate Conference in December 2015, Parties were invited by the UNFCCC to communicate their national plans to address climate change, known as Intended Nationally Determined Contributions, or INDCs. A country’s INDC is converted to a Nationally Determined Contribution (NDC) when it formally joins the Paris Agreement by submitting an instrument of ratification, acceptance, approval or accession.'
      },
      {
        type: 'text',
        title: 'How are NDCs assessed? ',
        answer:
          'The NDC Content module of Climate Watch presents contributions submitted by Parties in different forms, including visualizations, structured indicators, and original text. The module does not evaluate the ambition of contributions. The data presented are submitted by countries and are intended to make these documents more transparent, accessible, comparable and easier to understand.  '
      },
      {
        type: 'html',
        title:
          'Can you explain some of the terms used, like target, policy, action and plan?',
        answer:
          '<ul><li>Targets are an intention to achieve a specific result, for example, to reduce GHG emissions to a specific level (a GHG target) or increase energy efficiency or renewable energy to a specific level (a non-GHG target), typically by a certain date.</li><li>Actions are an intention to implement specific means of achieving GHG reductions, usually in forms of concrete projects.</li><li>Policies are domestic planning documents such as policies, regulations or guidlines. </li><li>Plans and strategies are broader than specific policies or actions, such as a general intention to ‘improve efficiency’, ‘develop renewable energy’, etc. The terms come from the World Bank\'s <a href="http://spappssecext.worldbank.org/sites/indc/Pages/INDCHome.aspx" rel="noopener noreferrer" target="_blank" >NDC platform</a> and WRI\'s <a href="https://www.wri.org/research/designing-and-preparing-intended-nationally-determined-contributions-indcs" rel="noopener noreferrer" target="_blank" >publication</a> (Figure 4.1). </li></ul>'
      },
      {
        type: 'html',
        title: 'What is the methodology behind the data? ',
        // eslint-disable-next-line quotes
        answer: `<p>Some of the key indicators of the NDC analysis are explained <a href="https://wri-sites.s3.us-east-1.amazonaws.com/climatewatch.org/www.climatewatch.org/climate-watch/wri_metadata/NDC_methodology.pdf" rel="noopener noreferrer" target="_blank">in this document</a>.</p><p>The structured indicators used for presenting NDC information are adapted from several data sources, including the <a href="http://spappssecext.worldbank.org/sites/indc/Pages/INDCHome.aspx" rel="noopener noreferrer" target="_blank">World Bank's NDC Platform</a> and  <a href="https://klimalog.die-gdi.de/ndc/#NDCExplorer/worldMap?NDC??income???catIncome" rel="noopener noreferrer" target="_blank">DIE's NDC Explorer</a>. Please refer to respective resources for detailed documentation. The terms and phrases used in this tool follow, to the extent possible, those outlined in WRI’s publication <a href="https://www.wri.org/publication/designing-and-preparing-indcs" rel="noopener noreferrer" target="_blank">"Designing and Preparing INDCs."</a></p>`
      },
      {
        type: 'text',
        title: 'How does the module handle non-English NDCs? ',
        answer:
          'NDCs can be submitted using any of the 6 official UN languages: Arabic, Chinese, English, French, Spanish, and Portuguese. For non-English submissions that are accompanied by an English translation, the English version is used as the basis for analysis. For those that don’t provide translations, Google Translate is used, and the translated version is presented, along with the original full text. '
      },
      {
        type: 'text',
        title: 'How does the NDC keyword search work with translation? ',
        answer:
          'Searching for a word in English will produce results only among I/NDCs that are in English; similarly searching for a word in French would produce results among I/NDCs in French. '
      },
      {
        type: 'text',
        title:
          'How do we determine enhanced ambition/overall comparison with previous NDC? ',
        answer:
          'You can find all the indicators from the “Overall comparison with previous NDC” in this <a href="https://wri-sites.s3.us-east-1.amazonaws.com/climatewatch.org/www.climatewatch.org/climate-watch/wri_metadata/NDC_methodology.pdf" rel="noopener noreferrer" target="_blank">link</a>.'
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
        title: 'Why are long-term strategies needed? ',
        answer:
          'Ambitious long-term strategies are vital since current national commitments are only sufficient enough to limit warming to 2.7-3.7&#8451 (4.9-6.7&#8457). Not only do long-term strategies present an opportunity to bring national action in line with needed ambition, but they also encourage countries to avoid costly investments in high-emissions technologies.'
      },
      {
        type: 'html',
        title: 'What are the key elements of long-term strategies? ',
        answer:
          '<p>The scope and depth of long-term strategies will be determined by countries. Accordingly, there is no one-size-fits-all format or structure for a long-term strategy. However, some key elements of a long-term strategy could include:</p><ul><li>A long-term vision; </li><li>Sustainable development considerations; </li><li>Mitigation elements (including a long-term quantified outcome for GHG emissions reductions and results of mitigation models and scenarios); </li><li>Adaptation elements;  </li><li>Sectoral strategies (including policies and actions, milestones to be achieved over time, information on managing the transition to the long-term goals, among others); </li><li>Implementation approaches; </li><li>Monitoring plans and revisions processes. </li></ul>'
      },
      {
        type: 'html',
        title:
          'What methodology is used to collect and sort data on long-term strategies?  ',
        answer:
          // eslint-disable-next-line quotes
          `<p>The structured indicators used for presenting LTS information are adapted from several previous WRI papers, including <a href="https://www.wri.org/publication/early-insights-long-term-climate-strategies" rel="noopener noreferrer" target="_blank">Early Insights on Long-term Climate Strategies</a> and <a href="https://www.wri.org/publication/designing-G20-long-term-strategies" rel="noopener noreferrer" target="_blank">Long-term Low Greenhouse Gas Emission Development Strategies: Approaches and Methodologies for Their Design</a>.</p><p>All data collected in this database come strictly from the LTS submissions only. No evaluation of ambition has been undertaken. Rather the database is provided to facilitate transparency and understanding of countries' long-term strategies.</p>`
      },
      {
        type: 'html',
        title:
          'Is there a way to compare several long-term strategies together? ',
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
          '<p>At a country level, reaching or committing to reach net-zero emissions by a certain year means that GHG emissions released to the atmosphere from sources within the country’s territory in the target year do not exceed GHGs removed from the atmosphere by sinks within the country’s territory in the target year.</p><p>At the global level, the term net-zero emissions means achieving a balance between anthropogenic emissions and removals of GHGs in a given time period (typically a year).</p><p>See <a href="https://wri-sites.s3.us-east-1.amazonaws.com/climatewatch.org/www.climatewatch.org/climate-watch/wri_metadata/Net-Zero_Tracker_Methodology.pdf" rel="noopener noreferrer" target="_blank">this document</a> for more information about the methodology for the Net-Zero Tracker. </p>'
      },
      {
        type: 'html',
        title: 'Why is the target year for a net-zero target important? ',
        answer:
          'According to IPCC scenarios, if warming is to be limited to below 1.5&#8451, any country that still has net-positive CO<sub>2</sub> emissions in 2044 or net-positive GHG emissions in 2066 will need to be matched by negative emissions in other countries. Accordingly, countries should aim to achieve their net-zero target as early as feasible, taking into consideration the current national inventory of emissions and removals, pathways and options for emissions and removals, and equity.'
      },
      {
        type: 'html',
        title:
          'How does the target status or legal status of a net-zero target affect the target? ',
        answer:
          'Net-zero targets have taken a number of different forms, in different policy instruments, and differ widely regarding the binding nature of the commitment. The strength of the policy setting for the net-zero target will likely affect the extent to which it compels a country to take near-term action towards achieving the target. '
      },
      {
        type: 'html',
        title:
          'Why is it important to track whether a net-zero target permits use of international GHG mitigation? ',
        answer:
          'To ensure the highest level of ambition, countries should prioritize reducing domestic GHG emissions and enhancing domestic GHG removals rather than relying on purchases of GHG mitigation as a primary means of meeting a net-zero target. However, if international transfers of GHG mitigation are deemed necessary to meet the target, countries should consider limiting the portion of the net-zero target that may be met through international GHG mitigation. A limit will maintain clear signals for domestic mitigation and investment and avoid locking in long-lived carbon-intensive infrastructure. '
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
          'WRI\'s working paper <a href="https://www.wri.org/publication/examining-alignment-between-intended-nationally-determined-contributions-and-sustainable" rel="noopener noreferrer" target="_blank" >"Examining the Alignment between the Intended Nationally Determined Contributions and the Sustainable Development Goals"</a> outlines the methodology and a more detailed technical note is forthcoming. Linkages are determined through textual analysis of the Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) to identify alignments of targets, actions, policy measures and needs. Analysis was only conducted at the target level, meaning the texts of submitted NDCs were compared against the text of the 169 SDG targets. The language in the 17 SDGs is broader than in the targets, so analysis was not conducted at that level. What appears as goal level analysis (on the landing page of the NDC-SDG module) is an aggregation of the analysis at the target level. It is important to note that this analysis only looks at countries’ NDCs and so does not necessarily reflect a country’s actions in the real world. Lastly, the analysis is inherently subjective, so other analysis may result in different conclusions. If this is the case, please let us know at <a href="mailto:climatewatch@wri.org">climatewatch@wri.org</a>. Our aim is to be entirely transparent in our analysis, identifying the exact text in the NDC for each point of alignment identified so that users can confirm for themselves.'
      },
      {
        type: 'text',
        title:
          'How are NDCs submitted in other languages dealt with when analyzing the linkages? ',
        answer:
          'The NDCs of 22 countries included in the NDC-SDG linkages analysis don’t have an official or unofficial translations; for those, analysts at the World Resources Institute relied on Google translation services and native speaker verification. '
      },
      {
        type: 'text',
        title: 'How frequently is the data updated? ',
        answer:
          'NDC-SDG linkages data are updated as new NDCs are submitted or revised.'
      },
      {
        type: 'html',
        title:
          "Why is no text highlighted when I choose an SDG target from some countries' NDCs? ",
        answer:
          '<p>The NDC-SDG highlighted text feature only works with the English version of the latest I/NDC submitted countries.</p><p>On each country page, clicking on one of the dots in the NDC-SDG linkage summary at the bottom of the page will direct the users to the country’s latest NDC submission and highlight where the linkage between the NDC’s text and that SDG target was identified. However, if this latest submission is not in English, no highlights will appear. The users will have to refer to the English version of that same submission to be able to use the NDC-SDG highlighted text feature.</p><p>On the NDC-SDG Linkages Map, clicking on a country will direct you to the country’s latest NDC submission. However, if this latest submission is not in English, no highlights will appear. The users will have to refer to the English version of that same submission to be able to use the NDC-SDG highlighted text feature.</p>'
      }
    ]
  },
  {
    label: 'Pathways',
    slug: 'pathways',
    content: [
      {
        type: 'text',
        title: 'What is the Pathways tool?',
        answer:
          'Pathways allows you to explore economic and emissions scenarios from a database of models from the IPCC, private sector and country-specific providers.'
      },
      {
        type: 'html',
        title: 'How can I use the Pathways tool?',
        answer:
          'Pathways can be used to better understand the different development paths a country can take to reach its emission and sustainable development targets. The tool lets the user explore indicators and assumptions that make up each development pathway. It can be used to inform policy decisions to follow a certain pathway and work toward targets.'
      },
      {
        type: 'text',
        title:
          'What is your criteria for selecting models and scenarios? Will more be added?',
        answer:
          'The models included on Pathways are published in peer-reviewed publications, are part of a government report or have been widely used by governments. We welcome additional modeling teams and institutions to add their models and contact us about uploading their data.'
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
          'What do the models say about whether we’re on track to keep global warming below 2°C? ',
        answer:
          'The answer to this question varies by scenario. Almost all Business as Usual or Reference Case scenarios show that we are not on track to keep global warming under 1.5-2°C. However, more ambitious scenarios show that it is possible to keep the global warming under 1.5-2°C. Many rely on carbon removal approaches, such as  carbon capture and storage with bioenergy (BECCS), coupled with greater mitigation ambitions, such as increased renewable energy generation.'
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
        title: 'I am a modeler. How can I submit information for my model? ',
        answer:
          'We are always looking to grow our database by adding new models. To upload your model and scenarios to Pathways, send us an email at <a href="climatewatch@wri.org">ClimateWatch@WRI.org</a> and we will send you with further information about model management and the data upload process. '
      }
    ]
  },
  {
    label: 'Country profiles',
    slug: 'countries',
    content: [
      {
        type: 'text',
        title: 'Is there a country profile for every country? ',
        answer:
          'There are country profiles for all parties to the United Nations Framework Convention on Climate Change (UNFCCC) – 196 countries plus the European Union, which submitted their NDC together.'
      },
      {
        type: 'text',
        title:
          'What was the process for choosing the metrics for the “Climate Vulnerability and Readiness” section?',
        answer:
          'The indicators were selected because they have data that are geographically comprehensive, updated regularly and tell a compelling story that links poverty, vulnerability and climate impacts. These indicators show that the poor are most vulnerable to climate risks such as sea level rise, increases in temperature and more erratic rainfall. This section also includes indicators that show the extent to which a country is ready to adapt to climate change to reduce its vulnerability to climate impacts.'
      },
      {
        type: 'html',
        title:
          'How can the data be used in the "Climate Vulnerability and Readiness" section? ',
        answer:
          '<p>Policymakers and donors can use this data to get a snapshot overview of a country’s need to reduce its vulnerability to climate impacts and to compare this need with other countries.</p><p>Civil society and media can use information on poverty, risks, vulnerabilities and readiness for communications and advocacy on adaptation and reducing a country’s vulnerability to climate impacts. </p><p>For researchers and adaptation planners, this information acts as a gateway to more detailed information and data sets on adaptation through platforms such as the <a href="http://sdwebx.worldbank.org/climateportal/" rel="noopener noreferrer" target="_blank">Climate Change Knowledge Portal</a> and <a href="https://www.predata.com/" rel="noopener noreferrer" target="_blank">PREPdata.</a></p>'
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
            'Document type': 'NDC',
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
  }
];
