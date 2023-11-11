import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
    AuthToken,
    AuthRequest,
} from "../middlewares/authentication-middleware";
import { jwtConfig } from "../config/jwt-config";
import { User } from "../models/user-model";

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

export class UserController {
    token() {
        return async (req: Request, res: Response) => {
            const { username, password }: TokenRequest = req.body;
            if (!username || !password) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                });
                return;
            }

            const user = await User.createQueryBuilder("user")
                .select(["user.userID", "user.email", "user.password", 
                "user.image", "user.linked", "user.follower_count"])
                .where("user.username = :username", { username })
                .getOne();
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid credentials",
                });
                return;
            }

            if (password !== user.password) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid credentials",
                });
                return;
            }
            

            const { userID } = user;
            const payload: AuthToken = {
                userID,
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
            const { email, username, image, password }: StoreRequest = req.body;
            if (!username || !image || !password) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                });
                return;
            }

            const user = new User();
            user.email = email;
            user.username = username;
            user.password = password;
            user.image = image;
            user.linked = false;
            user.follower_count = 0;

            // Cek apakah data sudah ada ...
            const existingUserWithUsername = await User.findOneBy({
                username,
            });
            if (existingUserWithUsername) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Username already taken!",
                });
                return;
            }

            const newUser = await user.save();
            if (!newUser) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                });
                return;
            }

            const { userID} = newUser;
            const payload: AuthToken = {
                userID,
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

            const users = await User.createQueryBuilder("user")
                .select(["user.userID", "user.name"])
                .getMany()

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: users
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
                userID: token.userID,
            });
        };
    }
}
