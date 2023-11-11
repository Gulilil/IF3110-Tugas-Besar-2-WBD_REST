import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authentication-middleware";

import { Forum } from "../models/forum-model";

import { SOAPService } from "../services/soap-services";


export class ForumController {
    store() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            // Parse request body
            const { title } = req.body;

            // Buat forum baru
            const forum = new Forum();
            forum.title = title;
            forum.authorID = token.userID;
            forum.created_at = new Date();
            forum.post_count = 0;

            // Buat forum
            const newForum = await forum.save();
            if (!newForum) {
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

    index() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }
    
            const forums = await Forum.createQueryBuilder("forum")
                .select(["forum.forumID", "forum.title", "forum.created_at", "forum.post_count"])
                .where("forum.authorID = :userID", {
                    userID: token.userID,
                })
                .getMany();
    
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: forums,
            });
        };
    }
    


    delete() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            // Parse request param
            const forumID = parseInt(req.params.id);

            const forum = await Forum.findOneBy({
                forumID: forumID,
            });

            // Apabila tidak ditemukan ...
            if (!forum) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                });
                return;
            }
            if (forum.authorID != token.userID) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            // Delete!
            const deletedForum = await forum.remove();
            if (!deletedForum) {
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

}
