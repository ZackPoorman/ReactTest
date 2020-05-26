import { Meteor } from "meteor/meteor";
import "/server/pubs.js";
import "/server/methods.js";

Info = new Mongo.Collection("Info");
Meteor.startup(() => {});
