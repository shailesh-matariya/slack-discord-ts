import { ReactNode } from "react";

export type TProps = { children: ReactNode };

export type TChannel = {
  teamId: string;
  id: number;
  channelId: number;
  name: string;
  selected: boolean;
};

export type TChannels = {
  channels: TChannel[];
};

export type TMessage = {
  id: number;
  message: string;
  userId: string;
  ts: number;
  replies: any;
};

export type TUser = {
  id: number;
  userId: string;
  username: string;
};

export type TConversation = {
  channel: TChannel;
  messages: TMessage[];
  users: TUser[];
  replies?: [];
  updateReplyMessages(messages: []): any;
  isReplyVisible?: boolean;
};

export type TDialog = {
  messageDetail: TMessage;
  users: TUser[];
  ts?: string;
  updateReplyMessages(messages: any): any;
};
