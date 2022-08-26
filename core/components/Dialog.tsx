import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { toArray } from "react-emoji-render";
import moment from "moment";
import { TDialog, TUser } from "../utils/AppTypes";
import { StyledComponent } from "@emotion/styled";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Chip from "@mui/material/Chip";

const ExpandMore = styled((props) => {
  return <IconButton {...props} sx={{ fontSize: 6 }} />;
})(() => ({
  transform: "rotate(45deg)",
  marginLeft: "auto",
}));

const Dialog = ({ messageDetail, users }: TDialog) => {
  const usersMap: any = {};
  users.forEach((user) => {
    usersMap[user.userId] = user;
  });

  const user = usersMap[messageDetail.userId];
  const msg = messageDetail.message;
  const message = msg.replace(/<@(.*?)>/g, function replacer(match, p1) {
    return `<strong>@${usersMap[p1]?.name}</strong>`;
  });

  const parseEmojis: any = (value: any) => {
    const emojisArray = toArray(value);

    // toArray outputs React elements for emojis and strings for other
    const newValue = emojisArray.reduce((previous, current: any) => {
      if (typeof current === "string") {
        return previous + current;
      }
      return previous + current.props.children;
    }, "");

    return newValue;
  };

  return (
    <>
      {/* <Box
        key={messageDetail.id}
        sx={{ width: "100%", textDecoration: "none"}}
      > */}
      <Divider style={{ width: "100%" }}>
        <Chip
          sx={{
            backgroundColor: "transparent",
            border: "1px solid lightgrey",
            color: "grey",
            margin: "10px 0",
          }}
          label={moment(messageDetail?.ts * 1000).format("LLLL")}
        />
      </Divider>

      <ListItem
        sx={{
          padding: { sm: "5px 0", md: "5px 15px" },
          "&:hover": {
            backgroundColor: grey[50],
          },
        }}
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
            src={user?.profile}
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
              {user?.name}
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
      {/* <Link href="#" sx={{ textDecoration: "none", mb: 4 }}>
          <Card
            variant="outlined"
            sx={{
              borderBottom: "1px solid ",
              backgroundColor: "transparent",
              // marginBottom: "20px",
              // maxWidth: { md: 600 },
              // minWidth: { md: 600 },
              // "&:hover": {
              //   boxShadow:
              //     "0 4px 8px 0 rgb(151 151 151 / 20%), 0 6px 20px 0 rgb(131 127 127 / 19%)",
              // },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500], mt: 0, width: 32, height: 32 }}
                  src={user?.profile}
                  aria-label="Profile"
                />
              }
              action={
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 400, color: "#999999", marginRight: "7px" }}
                >
                  {moment(messageDetail?.ts * 1000).fromNow()}
                </Typography>
              }
              title={
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {user?.name}
                </Typography>
              }
              sx={{ alignItems: "flex-start", pb: 0 }}
            />

            <CardContent sx={{ p: 0, ml: 8, pr: 1 }}>
              <Box
                sx={{
                  color: grey[800],
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              >
                <Box
                  dangerouslySetInnerHTML={{ __html: parseEmojis(message) }}
                ></Box>
              </Box>
            </CardContent>
          </Card>
        </Link> */}
      {/* </Box> */}
    </>
  );
};

export default Dialog;
