import { useRouter } from "next/router";
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Channels from "../../core/components/Channels";
import Conversation from "../../core/components/Conversation";
import { styled } from "@mui/material/styles";
import { httpClient } from "../../core/utils/Api";
import { useEffect, useState } from "react";
import { TChannel } from "../../core/utils/AppTypes";
import { grey } from "@mui/material/colors";

const Chat = ({ teamId, chProp, secondaryColor }: any) => {
  const router = useRouter();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState<any>({
    id: 0,
    channelId: 0,
    name: "",
  });
  var ch;

  const getChannels = () => {
    httpClient.get(`/slack-channels`).then(({ data }) => {
      const channels = data.channel_collection;
      setChannels(channels);
      if (!chProp) {
        ch = channels[0];
      } else {
        ch = channels.find(
          (ch: TChannel) => ch.channelId === chProp || ch.name === chProp
        );
      }

      if (!ch) return router.push("/404");

      setSelectedChannel(ch);
      getMassages(ch.id);
    });
  };

  const getMassages = (chId: number) => {
    httpClient
      .get(`/channel-messages?channel_id=${chId}`)
      .then((resp) => setMessages(resp.data.message_collection.data));
  };

  const getUsers = () => {
    httpClient
      .get(`/slack-users`)
      .then((resp) => setUsers(resp.data.user_collection));
  };

  useEffect(() => {
    getChannels();
    getUsers();
  }, [teamId, chProp]);

  const ConversationWrapper = styled("div")(({ theme }) => ({
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    // height: "calc(100vh - 80px)",
    // [theme.breakpoints.up("md")]: {
    //   width: "calc(100vw - 225px)",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   width: "calc(100vw - 352px)",
    // },
  }));

  return (
    <>
      <Grid container>
        <Grid
          item
          md={2}
          xs={12}
          sx={{ display: { lg: "flex", xs: "hidden" } }}
        >
          <Channels teamId={teamId} channels={channels} />
        </Grid>

        <Grid
          item
          md={10}
          xs={12}
          sx={{
            display: "inset",
            overflow: "auto",
            height: "calc(100vh - 80px)",
            backgroundColor: secondaryColor || grey[200],
          }}
        >
          <Box
            sx={{
              px: { sm: 7, md: 2 },
              width: "100%",
              minWidth: { sm: "100%" },
            }}
          >
            <ConversationWrapper>
              <Conversation
                channel={selectedChannel}
                messages={messages}
                users={users}
              />
            </ConversationWrapper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
