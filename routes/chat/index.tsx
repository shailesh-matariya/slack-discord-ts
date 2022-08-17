import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import Channels from "../../core/components/Channels";
import Conversation from "../../core/components/Conversation";
import { styled } from "@mui/material/styles";
import { httpClient } from "../../core/utils/Api";
import { useEffect, useState } from "react";
import { TChannel } from '../../core/utils/AppTypes';

const Chat = ({ id }: any) => {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState<TChannel>({ id: 0, channelId: 0, name: '' });
  var ch;

  const getChannels = () => {
    httpClient
      .get(`/slack-channels?platform=slack&team_id=T03SH2Y8PJM`)
      .then(({ data }) => {
        const channels = data.channel_collection;
        setChannels(channels);
        if (!id) {
          ch = channels[0];
        } else {
          ch = channels.find((ch: TChannel) => ch.channelId === id || ch.name === id);
        }

        setSelectedChannel(ch);
        getMassages(ch.id);
      });
  };

  const getMassages = (chId: number) => {
    httpClient
      .get(
        `/channel-messages?platform=slack&team_id=T03SH2Y8PJM&channel_id=${chId}`
      )
      .then((resp) => setMessages(resp.data.message_collection.data));
  };

  const getUsers = () => {
    httpClient
      .get(`/slack-users?platform=slack&team_id=T03SH2Y8PJM`)
      .then((resp) => setUsers(resp.data.user_collection));
  };

  useEffect(() => {
    getChannels();
    getUsers();
  }, [id]);

  const ConversationWrapper = styled("div")(({ theme }) => ({
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
          <Channels channels={channels} />
        </Grid>

        <Grid
          item
          md={10}
          xs={12}
          sx={{
            display: "inset",
            overflow: "auto",
            height: "calc(100vh - 80px)",
          }}
        >
          <Container sx={{ px: {md:6,xs:2}}}>
            <ConversationWrapper>
              <Conversation
                channel={selectedChannel}
                messages={messages}
                users={users} />
            </ConversationWrapper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
