import { Inngest } from "inngest";

// Initialize the Inngest client
export const inngest = new Inngest({
  id: "serenai",
  // You can add your Inngest signing key here if you have one
  eventKey:
    "2dAcpFIKetptx0muq6izHTIu113y5njlF8xaujzKEVUZnly8mAjg5D1ieXaxQd7OZvcRKeNvMd83tRDoASIChQ",
});

// Export the functions array (this will be populated by the functions.ts file)
export const functions: any[] = [];