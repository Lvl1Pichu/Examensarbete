import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import fs from "fs";

const UIConstants = fs.readFileSync("./config.json").toJSON();

//create the builder
export const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(UIConstants.APP_ID)
  .setRegion(UIConstants.REGION)
  .setAuthKey(UIConstants.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

//Initialize CometChat UIKit
CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  })
  .catch(console.log);
