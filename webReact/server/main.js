import { Meteor } from "meteor/meteor";
import { Info } from "../imports/api/collection.jsx";

Meteor.startup(() => {});
export const newInfo = new Mongo.Collection("newinfo");
Meteor.publish("test", function () {
  //if (!this.userId) return this.ready();
  return newInfo.find().fetch();
});
