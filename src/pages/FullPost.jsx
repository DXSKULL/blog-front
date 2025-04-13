import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";

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
          imageUrl={`http://localhost:4444${postData.imageUrl}`}
          user={postData.user}
          createdAt={postData.createdAt}
          viewsCount={postData.viewsCount}
          commentsCount={3}
          tags={postData.tags}
          isFullPost
        >
          <ReactMarkdown children={postData.text}  />
        </Post>
      )}

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
