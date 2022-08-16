import { Typography } from "@mui/material";
import Dialog from "./Dialog";
import { TConversation } from '../utils/AppTypes';

const Conversation = ({ channel, messages, users }: TConversation) => {
  return (
    <>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mt: 3, mb: 2, textAlign: "center" }}
      >
        This is the beginning of the #{channel?.name} channel
      </Typography>

      {messages.map((item) => (
        <Dialog key={item.id} messageDetail={item} users={users} />
      ))}
      {/* <iframe width="550" height="240" frameBorder="0"
        src="https://file-examples.com/storage/fe2ef7477862f581f9ce264/2017/04/file_example_MP4_640_3MG.mp4">
      </iframe>

      <iframe width="550" height="240" frameBorder="0"
        src="/assets/videos/sample.mp4">
      </iframe> */}
    </>
  );
};

export default Conversation;
