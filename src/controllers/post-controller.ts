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
        .select([
          "post.postID",
          "post.forumID",
          "post.created_at",
          "post.content",
        ])
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

  index() {
    return async (req: Request, res: Response) => {
      const { token } = req as AuthRequest;
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
        });
        return;
      }

      // Parse request param
      const id = parseInt(req.params.id);

      const post = await Post.createQueryBuilder("post")
        .select([
          "post.postID",
          "post.author_id",
          "post.created_at",
          "post.content",
        ])
        .where("post.id = :id", {
          id: id,
        })
        .getOne();
      
      if (!post) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid credentials",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: post,
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

      const forumID = parseInt(req.params.id);

      const posts = await Post.createQueryBuilder("post")
        .leftJoinAndSelect("post.client", "client") // Make sure 'post.client' is the correct relation path
        .select([
          "post.id",
          "post.post_id",
          "post.forum_id",
          "post.author_id",
          "post.created_at",
          "post.updated_at",
          "post.content",
          "client.username", 
          "client.image",
        ])
        .where("post.forum_id = :forumID", { forumID }) // Use :forumID to replace with forumID value
        .andWhere("client.id = post.author_id") // This condition might be redundant if 'leftJoinAndSelect' is properly defined
        .getMany();
      

      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: posts,
      });
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      const { token } = req as AuthRequest;
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: ReasonPhrases.UNAUTHORIZED,
        });
        return;
      }

      const id = parseInt(req.params.id);
      const { forum_id, content } = req.body;

      const post = await Post.findOneBy({
        post_id: id,
        forum_id: forum_id,
      });

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

      const upPost = new Post();
      upPost.id = post.id;
      upPost.author_id = post.author_id;
      upPost.created_at = post.created_at;
      upPost.updated_at = new Date();
      upPost.post_id = id;
      upPost.forum_id = forum_id;
      upPost.content = content;

      // Update
      const updatedPost = await upPost.save();
      if (!updatedPost) {
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
      const id = parseInt(req.params.id);

      const post = await Post.findOneBy({
        id: id,
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
