import { Typography } from "@mui/material";
import Dialog from "./Dialog";
import { TConversation } from "../utils/AppTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const Conversation = ({
  channel,
  messages,
  selectedMessage,
  users,
  updateReplyMessages,
  isReplyVisible,
}: TConversation) => {
  const router = useRouter();
  const [replies, setReplies] = useState();
  const testMessage = updateReplyMessages;
  console.log(testMessage);

  // var msgArray = messages.map((item: any) => item.userId);
  // var userArray = users.map((user) => user.userId);
  // var arr = users.filter((user) =>
  //   msgArray.filter((item) => item.userId == user.userId)
  // );

  useEffect(() => {
    // console.log("newArray : ", arr);
    // console.log(messages.map((msg) => msg.userId));
    // console.log(users.map((user) => user.userId));
  }, []);

  return (
    <>
      {!isReplyVisible && (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          This is the beginning of the #{channel?.name} channel
        </Typography>
      )}

      {isReplyVisible && (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          {/* # {selectedUser.username} */}
          {/* <selectedMessage /> */}
          Username
        </Typography>
      )}

      {messages.map((item) => (
        <>
          <Dialog
            key={item.id}
            updateReplyMessages={updateReplyMessages}
            messageDetail={item}
            users={users}
            isReplyVisible={isReplyVisible}
          />
          {/* {setUser(users[item.userId])} */}
        </>
      ))}
    </>
  );
};

export default Conversation;
