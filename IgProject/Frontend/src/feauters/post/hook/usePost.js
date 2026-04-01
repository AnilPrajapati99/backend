import { postContext } from "../post.contexts";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,
} from "../services/post.spi";
import { useContext, useEffect } from "react";

export const usePost = () => {
  const context = useContext(postContext);
  const { loading, setFeed, setLoading, feed, post, setPost } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handaleCreatePost = async (imagefile, caption) => {
    setLoading(true);
    const data = await createPost(imagefile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (post) => {
    const data = await likePost(post);
    await handleGetFeed();
  };
  const handleUnLike = async (post) => {
    const data = await unlikePost(post);
    await handleGetFeed();
  };
  useEffect(() => {
    handleGetFeed();
  }, [,]);
  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handaleCreatePost,
    handleLike,
    handleUnLike,
  };
};
