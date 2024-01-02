import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

//create the builder
export const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId("2500920a8d5a66f8")
  .setRegion("EU")
  .setAuthKey("64b7d20f19139473eb976616d751e447b3a8f516")
  .subscribePresenceForFriends()
  .build();

//Initialize CometChat UIKit
CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  })
  .catch(console.log);
