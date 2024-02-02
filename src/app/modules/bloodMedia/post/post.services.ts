import { Post, PostAvatar } from '@prisma/client'
import prisma from '../../../../prisma/prisma'
import Send_API_Error from '../../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { CheckUserByIdFromDB } from '../../../../shared/utils'

const insertPostIntoDB = async (
  user_id: string,
  post: Post,
  avatar: PostAvatar,
): Promise<Post> => {
  const user = await CheckUserByIdFromDB(user_id)
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  const result = await prisma.$transaction(async transactionClient => {
    post.userId = user_id
    const createPost = await transactionClient.post.create({ data: post })
    if (avatar) {
      avatar.postId = createPost.id
      await transactionClient.postAvatar.create({ data: avatar })
    }
    return createPost
  })
  return result
}

const retrieveAllPostFromDB = async (): Promise<Post[]> => {
  return await prisma.post.findMany({
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      likeUsers: true,
      commentUser: true,
    },
  })
}

const getPostByIdFromDB = async (id: string): Promise<Post | null> => {
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  })
  return post
}
const updatePostByIdIntoDB = async (
  post: Partial<Post>,
  avatar: Partial<PostAvatar[]>,
): Promise<Post | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const updatePost = await transactionClient.post.update({
      where: {
        id: post.id,
      },
      data: post,
    })
    if (avatar) {
      await prisma.postAvatar.updateMany({
        where: {
          postId: avatar[0]?.postId,
        },
        data: avatar,
      })
    }
    return updatePost
  })
  return result
}
export const PostService = {
  insertPostIntoDB,
  retrieveAllPostFromDB,
  getPostByIdFromDB,
  updatePostByIdIntoDB,
}
