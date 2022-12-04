import {
  APIMessage,
  Client,
  ClientOptions,
  Message,
  MessageComponentInteraction,
} from "discord.js";

export default class PingMocks {
  static clientOptions: ClientOptions = {
    intents: 0,
  };
  static client: Client = new Client(this.clientOptions);
  static message: MessageComponentInteraction = {
    reply: jest.fn().mockResolvedValue(true),
  } as unknown as MessageComponentInteraction;
}
