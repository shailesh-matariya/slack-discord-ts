import React from "react";
import { useRouter } from "next/router";
import Chat from "../routes/chat";

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Chat id={id} />
    </>
  );
};

export default ChatPage;
