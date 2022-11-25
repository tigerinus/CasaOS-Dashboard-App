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

import express, { Request, Response } from 'express'; // 导入express模块
const app = express(); // 创建express实例
import http from 'http'; // 导入http模块
const server = http.createServer(app); // 创建http服务

import { Server } from "socket.io"; // 导入socket.io模块
const io = new Server(server); // 创建socket.io服务

app.use(express.static('public')); // 静态资源托管

// Host web ui
app.get('/', (req: Request, res: Response) => {

    res.sendFile(__dirname + '/public/index.html');
});

// 创建一个假的socket-port 接口 让前端可以运行
app.get('/v1/sys/socket-port', (req: Request, res: Response) => {
    res.json({ "success": 200, "message": "ok", "data": "40273" });
});

// Chat room
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

// Socket.io 事件
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// 启动express服务
server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
