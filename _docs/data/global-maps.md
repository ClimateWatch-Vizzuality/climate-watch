---
layout: default
title: Global Maps generation
parent: Data
permalink: /_docs/science/global-maps
---
# Global maps generation
Here you will find useful guidance to generate global maps for the application (Explore pages)

Geometries are stored in the world-50m-topo.json file. You can generate the geometries with this [jupyter](https://github.com/ClimateWatch-Vizzuality/climate-watch#:~:text=Geometries%20are%20stored%20in%20the%20world%2D50m%2Dtopo.json%20file.%20You%20can%20generate%20the%20geometries%20with%20this%20jupyter%20link) link.

Global maps are different for China, India and rest of the world. Be sure to generate the different files as specified on the jupyter notebook.

## Geolocation

The location is detected by IP with a Maxmind service and the maps are displayed accordingly.

The App is using MAXMIND DB to geolocate users. In test and development environment we are using the MaxMind Test DB by default. In order to use real DB you need to download it
locally setting `MAXMIND_LICENSE_KEY` and using rake task `db:import_maxmind`. Then to use real DB in dev environment you need to run project with env variable
`MAXMIND_REAL_DB=true`.

It is possible to override returned user country code in development mode using env variable `CW_USER_COUNTRY_OVERRIDE`.

TODO: Add more information about the maxmind service on the backend
