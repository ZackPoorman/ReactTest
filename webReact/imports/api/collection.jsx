import { Mongo } from "meteor/mongo";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

export const Info = new Mongo.Collection("info");

if (Meteor.isServer) {
  Meteor.publish("info", function employeePublication(
    firstName,
    lastName,
    title,
    paygrade
  ) {
    return Info.find();
  });
}
if (Meteor.isClient) {
  Meteor.subscribe("info");
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
  updateInfo: function ([firstName, lastName, title, paygrade]) {
    Info.update(
      { firstName: this.firstName, lastName: this.lastName },
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
      firstName: firstName,
      lastName: lastName,
      title: title,
      paygrade: paygrade,
    });
  },
});

class viewInf extends Component {
  render() {
    return (
      <div>
        {Info.find({
          firstName: firstName,
          lastName: lastName,
          title: title,
          paygrade: paygrade,
        })}
      </div>
    );
  }
}

export default withTracker((props) => {
  const display = Meteor.subscribe("info");
  return {
    loading: !display.ready(),
    infView: Info.find().fetch(),
  };
})(viewInf);
