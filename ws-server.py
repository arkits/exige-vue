#!/usr/bin/env python

# WS server

import asyncio
import datetime
import random
import websockets
import json
import uuid

operation = {
    "operation_volumes": [
        {
            "ordinal": 1,
            "flight_geography": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-120.89355468749999, 45.336701909968134],
                        [-101.337890625, 45.336701909968134],
                        [-101.337890625, 47.21956811231547],
                        [-120.89355468749999, 47.21956811231547],
                        [-120.89355468749999, 45.336701909968134]
                    ]
                ]
            }
        },
        {
            "ordinal": 2,
            "flight_geography": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-105.29296874999999, 32.731840896865684],
                        [-101.337890625, 32.731840896865684],
                        [-101.337890625, 47.21956811231547],
                        [-105.29296874999999, 47.21956811231547],
                        [-105.29296874999999, 32.731840896865684]
                    ]
                ]
            }
        },
        {
            "ordinal": 3,
            "flight_geography": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-105.205078125, 32.80574473290688],
                        [-85.5615234375, 32.80574473290688],
                        [-85.5615234375, 35.567980458012094],
                        [-105.205078125, 35.567980458012094],
                        [-105.205078125, 32.80574473290688]
                    ]
                ]
            }
        }
    ]
}

position = {}


async def publish_operations(websocket, path):
    i = 1

    while True:
        # now = datetime.datetime.utcnow().isoformat() + 'Z'

        gufi = str(uuid.uuid4())
        operation["gufi"] = gufi
        operation["uss_name"] = "exige.archit.xyz"
        operation["state"] = "ACTIVE"

        operation["id"] = i
        i = i + 1

        payload = json.dumps(operation)

        print("Posting Operation " + str(payload))
        await websocket.send(payload)
        await asyncio.sleep(5)


async def publish_positions(websocket, path):
    i = 1

    while True:
        # now = datetime.datetime.utcnow().isoformat() + 'Z'

        pos = [-122.019807, 45.632433]
        position["coods"] = pos

        gufi = str(uuid.uuid4())
        position["gufi"] = gufi

        position["id"] = i
        i = i + 1

        payload = json.dumps(position)

        print("Posting Positions" + str(payload))
        await websocket.send(payload)
        await asyncio.sleep(5)

start_server = websockets.serve(publish_operations, '127.0.0.1', 7869)
# start_server = websockets.serve(publish_positions, '127.0.0.1', 7869)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
