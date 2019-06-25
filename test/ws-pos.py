#!/usr/bin/env python

# WS server

import asyncio
import datetime
import random
import websockets
import json
import uuid


position = {}

async def publish_positions(websocket, path):
    i = 1

    while True:

        pos = [-122.019807, 45.632433]
        position["coods"] = pos

        gufi = str(uuid.uuid4())
        position["gufi"] = gufi

        position["id"] = i
        i = i + 1

        payload = json.dumps(position)

        print("Posting Positions" + str(payload))
        await websocket.send(payload)
        await asyncio.sleep(15)

start_server = websockets.serve(publish_positions, '127.0.0.1', 7866)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
