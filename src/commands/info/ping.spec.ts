import "jest";
import PingMocks from "../../mocks/ping.mocks";
import PingCommand from "./ping";

let pingCommand: PingCommand = new PingCommand();

describe("Ping Command", () => {
  it("should reply successfully", async () => {
    const result = await pingCommand.execute(
      PingMocks.client,
      PingMocks.message,
      null,
      null
    );
    expect(PingMocks.message.reply).toBeCalledTimes(1);
    expect(result).toEqual(true);
  });
});
