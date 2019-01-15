export const sectionsData = [
  {
    label: 'General questions',
    slug: 'general_questions',
    content: [
      {
        type: 'text',
        title: 'What is Climate Watch?',
        answer:
          'Climate Watch is an online open data platform that provides data to help countries achieve ambitious climate goals and enhance their sustainable development.'
      },
      {
        type: 'text',
        title: 'Who is this tool for? ',
        answer:
          'Government ministries, development organizations, civil society organizations and researchers can use Climate Watch to find and download data about global emissions, climate commitments, sustainable development and other topics. Visit our homepage to see what we can offer you. '
      },
      {
        type: 'html',
        title: 'Can I download the data?',
        answer:
          '<span>Yes, all the data published on Climate Watch is free and open. This means you can download data and use it for your own analysis with proper attribution. Use the Data Explorer at the top right corner of the homepage to explore the datasets and download one or more of them. Visit our <Link to="/about/permissions" innertext="Permissions and Licensing" /> page for more information about using the data.<span>'
      },
      {
        type: 'html',
        title: 'How do I cite Climate Watch data as a source?',
        answer:
          '<span>Use the info button next to each dataset and figure on Climate Watch to see its citation information.  A general citation for Climate Watch is as follows: Climate Watch. 2018. Washington, D.C.: World Resources Institute. Available online at: <link to="/" innerText="www.climatewatchdata.org"></link>. See our <Link to="/about/permissions" innertext="Permissions and Licensing" /> page for more information about citation.  '
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
          'Visit our Partners page to see all the organizations involved in developing and managing Climate Watch. The platform is managed on a daily basis by the World Resources Institute and is part of the Resource Watch family of data platforms. The name “Climate Watch” refers only to the platform and not to any particular organization.'
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
          '<Link to="/countries" innertext="Country profiles" /> are updated at least once per year. Links to UNFCCC submissions are updated more frequently as new documents are submitted. <Link to="/ghg-emissions " innertext="Historical GHG emissions" /> are updated as available. It takes at least 1-2 years for organizations to compile, process and report GHG data; thus, the last year of complete GHG data will often be 2-3 years behind the current calendar year.<p><Link to="/ndcs" innertext="NDC content" /> is updated as new NDCs are submitted to the UNFCCC.</p><p> <Link to="/ndcs-sdg" innertext="NDC-SDG linkages" /> are updated as new NDCs are submitted to the UNFCCC.</p>'
      },
      {
        type: 'html',
        title:
          'What should I do if I believe a dataset on Climate Watch is inaccurate or that better data exists?',
        answer:
          'Much of the data on Climate Watch is obtained from other sources and we aim to make them all transparent. Make sure you have read and understood the sources and methodologies when using Climate Watch data. If you have additional questions, please contact us at <a href="mailto:climatewatch@wri.org"> climatewatch@wri.org</a>.'
      },
      {
        type: 'html',
        title: 'What acronyms are used on Climate Watch?',
        answer:
          'Please see a list of acronyms used listed <a href="https://onewri.sharepoint.com/:x:/r/sites/climatewatch/_layouts/15/Doc.aspx?sourcedoc=%7B6036aca4-e0e4-4242-9d7c-9e21c61403c3%7D&action=default" rel="noopener noreferrer" target="_blank" >here</a>. Please also further explanation of certain terms in the sections below.'
      }
    ]
  },
  {
    label: 'Historical emissions module',
    slug: 'ghg',
    content: [
      {
        type: 'html',
        title: 'Where is your GHG emissions data from?',
        answer:
          'Our GHG emissions data comes from three sources:<ul><li><a href="http://cait.wri.org/historical/Country%20GHG%20Emissions?indicator%5b%5d=Total%20GHG%20Emissions%20Excluding%20Land-Use%20Change%20and%20Forestry&indicator%5b%5d=Total%20GHG%20Emissions%20Including%20Land-Use%20Change%20and%20Forestry&year%5b%5d=2014&sortIdx=NaN&chartType=geo" rel="noopener noreferrer" target="_blank" >CAIT</a> emissions data is compiled using a consistent methodology to create a comprehensive and internationally comparable data set for 190 countries including all GHGs and major IPCC sectors. CAIT uses the 2016 edition of the IEA publication for CO₂ emissions from fossil fuel combustion from 1971 to 2014, and draws the remaining CO₂ and non-CO₂ emissions data from a variety of other sources including CDIAC, U.S. EPA, and FAO. (See <a href="http://cait2.wri.org/docs/CAIT2.0_CountryGHG_Methods.pdf" rel="noopener noreferrer" target="_blank" >CAIT GHG Sources and Methods Documentation</a> for more detailed information.)</li><li><a href="http://pmd.gfz-potsdam.de/pik/showshort.php?id=escidoc:2086888" rel="noopener noreferrer" target="_blank" >Primap’s dataset</a> combines several published datasets to create a comprehensive set of GHG emission pathways for every country and Kyoto gas covering the years 1850 to 2014 for all 197 UNFCCC parties as well as most non-UNFCCC territories. The data resolves the main IPCC 1996 categories. For CO₂ from energy and industry, time series for subsectors are available. Country level data is combined from different sources using the PRIMAP emissions module. It is supplemented with growth rates from regionally resolved sources and numerical extrapolations. Regional deforestation emissions are downscaled to country level using estimates of the deforested area obtained from potential vegetation and calculations for the needed agricultural land. </li><li>UNFCCC’s GHG <a href="http://di.unfccc.int/detailed_data_by_party" rel="noopener noreferrer" target="_blank">data interface</a> provides access to the most recent GHG data reported by countries that are Parties to the Climate Change Convention. The data interface includes the latest data reported by Annex I Parties and to the extent possible national communications and biennial update reports of non-Annex I Parties.</li></ul>'
      },
      {
        type: 'text',
        title: 'What are the main differences between the three data sources?',
        answer:
          'UNFCCC provides official country-reported inventories; CAIT and PIK are estimates made by non-government research institutes. CAIT and PIK datasets apply a consistent methodology and are comparable across all countries included. The UNFCCC dataset is not comparable across all countries, due to the different reporting requirements and methodologies for Annex 1 and non-Annex 1 countries. The PIK dataset prioritizes country-reported inventories and fills the data gaps with secondary sources and assumptions. CAIT uses none of the self-reported inventories for individual countries and instead uses datasets with global coverage. Thus, the PIK dataset aligns better with country-reported estimates, while CAIT provides an independent inventory that compliments the other two. Among other methodology differences, CAIT uses global warming potential (GWP) values from the IPCC’s Second Assessment Report (AR2) for non-CO2 gases; PIK provides data under both AR2 and AR4 GWP values; UNFCCC data uses either AR2 and AR4, depending on the inventory methodology the party opts to follow. '
      },
      {
        type: 'text',
        title:
          'How significant are uncertainties in the emissions data, particularly in the land-use change and forestry sector? ',
        answer:
          'According to the Working Group III Contribution to the IPCC Fifth Assessment Report, global CO2 emissions from fossil fuel combustion are known within 8% uncertainty (90% confidence interval). CO2 emissions from FOLU (forestry and other land use) have very large uncertainties attached in the order of ± 50%. Uncertainty for global emissions of CH4, N2O and the F-gases has been estimated as 20%, 60% and 20% respectively. For the PIK dataset, regional deforestation emissions are downscaled to country level using estimates of the deforested area obtained from potential vegetation and calculations for the needed agricultural land. So, levels of uncertainty are quite high for earlier years of data (closer to 1850).  '
      }
    ]
  },
  {
    label: 'NDC content module',
    slug: 'ndc',
    content: [
      {
        type: 'text',
        title: 'What are NDCs? ',
        answer:
          'In the lead up to the Paris climate conference in December 2015, parties were invited by the UNFCCC to communicate their national plans to address climate change, known as Intended Nationally Determined Contributions, or INDCs. A country’s INDC is converted to a Nationally Determined Contribution (NDC) when it formally joins the Paris Agreement by submitting an instrument of ratification, acceptance, approval or accession.'
      },
      {
        type: 'text',
        title: 'How are NDCs assessed? ',
        answer:
          'The NDC Content module of Climate Watch presents contributions submitted by parties in different forms, including visualizations, structured indicators, and original text. The module does not evaluate the ambition of contributions. The data presented is submitted by countries is intended to make these documents more transparent, accessible, comparable and easier to understand.  '
      },
      {
        type: 'html',
        title:
          'Can you explain some of the terms used, like target, policy, action and plan?',
        answer:
          '<ul><li>Targets are an intention to achieve a specific result, for example, to reduce GHG emissions to a specific level (a GHG target) or increase energy efficiency or renewable energy to a specific level (a non-GHG target), typically by a certain date.</li><li>Actions are an intention to implement specific means of achieving GHG reductions, such as policies or projects.</li><li>Policies are larger in scale while projects are implemented at a smaller and more specific scale. </li><li>Plans and strategies are broader than specific policies or projects, such as a general intention to ‘improve efficiency’, ‘develop renewable energy’, etc. The terms come from the World Bank\'s <a href="http://spappssecext.worldbank.org/sites/indc/Pages/INDCHome.aspx" rel="noopener noreferrer" target="_blank" >NDC platform</a> and WRI\'s <a href="https://www.wri.org/sites/default/files/designing-preparing-indcs-report.pdf" rel="noopener noreferrer" target="_blank" >publication</a> (Figure 4.1). </li></ul>'
      },
      {
        type: 'html',
        title: 'What is the methodology behind the data? ',
        answer:
          'The structured indicators used for presenting NDC information are adapted from several data sources, including the <a href="http://cait.wri.org/indc/?_ga=2.28118332.1668429314.1539630180-1825175710.1480702135" rel="noopener noreferrer" target="_blank">CAIT Paris Contributions Map, World Bank’s NDC Platform</a>, and  <a href="https://klimalog.die-gdi.de/ndc/#NDCExplorer/worldMap?NDC??income???catIncome" rel="noopener noreferrer" target="_blank">DIE’s NDC Explorer</a>. Please refer to respective resources for detailed documentation. The terms and phrases used in this tool follow, to the extent possible, WRI’s publication <a href="https://www.wri.org/publication/designing-and-preparing-indcs" rel="noopener noreferrer" target="_blank">“Designing and Preparing INDCs.”</a>'
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
    label: 'NDC-SDG linkages module',
    slug: 'ndc_sdg',
    content: [
      {
        type: 'html',
        title: 'How are the NDC-SDG linkages determined?',
        answer:
          'WRI\'s working paper <a href="https://www.wri.org/publication/examining-alignment-between-intended-nationally-determined-contributions-and-sustainable" rel="noopener noreferrer" about="_blank" >"Examining the Alignment between the Intended Nationally Determined Contributions and the Sustainable Development Goals"</a> outlines the methodology and a more detailed technical note is forthcoming. Linkages are determined through textual analysis of the Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) to identify alignments of targets, actions, policy measures and needs. Analysis was only conducted at the target level, meaning the texts of submitted NDCs were compared against the text of the 169 SDG targets. The language in the 17 SDGs is broader than in the targets, so analysis was not conducted at that level. What appears as goal level analysis (on the landing page of the NDC-SDG module) is an aggregation of the analysis at the target level. It is important to note that this analysis only looks at countries’ NDCs and so does not necessarily reflect a country’s actions in the real world. Lastly, the analysis is inherently subjective, so other analysis may result in different conclusions. If this is the case, please let us know at <a href="mailto:climatewatch@wri.org">climatewatch@wri.org</a>. Our aim is to be entirely transparent in our analysis, identifying the exact text in the NDC for each point of alignment identified so that users can confirm for themselves.'
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
        title: 'Why is data missing for some countries? ',
        answer:
          'As per our methodology, no data could be captured for the following parties: Andorra, United Arab Emirates (UAE), Iceland, Kyrgyzstan, Serbia, Ukraine and New Zealand.  '
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
          'The models included on Pathways are published in peer-reviewed publications or are part of a government report; if other cases, they have been widely used by governments. We welcome additional modeling teams and institutions to add their models and contact us about uploading their data.'
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
          'The answer to this question varies by scenario. Almost all Business as Usual or Reference case scenarios show that we are not on track to keep global warming under 2°C. However, more ambitious scenarios show that it is possible to keep the global warming under 2°C by using technologies like carbon capture and storage with bioenergy and increased renewable energy.'
      },
      {
        type: 'text',
        title:
          'Why can’t I compare countries and regions across different models?',
        answer:
          'This feature has not been implemented yet. Comparisons across multiple models introduce concerns about comparability, since indicators have different definitions and models might vary significantly in their scope, complexity and assumptions. We are working to develop this feature in a way that makes assumptions clear and understandable.'
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
          'The indicators were selected because they have data that is geographically comprehensive, updated regularly and tells a compelling story that links poverty, vulnerability and climate impacts. These indicators show that the poor are most vulnerable to climate risks such as sea level rise, increases in temperature and more erratic rainfall. This section also includes indicators that show the extent to which a country is ready to adapt to climate change to reduce its vulnerability to climate impacts.'
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
          '<p>The country profiles include links to documents submitted to the UNFCCC by parties. A summary of the document types, their purposes, which parties submit them and how often is below:</p><table />',
        tableData: [
          {
            document_type: 'National Comunication (NC)',
            purpose:
              'NCs include information on national circumstances, GHG inventories, vulnerability and adaptation, mitigation assessment, financial resources and technology transfer, and education, training and public awareness.',
            submitting_parties: 'All parties',
            frequency:
              'Non-Annex I parties are required to submit their first NC within three years of entering the Convention and every four years thereafter. Annex I parties submit every four years.'
          },
          {
            document_type: 'Biennial Report (BR)',
            purpose:
              'BRs include GHG emission trends, quantified economy-wide emission reduction target and progress in achievement of this target, GHG projections and provision of financial, technological and capacity building support.',
            submitting_parties: 'Annex I parties',
            frequency:
              'The first BR should have been submitted by January 1, 2014, and every two years after that.'
          },
          {
            document_type: 'Biennial Update Report (BUR)',
            purpose:
              'BURs include an update on national GHG inventories, information on mitigation actions taken and their effects and an outline of needs and support received.',
            submitting_parties: 'Non-Annex I parties',
            frequency:
              "The first BUR should have been submitted by December 2014, or consistent with the Party's capabilities or level of support, and every two years thereafter as a summary of their NC or a stand-alone report."
          },
          {
            document_type: 'Cancun pledge pre-2020 Target',
            purpose:
              'The Cancun pledges are quantified economy-wide emission reduction targets for the period to 2020.',
            submitting_parties: 'Annex I parties and many non-Annex I parties',
            frequency:
              'These were one-time only pledges submitted at the 2010 Conference of the Parties in Cancun, Mexico.'
          },
          {
            document_type: 'I/NDC',
            purpose:
              'Post-2020 climate actions submitted by countries in the run up to COP21 in Paris in 2015. The “I” is dropped once countries as parties formally join the agreement. There is no standard format for I/NDCs, but they should be ambitious, equitable, and transparent.',
            submitting_parties: 'All parties',
            frequency:
              'INDCs were submitted before COP21 in 2015 and parties are expected to make revisions by 2020 and every five years thereafter. '
          },
          {
            document_type: 'Long-term Strategy',
            purpose:
              'These are long-term low greenhouse gas emission development strategies for the period to mid-century (2050).',
            submitting_parties: 'All parties',
            frequency:
              'Parties are invited to communicate long-term strategies by 2020, in accordance with Article 4, paragraph 19, of the Paris Agreement.'
          },
          {
            document_type:
              'National GHG Inventory (full inventory and common tabular format)',
            purpose:
              'The inventory covers emissions and removals of direct GHGs (carbon dioxide, methane, nitrous oxide, perfluorocarbons, hydrofluorocarbons, sulphur hexafluoride and nitrogen trifluoride) from five sectors (energy; industrial processes and product use; agriculture; land use, land-use change and forestry; and waste), and for all years from the base year (or period) to two years before the inventory is due (e.g. the inventories due 15 April 2016 cover emissions and removals for all years from the base year to 2014).',
            submitting_parties: 'Annex I parties ',
            frequency:
              'Annex I parties are required to submit by April 15 every year. '
          },
          {
            document_type:
              'Strategies and Approaches for Scaling Up Climate Finance ',
            purpose:
              'Strategies and approaches for scaling up finance during the period from 2014 to 2020. ',
            submitting_parties: 'Annex I parties ',
            frequency: 'Every two years. '
          },
          {
            document_type: 'National Adaptation Plans  ',
            purpose:
              'NAPs are a means of identifying medium- and long-term adaptation needs and developing and implementing strategies and programs to address those needs. ',
            submitting_parties: 'All parties ',
            frequency:
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
