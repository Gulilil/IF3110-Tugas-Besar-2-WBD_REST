import { DataSourceOptions } from "typeorm";

import { User } from "../models/user-model";
import { Forum } from "../models/forum-model";
import { Post } from "../models/post-model";
import { Follow } from "../models/follow-model";

const generatePostgreHost = () => {
    return process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "postgres_db";
};

const generatePostgrePort = () => {
    return process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432;
};

const generatePostgreUsername = () => {
    return process.env.POSTGRES_USER ? process.env.POSTGRES_USER : "postgres";
};

const generatePostgrePassword = () => {
    return process.env.POSTGRES_PASSWORD
        ? process.env.POSTGRES_PASSWORD
        : "postgres";
};

const generatePostgreDatabase = () => {
    return process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "wbd_db";
};

export const dataConfig: DataSourceOptions = {
    type: "postgres",
    host: generatePostgreHost(),
    port: generatePostgrePort(),
    username: generatePostgreUsername(),
    password: generatePostgrePassword(),
    database: generatePostgreDatabase(),
    synchronize: true,
    logging: true,
    entities: [User, Forum, Post, Follow],
    migrations: [],
};