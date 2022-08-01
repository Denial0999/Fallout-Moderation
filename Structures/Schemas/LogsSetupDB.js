const { model, Schema } = require("mongoose");

module.exports = model(
  "LogsSetup",
  new Schema({
    GuildID: {type: String, default: null},
    MemberLogsChannel: {type: String, default: null},
    InviteLogsChannel: {type: String, default: null},
    MessageLogsChannel: {type: String, default: null},
    ChannelLogsChannel: {type: String, default: null},
    RoleLogsChannel: {type: String, default: null},
    OtherLogs: {type: String, default: null},
  })
);
