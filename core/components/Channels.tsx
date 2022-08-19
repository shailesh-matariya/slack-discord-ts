import { useEffect, useState } from "react";
import {
  FormControl,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { TChannel, TChannels } from "../utils/AppTypes";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  width: "100%",
  color: "lightgray",
  margin: "30px 0 15px 0",
  padding: "0 20px",
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca6b4",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  boxShadow: "0 .125rem 0.25rem lightgrey",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "4px",
  },
}));

const ChannellList = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "250px",
  },
  width: "100%",
}));

const ChannelTitle = styled(Box)(({ theme }) => ({
  fontWeight: "bold",

  [theme.breakpoints.up("md")]: {
    marginBottom: "-5px",
    backgroundColor: grey[100],
    borderBottom: "1px solid lightgrey",
    color: grey[800],
  },
  color: grey[700],
}));

const ChannelCard = styled(Box)(({ theme }) => ({
  background: "#fff",
  [theme.breakpoints.up("md")]: {
    maxWidth: "28rem",
    border: "1px solid lightgrey",
  },
  margin: "0 auto",
}));

const ChannelWrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflowY: "auto",
  fontSize: "small",
}));

const Channel = ({ id, name, selected }: TChannel) => {
  const router = useRouter();

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        className="channel"
        component="a"
        sx={{ p: 0 }}
        onClick={() => router.push(`/chat/${name}`)}>
        <ListItemText
          className={ selected ? 'active': '' }
          sx={{
            p: 0,
            m: 0,
            borderLeft: 3,
            borderColor: "transparent",
            padding: "0.55rem 2.2rem",
            fontSize: "14px",
            fontWeight: 500,
            color: grey[700]
          }}
        >
          # {name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

const Channels = (channels: TChannels) => {
  const router = useRouter();
  const [channel, setChannel] = useState("");
  const [state, setstate] = useState();
  const channelList = channels.channels;
  const { id } = router.query;

  useEffect(() => {
    if (channelList.length) {
      let ch;
      if (!id) {
        ch = channelList[0];
      } else {
        ch = channelList.find(
          (ch: TChannel) => ch.channelId.toString() == id || ch.name == id
        );
      }

      if (ch) setChannel(ch.name);
    }
  }, [channelList]);

  const handleChange = (event: any) => {
    setChannel(event.target.value);
    router.push(`/chat/${event.target.value}`);
  };

  return (
    <>
      <Box
        sx={{
          width: { md: "100%", xs: "91%" },
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Search sx={{ display: { md: "none", xs: "inline-block" } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search messages"
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "#090707", fontSize: "medium", width: "100%" }}
          />
        </Search>

        <ChannellList sx={{ display: "block" }}>
          <ChannelCard>
            <Box
              sx={{
                paddingBottom: { md: "24px", xs: "20px" },
                width: "100%",
              }}
            >
              <ChannelTitle
                sx={{ padding: { md: "24px 40px", xs: "10px 25px" } }}
              >
                Channels
              </ChannelTitle>
              <FormControl fullWidth>
                <Select
                  value={channel}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    display: { md: "none" },
                    height: 40,
                    backgroundColor: grey[200],
                    border: 0,
                    margin: "0 20px",
                  }}
                >
                  {channelList.map((item: TChannel) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <ChannelWrapper sx={{ display: { xs: "none", md: "block" } }}>
                {channelList.map((item: TChannel) => (
                  <Channel key={item.id} {...item} selected={ (item.name === channel) } />
                ))}
              </ChannelWrapper>
            </Box>
          </ChannelCard>
        </ChannellList>
      </Box>
    </>
  );
};

export default Channels;
