/*
 * @Author: Jerryk jerry@icewhale.org
 * @Date: 2022-11-24 01:13:12
 * @LastEditors: Jerryk jerry@icewhale.org
 * @LastEditTime: 2022-11-24 01:52:39
 * @FilePath: \CasaOS-node-server\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by IceWhale, All Rights Reserved. 
 */

'use strict';

import dotenv from 'dotenv';

import express, { Request, Response } from 'express'; // 导入express模块
import http from 'http'; // 导入http模块
import { Server } from "socket.io"; // 导入socket.io模块
import WebSocket from 'ws'; // 导入ws模块

import { components } from '../codegen/message-bus';

type Event = components['schemas']['Event'];
type Property = components['schemas']['Property'];

type Message = {
    title: string;
    icon: string;
    message: string;
    ui: string;
}

const fromProperties = (properties: Property[]): { [key: string]: string; } => {
    const result: { [key: string]: string; } = {};
    properties.forEach(property => {
        let name = property['name'] ?? "";
        let value = property['value'] ?? "";

        if (name != "" && value != "") {
            result[name] = value;
        }
    });
    return result;
}

const getMessage = (event: Event): Message => {
    const props = fromProperties(event.properties);
    switch (event.name) {
        case 'local-storage:disk:added':
            return {
                title: "A new disk is found!",
                icon: "casaos-disk",
                message: `Disk ${props["local-storage:vendor"]} ${props["local-storage:model"]} is added.`,
                ui: "casaos-ui-notification-style-2"
            };
        case 'local-storage:disk:removed':
            return {
                title: "A disk is removed!",
                icon: "casaos-disk",
                message: `Disk ${props["local-storage:vendor"]} ${props["local-storage:model"]} is removed.`,
                ui: "casaos-ui-notification-style-2"
            };
        default:
            return {
                title: 'Unknown',
                icon: 'unknown',
                message: 'Unknown',
                ui: 'unknown'
            };
    }
}


dotenv.config();

const wsURL = `ws://${process.env.CASAOS_HOST}:${process.env.CASAOS_PORT}/v2/message_bus/event/local-storage`;

const app = express(); // 创建express实例
const server = http.createServer(app); // 创建http服务
const io = new Server(server); // 创建socket.io服务
const ws = new WebSocket(wsURL); // 创建ws服务

// Host web ui
app.use(express.static('public')); // 静态资源托管
app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io 事件
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        ws.send(msg);
    });
});

// WebSocket 事件
ws.on('open', function open() {
    console.log(`connected to ${wsURL}`);
});

ws.on('message', function incoming(data) {

    let event: Event = JSON.parse(data.toString());

    console.log(event);

    let msg = getMessage(event);

    if (msg.ui != 'unknown') {
        io.emit('chat message', JSON.stringify(msg));
    }
});

// 启动express服务
server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
