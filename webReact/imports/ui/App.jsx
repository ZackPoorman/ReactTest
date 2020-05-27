import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currInfo: [],
    };
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
    let enteredData;
    enteredData = this.props.in.find((docObject) => {
      console.log(enteredData);
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
    //console.log(this.props);
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
        <textarea
          type=""
          value={
            this.state.currInfo.firstName +
            " " +
            this.state.currInfo.lastName +
            " " +
            this.state.currInfo.title +
            " " +
            this.state.currInfo.paygrade
          }
          readOnly={true}
          placeholder="Employee Info..."
        />
      </div>
    );
  }
}

const infoContainer = withTracker(() => {
  const view = Meteor.subscribe("All_Info");
  const loading = !view.ready();
  //console.log(loading);
  //let temp = Info.find().fetch();
  //console.log(temp);
  return {
    loading,
    in: Info.find().fetch(),
  };
})(App);
export default infoContainer;
