#!/usr/bin/env python

# WS server

import asyncio
import datetime
import random
import websockets
import json
import uuid

operation = {
    "operation_volumes": [{
        "type": "Polygon",
                "coordinates": [
                    [
                        [-118.91601562499999, 36.84446074079564],
                        [-115.83984375, 36.84446074079564],
                        [-115.83984375, 44.74673324024678],
                        [-118.91601562499999, 44.74673324024678],
                        [-118.91601562499999, 36.84446074079564]
                    ]
                ]
    },
        {
        "type": "Polygon",
                "coordinates": [
                    [
                        [-119.0478515625, 42.22851735620852],
                        [-104.1064453125, 42.22851735620852],
                        [-104.1064453125, 44.653024159812],
                        [-119.0478515625, 44.653024159812],
                        [-119.0478515625, 42.22851735620852]
                    ]
                ]
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
        operation["uss_name"] = "uam.arc.nasa.gov"
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
