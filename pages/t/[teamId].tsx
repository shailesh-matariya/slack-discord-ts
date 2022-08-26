import React from "react";
import { useRouter } from "next/router";
import Chat from "../../routes/chat";

const ChatPage = () => {
  const router = useRouter();
  const { teamId, chProp } = router.query;
  const secondaryColor = "white";

  if (!router.isReady) return <></>;

  return (
    <>
      <Chat teamId={teamId} chProp={chProp} secondaryColor={secondaryColor} />
    </>
  );
};

export default ChatPage;
