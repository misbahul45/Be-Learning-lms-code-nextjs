'use server'

import prisma from "@/lib/prisma";
import { CREATE_COMMENT_ARTICLE } from "@/types/article.types";

export const createArticleCommentAction=async(values:CREATE_COMMENT_ARTICLE)=>{
    try {
        if(!values.message) return null;
        await prisma.articleComments.create({
            data:{
                message:values.message,
                userId:values.userId,
                articleId:values.articleId
            }
        })
    } catch{
        throw new Error("Failed to create comment");
    }
}

export const getArticleCommentsAction=async(articleId:string)=>{
    try {
        if(!articleId) return null;
        const comments=await prisma.articleComments.findMany({
            where:{articleId},
            select:{
                user:{
                    select:{
                        id:true,
                        username:true,
                        profile:{
                            select:{
                                image:{
                                    select:{
                                        url:true
                                    }
                                }
                            }
                        }
                    }
                },
                userId:true,
                createdAt:true,
                id:true,
                parentId:true,
                message:true

            },
            orderBy:{createdAt:"desc"}
        })
        return comments;
    } catch{
        throw new Error("Failed to get comments");
    }
}

