if (Meteor.isServer) {
  Meteor.publish("All_Info", function () {
    return Info.find();
  });
}
