import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currInfo: [],
    };
  }

  handleSubmit = () => {
    Meteor.call("submitInfo", [
      this.firstName.value,
      this.lastName.value,
      this.title.value,
      this.paygrade.value,
    ]);
  };

  //No handling of employees with same name -> Give them a role designation "Dev 2"
  handleUpdate = () => {
    Meteor.call("updateInfo", [
      this.firstName.value,
      this.lastName.value,
      this.title.value,
      this.paygrade.value,
    ]);
  };

  handleRemove = () => {
    Meteor.call("removeInfo", {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    });
  };

  handleView = () => {
    let enteredData;
    enteredData = this.props.in.find((docObject) => {
      return (
        docObject.firstName === this.firstName.value &&
        docObject.lastName === this.lastName.value
      );
    });
    this.setState({
      currInfo: {
        firstName: enteredData.firstName,
        lastName: enteredData.lastName,
        title: enteredData.title,
        paygrade: enteredData.paygrade,
      },
    });
  };

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
          <button onClick={() => this.handleSubmit()}>Add Employee</button>
          <button onClick={() => this.handleUpdate()}>Update Info</button>
          <button onClick={() => this.handleRemove()}>Remove Employee</button>
          <button onClick={() => this.handleView()}>View Employee</button>
        </header>
        <div>
          <text>{"Employee Info: "}</text>
        </div>
        <div>
          <text>{`First Name: ${
            this.state.currInfo?.firstName ?? "n/a"
          }`}</text>
        </div>
        <div>
          <text>{`Last Name : ${this.state.currInfo?.lastName ?? "n/a"}`}</text>
        </div>
        <div>
          <text>{`Title: ${this.state.currInfo?.title ?? "n/a"}`}</text>
        </div>
        <div>
          <text>{`Paygrade: ${this.state.currInfo?.paygrade ?? "n/a"}`}</text>
        </div>
      </div>
    );
  }
}

const infoContainer = withTracker(() => {
  const view = Meteor.subscribe("All_Info");
  const loading = !view.ready();

  return {
    loading,
    in: Info.find().fetch(),
  };
})(App);
export default infoContainer;
