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

    zoom = 10
    xStart = 200
    xEnd = 210
    yStart = 200
    yEnd = 250

    geoJsonFeatureCollection = {}
    geoJsonFeatureCollection["type"] = "FeatureCollection"
    geoJsonFeatureCollection["features"] = []

    for x in range(xStart, xEnd):
        geoJsonFeature = makeGeoJsonFeature(zoom, x, yStart)
        geoJsonFeatureCollection["features"].append(geoJsonFeature)

    print(json.dumps(geoJsonFeatureCollection))


makeGeoJsonCollection()
