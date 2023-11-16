import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  AuthToken,
  AuthRequest,
} from "../middlewares/authentication-middleware";
import { jwtConfig } from "../config/jwt-config";
import { Client } from "../models/client-model";

interface TokenRequest {
  username: string;
  password: string;
}

interface StoreRequest {
  email: string;
  username: string;
  password: string;
  image: string;
  linked: boolean;
  follower_count: number;
}

export class ClientController {
  token() {
    return async (req: Request, res: Response) => {
      const { username, password }: TokenRequest = req.body;
      if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
        });
        return;
      }

      const client = await Client.createQueryBuilder("client")
        .select([
          "client.id",
          "client.email",
          "client.password",
          "client.image",
          "client.linked",
          "client.follower_count",
        ])
        .where("client.username = :username", { username })
        .getOne();
      if (!client) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid credentials",
        });
        return;
      }

      if (password !== client.password) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid credentials",
        });
        return;
      }

      const { id } = client;
      const payload: AuthToken = {
        id,
      };
      const token = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        token,
      });
    };
  }

  store() {
    return async (req: Request, res: Response) => {
      const { email, username, password }: StoreRequest = req.body;
      if (!email || !username || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
        });
        return;
      }

      const client = new Client();
      client.email = email;
      client.username = username;
      client.password = password;
      client.image = "";
      client.linked = false;
      client.follower_count = 0;

      // Cek apakah data sudah ada ...
      const existingClientWithUsername = await Client.findOneBy({
        username,
      });
      if (existingClientWithUsername) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Username already taken!",
        });
        return;
      }

      const newClient = await client.save();
      if (!newClient) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
        });
        return;
      }

      const { id } = newClient;
      const payload: AuthToken = {
        id,
      };
      const token = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        token,
      });
    };
  }

  index() {
    return async (req: Request, res: Response) => {
      const clients = await Client.createQueryBuilder("client")
        .select(["client.id", "client.username"])
        .getMany();

      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: clients,
      });
    };
  }

  getUser() {
    return async (req: Request, res: Response) => {
      const { token } = req as AuthRequest;
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
        });
        return;
      }
      const id = token.id;
      console.log(id);

      const client = await Client.createQueryBuilder("client")
        .select(["client.id", "client.email", "client.username", "client.image", "client.linked", "client.follower_count"])
        .where("client.id = :id", { id })
        .getOne();
      
      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: client,
      });
    };
  }
  

  check() {
    return async (req: Request, res: Response) => {
      const { token } = req as AuthRequest;
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        id: token.id,
      });
    };
  }

  update(){
    return async (req: Request, res: Response) => {
      const { token } = req as AuthRequest;
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
        });
        return;
      }
      const { email, username, image, password }: StoreRequest = req.body;
      const id = token.id;

      const upClient = new Client();
      upClient.id = id;
      upClient.email = email;
      upClient.username = username;
      upClient.password = password;
      upClient.image = image;

      const updatedClient = await upClient.save();
      if (!updatedClient){
        res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
        });
        return;
      }
      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
      });
    }
  }
}
