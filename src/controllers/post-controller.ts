import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authentication-middleware";

import { Post } from "../models/post-model";

export class PostController {
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
            const { forumID, content } = req.body;

            // Buat post baru
            const post = new Post();
            post.forumID = forumID;
            post.authorID = token.userID;
            post.created_at = new Date();
            post.content = content;

            // Buat post
            const newPost = await post.save();
            if (!newPost) {
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

    indexAuthor() {
        return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }
    
            const posts = await Post.createQueryBuilder("post")
                .select(["post.postID", "post.forumID", "post.created_at", "post.content"])
                .where("post.authorID = :userID", {
                    userID: token.userID,
                })
                .getMany();
    
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: posts,
            });
        };
    }

    indexForum() {
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
    
            const posts = await Post.createQueryBuilder("post")
                .select(["post.postID", "post.authorID", "post.created_at", "post.content"])
                .where("post.forumID = :forumID", {
                    forumID: forumID,
                })
                .getMany();
    
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: posts,
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
            const postID = parseInt(req.params.id);

            const post = await Post.findOneBy({
                postID: postID,
            });

            // Apabila tidak ditemukan ...
            if (!post) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                });
                return;
            }
            if (post.authorID != token.userID) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                });
                return;
            }

            // Delete!
            const deletedPost = await post.remove();
            if (!deletedPost) {
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
