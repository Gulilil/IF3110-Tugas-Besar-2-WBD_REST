import { DataSourceOptions } from "typeorm";

import { Client } from "../models/client-model";
import { Forum } from "../models/forum-model";
import { Post } from "../models/post-model";
import { Follow } from "../models/follow-model";

const generatePostgreHost = () => {
  return process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "host.docker.internal";
};

const generatePostgrePort = () => {
  return process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT || "5432")
    : 5432;
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
  return process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "wbd_rest";
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
  entities: [Client, Forum, Post, Follow],
  migrations: [],
};
