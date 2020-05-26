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
    return Info.find({
      firstName,
      lastName,
      title,
      paygrade,
    }).fetch();
  },
});
