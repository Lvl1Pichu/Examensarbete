import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

const COMETCHAT_CONSTANTS = {
APP_ID: "APP_ID", //Replace with your App ID
REGION: "REGION", //Replace with your App Region
AUTH_KEY: "AUTH_KEY" //Replace with your Auth Key
}

//create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

//Initialize CometChat UIKit
CometChatUIKit.init(UIKitSettings).then(() => {
  console.log("Initialization completed successfully");
  // You can now call login function.
}).catch(console.log);