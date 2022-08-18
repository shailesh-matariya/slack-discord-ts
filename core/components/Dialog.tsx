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
      <Box key={messageDetail.id} sx={{ width: { xs: "100%", md: 600 } }}>
        <Link href="#" sx={{ textDecoration: "none", mb: 4 }}>
          <Card
            variant="outlined"
            sx={{
              marginBottom: "20px",
              maxWidth: { md: 600 },
              minWidth: { md: 600 },
              "&:hover": {
                boxShadow:
                  "0 4px 8px 0 rgb(151 151 151 / 20%), 0 6px 20px 0 rgb(131 127 127 / 19%)",
              },
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
        </Link>
      </Box>
    </>
  );
};

export default Dialog;
