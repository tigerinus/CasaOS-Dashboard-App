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

dotenv.config();

const app = express(); // 创建express实例
const server = http.createServer(app); // 创建http服务
const io = new Server(server); // 创建socket.io服务

app.use(express.static('public')); // 静态资源托管

// Host web ui
app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/index.html');
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