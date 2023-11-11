import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authentication-middleware";

import { User } from "../models/user-model";
import { Follow } from "../models/follow-model";

import { SOAPService } from "../services/soap-services";


export class FollowController {
    follow() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            // Parse request
            const followeeId = parseInt(req.params.followeeId);
            if (token.userID === followeeId) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
            }

            // Check if already followed
            const existingFollow = await Follow.findOneBy({
                follower_id: token.userID,
                followee_id: followeeId,
            });

            if (existingFollow) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
            }

            // Check if followee exists
            const followee = await User.findOneBy({ userID: followeeId });
            if (!followee) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
            }

            // Create new follow
            const follow = new Follow();
            follow.follower_id = token.userID;
            follow.followee_id = followeeId;
            
            // Save the new follow relationship
            const newFollow = await follow.save();

            if (!newFollow) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                });
                return;
            }

            res.status(StatusCodes.CREATED).json({
                message: ReasonPhrases.CREATED,
            });
        };
    }

    unfollow() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            const followeeId = parseInt(req.params.followeeId);

            const follow = await Follow.findOneBy({
                follower_id: token.userID,
                followee_id: followeeId,
            });
    
            if (!follow) {
                res.status(StatusCodes.NOT_FOUND).json({ 
                    message: ReasonPhrases.NOT_FOUND 
                });
                return 
            }
    
            // Remove the follow relationship
            const unfollowed = await follow.remove();
    
    
            if (!unfollowed) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                });
                return;
            }

            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
            });
        };
    }
    
    listFollowers() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ 
                    message: ReasonPhrases.UNAUTHORIZED 
                });
            }
    
            const followers = await Follow.createQueryBuilder("follow")
                .select(["follow.follower_id"])
                .where("followee_id = :userID", {
                    userID: token.userID,
                })
                .getMany();
    
            return res.status(StatusCodes.OK).json({ 
                message: ReasonPhrases.OK, 
                data: followers,
            });
        }
    }

    listFollowees() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ 
                    message: ReasonPhrases.UNAUTHORIZED 
                });
            }
    
            const followees = await Follow.createQueryBuilder("follow")
                .select(["follow.followee_id"])
                .where("follower_id = :userID", {
                    userID: token.userID,
                })
                .getMany();
    
            return res.status(StatusCodes.OK).json({ 
                message: ReasonPhrases.OK, 
                data: followees,
            });
        }
    }

}
