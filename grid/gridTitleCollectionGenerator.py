# Grid Title GeoJson Collection Generator
# Archit Khode
# Based on https://github.com/wing-aviation/InterUSS-Platform

import math
import json


def convertTileToPolygon(zoom, xtile, ytile):

    n = 2.0 ** zoom
    wlon = xtile / n * 360.0 - 180.0
    nlat = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * ytile / n))))
    elon = (xtile + 1) / n * 360.0 - 180.0
    slat = math.degrees(
        math.atan(math.sinh(math.pi * (1 - 2 * (ytile + 1) / n))))

    return [[[wlon, nlat], [elon, nlat], [elon, slat], [wlon, slat], [wlon, nlat]]]


def makeGeoJsonFeature(zoom, xtitle, ytile):

    titleArray = convertTileToPolygon(zoom, xtitle, ytile)

    geometry = {}
    geometry["type"] = "Polygon"
    geometry["coordinates"] = titleArray

    geoJsonFeature = {}
    geoJsonFeature["type"] = "Feature"
    geoJsonFeature["properties"] = {}
    geoJsonFeature["geometry"] = geometry

    return geoJsonFeature


def makeGeoJsonCollection():

    # Entire USA
    zoom = 10
    xStart = 154
    xEnd = 286
    yStart = 358
    yEnd = 433

    geoJsonFeatureCollection = {}
    geoJsonFeatureCollection["type"] = "FeatureCollection"
    geoJsonFeatureCollection["features"] = []

    for x in range(xStart, xEnd):
        for y in range(yStart, yEnd):
            geoJsonFeature = makeGeoJsonFeature(zoom, x, y)
            geoJsonFeatureCollection["features"].append(geoJsonFeature)
    
    return geoJsonFeatureCollection

def writeToFile(jsonToWrite):
    f = open("gridTiles.json", "w")
    f.write(json.dumps(jsonToWrite, indent=4))
    print("Wrote to file...")

geoJsonFeatureCollection = makeGeoJsonCollection()
writeToFile(geoJsonFeatureCollection)
print("Done!")
