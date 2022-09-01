import { Typography } from "@mui/material";
import Dialog from "./Dialog";
import { TConversation } from "../utils/AppTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const Conversation = ({
  channel,
  messages,
  users,
  updateReplyMessages,
  isReplyVisible,
}: TConversation) => {
  const router = useRouter();

  return (
    <>
      {!isReplyVisible && (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: { md: 3 }, mb: 2, textAlign: "center" }}
        >
          This is the beginning of the #{channel?.name} channel
        </Typography>
      )}

      {messages.map((item) => (
        <Dialog
          key={item.id}
          updateReplyMessages={updateReplyMessages}
          messageDetail={item}
          users={users}
        />
      ))}
    </>
  );
};

export default Conversation;
