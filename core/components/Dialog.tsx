import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { toArray } from "react-emoji-render";
import moment from "moment";
import { TDialog, TUser } from '../utils/AppTypes';
import { StyledComponent } from '@emotion/styled';

const ExpandMore = styled((props) => {
  return <IconButton {...props} sx={{ fontSize: 6 }} />;
})(() => ({
  transform: "rotate(45deg)",
  marginLeft: "auto",
}));

const Dialog = ({ messageDetail, users }: TDialog) => {
  const usersMap: any = {};
  users.forEach(user => {
    usersMap[user.userId] = user;
  });

  const user = usersMap[messageDetail.userId];
  const msg = messageDetail.message;
  const message = msg.replace(/<@(.*?)>/g, function replacer(match, p1) {
    return `<strong>@${usersMap[p1]?.username}</strong>`;
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
      <div key={messageDetail.id} sx={{ width: { xs: "100%", md: 700 } }}>
        <Link href="#" sx={{ textDecoration: "none", mb: 4 }}>
          <Card
            sx={{
              boxShadow: "none",
              borderTop: "1px solid rgb(229, 231, 235)",
              maxWidth: { md: 700 },
              minWidth: 700,
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
                  sx={{ fontWeight: 400, color: "#999999" }}
                >
                  {moment(messageDetail?.ts * 1000).fromNow()}
                </Typography>
              }
              title={
                <Typography
                  variant="captipn"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                  }}
                >
                  {user?.username}
                </Typography>
              }
              sx={{ alignItems: "flex-start", pb: 0 }}
            />

            <CardContent sx={{ p: 0, ml: 8, pr: 1 }}>
              <Box
                sx={{
                  color: "text.primary",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: parseEmojis(message) }}
                ></div>
              </Box>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default Dialog;
