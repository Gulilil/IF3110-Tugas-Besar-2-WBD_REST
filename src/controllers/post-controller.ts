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
            const { forum_id, content } = req.body;

            // Buat post baru
            const post = new Post();
            post.forum_id = forum_id;
            post.author_id = token.id;
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
                .where("post.author_id = :id", {
                    id: token.id,
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
                .select(["post.postID", "post.author_id", "post.created_at", "post.content"])
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
            const post_id = parseInt(req.params.id);

            const post = await Post.findOneBy({
                id: post_id,
            });

            // Apabila tidak ditemukan ...
            if (!post) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                });
                return;
            }
            if (post.author_id != token.id) {
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
