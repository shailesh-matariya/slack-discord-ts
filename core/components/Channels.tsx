import { useEffect, useState } from "react";
import {
  FormControl,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
} from "@mui/material";
import Link from "@mui/material/Link";
import { styled, alpha } from "@mui/material/styles";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { TChannel, TChannels } from '../utils/AppTypes';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  width: "100%",
  color: "lightgray",
  marginTop: "20px",
  padding: "0 25px",
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    border: "1px solid lightgrey",
    borderRadius: "4px",
  },
}));

const MenuTitle = styled("div")(({ theme }) => ({
  padding: "20px 0 0",
  backgroundColor: "grey",
  "&:focus": {
    border: "none",
    boxShadow: "none",
  },
}));

const ChannellList = styled("div")(({ theme }) => ({
  padding: "0 20px",
  [theme.breakpoints.up("md")]: {
    width: "250px",
  },
}));

const ChannelTitle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    paddingLeft: "18px",
  },
  fontWeight: "bold",
  marginBottom: "15px",
}));

const ChannelCard = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: "28rem",
    boxShadow:
      "0 1px 3px rgb(0 0 0 / 5%), 0 20px 25px -5px rgb(0 0 0 / 5%), 0 10px 10px -5px rgb(0 0 0 / 4%)",
    borderRadius: "0.25rem",
  },
  margin: "0 auto",
}));

const ChannelWrapper = styled("div")(({ theme }) => ({
  height: "calc(100vh - 200px)",
  overflowY: "auto",
  marginBottom: "10px",
  fontSize: "small",
  paddingTop: 0,
}));

const Channel = ({ id, name }: TChannel) => {
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton component="a" href={`/chat/${name}`} sx={{ p: 0 }}>
        <ListItemText
          sx={{
            p: 0,
            m: 0,
            borderLeft: 3,
            borderColor: "transparent",
            padding: "0.5rem 1rem",
            fontSize: "14px",
            fontWeight: 500,
            "&:active": {
              borderColor: "#0f5091",
              color: "#0f5091",
            },
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
  const [channel, setChannel] = useState('');
  const channelList = channels.channels;
  const { id } = router.query;

  useEffect(() => {
    if (channelList.length) {
      let ch;
      if (!id) {
        ch = channelList[0];
      } else {
        ch = channelList.find((ch: TChannel) => ch.channelId.toString() == id || ch.name == id);
      }

      if (ch) setChannel(ch.name);
    }
  }, [channelList]);

  const handleChange = (event: any) => {
    setChannel(event.target.value);
    router.push(`/chat/${event.target.value}`)
  };


  return (
    <>
      <Box sx={{ width: '100%' }}>
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
            <div
              style={{
                padding: "24px 0",
                width: "100%",
              }}
            >
              <ChannelTitle>Channels</ChannelTitle>
              <FormControl fullWidth>
                <Select
                  value={channel}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ display: { md: "none" } }}
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
                  <Channel key={item.id} {...item} />
                ))}
              </ChannelWrapper>

              <Link
                href="#!"
                underline="none"
                style={{
                  paddingLeft: "27px",
                  opacity: "0.7",
                  fontSize: "small",
                  color: "black",
                }}
                sx={{ display: { xs: "none", md: "block" } }}
                target="_blank"
              >
                {"Powered by Linen"}
              </Link>
            </div>
          </ChannelCard>
        </ChannellList>
      </Box>
    </>
  );
};

export default Channels;
