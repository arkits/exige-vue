# Exige

![exige-screenshot](https://github.com/arkits/exige/blob/master/img/main.png?raw=true)

## About

Exige is a proof-of-concept traffic visualizer for [UAM](https://www.nasa.gov/uamgc) / [UTM](https://utm.arc.nasa.gov/index.shtml) data. 

Exige is a Vue.js 2.0 based web-app which connects to a UTM Service Suplier and displays relevant data. 

## Features

### Implemented
- WebSocket
  - Connect to an USS over WebSocket endpoint.
  - Receive Operations and Positions over WebSocket and store.
  - Connect and disconnect WebSocket.
- Mapping
  - Graph multi-volume Operations.
  - Graph flight-path trajectory based on received Position updates.
  - View Operation on Map based Operation Volume's extent.

### Planned
- Operation creator and data manupilator.
- Operation lifecycle demo simulation.

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
