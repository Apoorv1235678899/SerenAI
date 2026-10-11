import "server-only";
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "serenai",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
