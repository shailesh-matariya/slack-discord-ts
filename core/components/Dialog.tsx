import Avatar from "@mui/material/Avatar";
import { makeStyles, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { blue, grey, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import { TDialog, TUser } from "../utils/AppTypes";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { toArray } from "react-emoji-render";
import { useState } from "react";
import User from "./User";

const ExpandMore = styled((props) => {
  return <IconButton {...props} sx={{ fontSize: 6 }} />;
})(() => ({
  transform: "rotate(45deg)",
  marginLeft: "auto",
}));

const Dialog = ({
  isReplyVisible,
  messageDetail,
  users,
  updateReplyMessages,
}: TDialog) => {
  const replies = messageDetail.replies;
  const usersMap: any = {};
  users.forEach((user) => {
    usersMap[user.userId] = user;
  });

  const user = usersMap[messageDetail.userId];
  const msg = messageDetail.message;
  const message = msg.replace(/<@(.*?)>/g, function replacer(match, p1) {
    return `<strong>@${usersMap[p1]?.name || usersMap[p1]?.username}</strong>`;
  });

  var userArray = messageDetail.replies
    ?.map((item: any) => item.userId)
    .filter((value: any, index: any, self: any) => {
      return self.indexOf(value) === index;
    });

  const arr = users.filter((item: any) => userArray?.includes(item.userId));

  const parseEmojis: any = (value: any) => {
    const emojisArray = toArray(value);

    const newValue = emojisArray.reduce((previous: any, current: any) => {
      if (typeof current === "string") {
        return previous + current;
      }
      return previous + current.props.children;
    }, "");

    return newValue;
  };
  const router = useRouter();

  // const getMessage = (msg: any) => {
  //   // console.log("msg:", msg);
  //   return msg;
  // };
  messageDetail.reactions.map((reaction: any) => console.log(reaction));
  // const getMessage = (msg: any) => {

  return (
    <>
      {/* <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ py: 2, textAlign: "center" }}
      >
        {messageDetail.message}
      </Typography> */}
      {isReplyVisible && <User msgDetail={messageDetail} users={users} />}

      <Box
        key={messageDetail.id}
        sx={{
          width: "100%",
          textDecoration: "none",
          padding: 0.5,
          "&:hover": {
            backgroundColor: grey[50],
          },
          cursor: "pointer",
        }}
        onClick={() => {
          updateReplyMessages(messageDetail.replies);
          // getMessage(messageDetail);
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            sx={{
              bgcolor: red[500],
              mr: 2,
              mt: 0.5,
              width: 38,
              height: 38,
              borderRadius: "10%",
            }}
            src={user?.profile || ""}
            aria-label="Profile"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                {user?.name || user?.username}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#999999",
                  ml: 1,
                  mt: 0.4,
                }}
              >
                {moment(messageDetail?.ts * 1000).format("LT")}
              </Typography>
            </Box>
            <Box
              sx={{ color: "#444444", fontSize: "14px" }}
              dangerouslySetInnerHTML={{ __html: parseEmojis(message) }}
            ></Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                color: "#999999",
                my: 0.5,
              }}
            >
              {/* {messageDetail.reactions.map((reaction: any) => reaction)} */}
            </Typography>
            {messageDetail.replies && messageDetail.replies.length != 0 && (
              <ListItem>
                <ListItemAvatar>
                  <AvatarGroup max={1}>
                    {arr.map((user: any) => (
                      <Avatar
                        key={user}
                        sx={{ width: 27, height: 27, borderRadius: "20%" }}
                        alt="Remy Sharp"
                        src={user?.profile || ""}
                      />
                    ))}
                  </AvatarGroup>
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 0.5, color: blue[600], py: 0, fontSize: "10px" }}
                >
                  {<>{messageDetail.replies.length} replies</>}
                </ListItemText>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#999999",
                    ml: 1,
                    mt: 0.4,
                  }}
                >
                  Last reply {""}
                  {moment(
                    messageDetail.replies[messageDetail.replies.length - 1].ts *
                      1000
                  ).fromNow()}
                </Typography>
              </ListItem>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dialog;
