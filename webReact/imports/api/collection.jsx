import { Mongo } from "meteor/mongo";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

export const Info = new Mongo.Collection("info");

if (Meteor.isServer) {
  Meteor.publish("info", function (userId) {
    if (!this.userId) return this.ready();
    return Info.find({});
  });
}

Meteor.methods({
  submitInfo: function ([firstName, lastName, title, paygrade]) {
    Info.insert({
      firstName: firstName,
      lastName: lastName,
      title: title,
      paygrade: paygrade,
    });
  },
  //Updates based on original name for each entry
  updateInfo: function ([firstName, lastName, title, paygrade]) {
    Info.update(
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        firstName: firstName,
        lastName: lastName,
        title: title,
        paygrade: paygrade,
      }
    );
  },
  removeInfo: function (firstName, lastName) {
    Info.remove(firstName, lastName);
  },

  viewInfo: function (firstName, lastName, title, paygrade) {
    Info.find({
      firstName,
      lastName,
    }).fetch();
  },
});
