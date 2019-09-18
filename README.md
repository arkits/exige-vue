# Exige

![exige-screenshot](https://github.com/arkits/exige/blob/master/img/main.png?raw=true)

## About

Exige is a proof-of-concept traffic visualizer for [UAM](https://www.nasa.gov/uamgc) / [UTM](https://utm.arc.nasa.gov/index.shtml) data. 

Exige is a Vue.js 2.0 based web-app which connects to a UTM Service Suplier and displays relevant data. 

## Features

### Implemented
- Mapping
  - Graph 3D multi-volume Operations.
  - Graph flight-path based on Position.
  - Graph InterUSS Platform (Grid) Slippy tiles.
  - View Operation on Map based Operation Volume's extent.
  - Switch between 2D and 3D operation volume graphing.
- Automated lifecycle demo.
- Import and Export Exige data for easy sharing.

### Planned
- Manager / Timeline UI.
- Data manupilator.

## References

### UTM

Exige's data models are based on the NASA UTM OpenAPI specification, available at https://github.com/nasa/utm-apis.

## Development

### Available Scripts

### Setup

Setup your dev environment with  
- Install node.js / npm.
- Install Vue CLI globally - `npm install -g @vue/cli`  
- Install node_modules - `npm install`

### Running 

Run with Vue UI - `vue ui`   
or with npm -  `npm run serve`

### Build    
`npm run build`  
This will a generate deployment ready build of Exige.

### Test  
`npm run test`

### Lints and fixes files  
`npm run lint`
