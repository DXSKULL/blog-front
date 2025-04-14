import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import { Post } from "../components/Post";

export const FullPost = () => {
  const [postData, setPostData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/posts/${id}`);
        setPostData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        alert("Ошибка при получении статьи!");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      {postData.tags && (
        <Post
          id={postData.id}
          title={postData.title}
          imageUrl={
            postData.imageUrl
              ? `https://blog-back-cwqd.onrender.com${postData.imageUrl}`
              : ""
          }
          user={postData.user}
          createdAt={postData.createdAt}
          viewsCount={postData.viewsCount}
          tags={postData.tags}
          isFullPost
        >
          <ReactMarkdown children={postData.text} />
        </Post>
      )}
    </>
  );
};
