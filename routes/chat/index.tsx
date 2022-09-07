import { useRouter } from "next/router";
import { Box, Grid, Typography } from "@mui/material";
import Conversation from "../../core/components/Conversation";
import { styled } from "@mui/material/styles";
import { httpClient } from "../../core/utils/Api";
import { useEffect, useState } from "react";
import { TChannel } from "../../core/utils/AppTypes";
import { grey } from "@mui/material/colors";
import Channels from "../../core/components/Channels";

const Chat = ({ teamId, chProp, secondaryColor }: any) => {
  const router = useRouter();
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [replyMessages, setReplyMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [reply, setReply] = useState();

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
      getMessages(ch.id);
    });
  };

  const getMessages = (chId: number) => {
    httpClient.get(`/channel-messages?channel_id=${chId}`).then((resp) => {
      setMessages(resp.data.message_collection.data);
      resp.data.message_collection.data.map((item: any) => {
        setReply(item.replies);
      });
    });
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
    // paddingTop: "20px",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      width: "93%",
    },
    width: "91%",
  }));

  const ReplyWrapper = styled("div")(({ theme }) => ({
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "0 1rem",
    width: "100%",
  }));

  const updateReplyMessages = (message: []) => {
    setReplyMessages(message);
    setIsReplyVisible(true);
  };

  return (
    <>
      <Grid container>
        {/* Channels */}
        <Grid
          item
          md={2}
          xs={12}
          sx={{ display: { lg: "flex", xs: "hidden" } }}
        >
          <Channels teamId={teamId} channels={channels} />
        </Grid>

        {/* Coversation */}
        <Grid
          item
          md={10}
          xs={12}
          sx={{
            display: "inset",
            backgroundColor: secondaryColor || grey[200],
          }}
        >
          <Box
            sx={{
              width: { xs: "91%", sm: "100%" },
              mx: "auto",
              px: { md: 0, sm: 2.5 },
              display: { sm: "flex" },
            }}
          >
            {/* Messages */}
            <Box
              sx={{
                // pr: { md: 2 },
                width:
                  isReplyVisible && replyMessages.length != 0
                    ? { lg: "75%", md: "65%", xs: "50%" }
                    : "100%",
                display: "flex",
                justifyContent: "center",
                height: "calc(100vh - 74px)",
                overflow: "auto",
              }}
            >
              <ConversationWrapper>
                <Conversation
                  channel={selectedChannel}
                  messages={messages}
                  users={users}
                  updateReplyMessages={updateReplyMessages}
                />
              </ConversationWrapper>
            </Box>

            {/* Replies */}
            {isReplyVisible && replyMessages.length != 0 && (
              <Box
                sx={{
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "1px solid lightgrey",
                  width: { lg: "25%", md: "35%", xs: "50%" },
                  height: "calc(100vh - 72px)",
                }}
              >
                <ReplyWrapper>
                  {/* Reply Title */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "between",
                      borderBottom: "1px solid lightgrey",
                      p: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "between",
                      }}
                    >
                      <Typography
                        sx={{ pl: 1, fontWeight: "500", whiteSpace: "noWrap" }}
                      >
                        {chProp}
                      </Typography>
                      <Typography
                        sx={{
                          display: { md: "flex", xs: "none" },
                          ml: { lg: 27, sm: 15 },
                        }}
                      >
                        <a href="#" onClick={() => setIsReplyVisible(false)}>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="x"
                            role="img"
                            height={15}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            color="gray"
                          >
                            <path
                              fill="currentColor"
                              d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"
                            ></path>
                          </svg>
                        </a>
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        margin: "0.5rem 0",
                        padding: { lg: "0 1rem", md: 0 },
                        width: "100%",
                      }}
                    >
                      {replyMessages.length && (
                        <Conversation
                          channel={selectedChannel}
                          messages={replyMessages}
                          users={users}
                          isReplyVisible={isReplyVisible}
                          updateReplyMessages={updateReplyMessages}
                          // selectedMessage = {}
                        />
                      )}
                    </Box>
                  </Box>
                </ReplyWrapper>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
