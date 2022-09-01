import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
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

const ExpandMore = styled((props) => {
  return <IconButton {...props} sx={{ fontSize: 6 }} />;
})(() => ({
  transform: "rotate(45deg)",
  marginLeft: "auto",
}));

const Dialog = ({ messageDetail, users, updateReplyMessages }: TDialog) => {
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

  const arr = users.filter((item: any) => userArray.includes(item.userId));

  const parseEmojis: any = (value: any) => {
    const emojisArray = Array(value);

    const newValue = emojisArray.reduce((previous: any, current: any) => {
      if (typeof current === "string") {
        return previous + current;
      }
      return previous + current.props.children;
    }, "");

    return newValue;
  };
  const router = useRouter();

  return (
    <>
      <Box
        key={messageDetail.id}
        sx={{
          width: "100%",
          textDecoration: "none",
          padding: 1,
          "&:hover": {
            backgroundColor: grey[50],
          },
          cursor: "pointer",
        }}
        onClick={() => updateReplyMessages(messageDetail.replies)}
      >
        <ListItem
          key={messageDetail.id}
          secondaryAction={
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                color: "#999999",
                marginRight: "auto",
                marginTop: "-20px",
              }}
            >
              {moment(messageDetail?.ts * 1000).fromNow()}
            </Typography>
          }
          disablePadding
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: red[500],
                mt: 0,
                width: 38,
                height: 38,
                borderRadius: "50%",
              }}
              src={user?.profile || ""}
              aria-label="Profile"
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "black",
                }}
              >
                {user?.name || user?.username}
              </Typography>
            }
            secondary={
              <>
                <Box
                  sx={{
                    color: grey[800],
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  <Box
                    dangerouslySetInnerHTML={{ __html: parseEmojis(message) }}
                  ></Box>
                </Box>
              </>
            }
          />
        </ListItem>
        {/* <List> */}
        <ListItem sx={{ ml: 5 }}>
          <ListItemAvatar>
            <AvatarGroup max={1}>
              {arr.map((user: any) => (
                <Avatar
                  key={user}
                  sx={{ width: 30, height: 30 }}
                  alt="Remy Sharp"
                  src={user?.profile || ""}
                />
              ))}
            </AvatarGroup>
          </ListItemAvatar>
          <ListItemText sx={{ ml: 1, color: blue[600] }}>
            {messageDetail.replies && messageDetail.replies.length != 0 && (
              <>{messageDetail.replies.length} replies</>
            )}
          </ListItemText>
        </ListItem>
      </Box>
    </>
  );
};

export default Dialog;
