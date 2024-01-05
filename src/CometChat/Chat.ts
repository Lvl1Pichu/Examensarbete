import { CometChat } from "@cometchat/chat-sdk-javascript";

const COMETCHAT_CONSTANTS = {
  APP_ID: "2500920a8d5a66f8",
  REGION: "EU",
  AUTH_KEY: "64b7d20f19139473eb976616d751e447b3a8f516",
};

const appID: string = COMETCHAT_CONSTANTS.APP_ID,
  region: string = COMETCHAT_CONSTANTS.REGION,
  appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();
CometChat.init(appID, appSetting).then(
  (initialized: boolean) => {
    console.log("Initialization completed successfully", initialized);
  },
  (error: CometChat.CometChatException) => {
    console.log("Initialization failed with error:", error);
  }
);

CometChat.getLoggedinUser().then(
  (user: CometChat.User | null) => {
    if (!user) {
      CometChat.login("user12", COMETCHAT_CONSTANTS.AUTH_KEY).then(
        (loggedInUser: CometChat.User) => {
          console.log("Login Successful:", { loggedInUser });
        },
        (error: CometChat.CometChatException) => {
          console.log("Login failed with exception:", { error });
        }
      );
    }
  },
  (error: CometChat.CometChatException) => {
    console.log("Some Error Occurred", { error });
  }
);
