import React, { Component } from "react";

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
});
