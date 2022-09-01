import React from "react";
import { useRouter } from "next/router";
import Chat from "../routes/chat";
import Helmet from "react-helmet";

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Helmet>
        <title>The Titliest Title of Them All</title>
      </Helmet>
      <Chat id={id} />
    </>
  );
};

export default ChatPage;
