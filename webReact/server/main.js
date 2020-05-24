import { Meteor } from "meteor/meteor";
import { Info } from "../imports/api/collection.jsx";

Meteor.startup(() => {
  try {
    Accounts.createUser({
      username: "user1",
      password: "aaa",
    });
    Accounts.createUser({
      username: "user2",
      password: "aaa",
    });
    Accounts.createUser({
      username: "user2",
      password: "aaa",
    });
  } catch (error) {}
});

Meteor.publish("test", function () {
  if (!this.userId) return this.ready();
  return Info.find({}).fetch();
});
