import fs from "fs";
import CometChat from "@cometchat/chat-sdk-javascript";

const UID = "UID";
const name = "Linus";
const authKey = fs.readFileSync("../config.json");

const user = new CometChat.User(UID);

user.setName(name);

CometChat.createUser(user, authKey).then(
  (user: CometChat.User) => {
    console.log("user created", user);
  },
  (error: CometChat.CometChatException) => {
    console.log("error", error);
  }
);
// Send message
