import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Info } from "../api/collection.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    Meteor.call("submitInfo", [
      this.firstName.value,
      this.lastName.value,
      this.title.value,
      this.paygrade.value,
    ]);
  };

  //No handling of employees with same name -> Give them a role designation "Dev 2"
  handleUpdate = (event) => {
    Meteor.call("updateInfo", [
      this.firstName.value,
      this.lastName.value,
      this.title.value,
      this.paygrade.value,
    ]);
  };

  handleRemove = (event) => {
    Meteor.call("removeInfo", {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    });
  };

  handleView = (event) => {
    /*     Info.findOne({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      title: this.title.value,
      paygrade: this.paygrade.value,
    }); */
    Meteor.call("viewInfo", {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      title: this.title.value,
      paygrade: this.paygrade.value,
    });
  };
  renderEmp() {}

  render() {
    return (
      <div className="container">
        <header>
          <h1>HR Employee Dashboard</h1>

          <form className="firstName">
            <input
              type="text"
              ref={(firstName) => (this.firstName = firstName)}
              placeholder="First Name"
            />
          </form>
          <form className="lastName">
            <input
              name="lastName"
              type="text"
              ref={(lastName) => (this.lastName = lastName)}
              placeholder="Last Name"
            />
          </form>
          <form className="title">
            <input
              type="text"
              ref={(title) => (this.title = title)}
              placeholder="Job Title"
            />
          </form>
          <form className="paygrade">
            <input
              type="text"
              ref={(paygrade) => (this.paygrade = paygrade)}
              placeholder="Current Pay Grade"
            />
          </form>
          <button onClick={this.handleSubmit}>Add Employee</button>
          <button onClick={this.handleUpdate}>Update Info</button>
          <button onClick={this.handleRemove}>Remove Employee</button>
          <button onClick={this.handleView}>View Employee</button>
        </header>
      </div>
    );
  }
}

export default withTracker(({ userId }) => {
  const view = Meteor.subscribe("test");
  const inf = Meteor.subscribe("info");
  const thisUser = Meteor.user();
  const loading = !view.ready() || !inf.ready();
  let output = [];
  if (!loading) {
    output = Info.find({}).fetch();
  }
  return {
    loading,
    output,
  };
})(App);
