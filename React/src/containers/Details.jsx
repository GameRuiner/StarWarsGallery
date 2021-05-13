import React, { Component } from "react";
import equal from "fast-deep-equal";
import { SwapiService } from "../services";

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacter: props.selectedCharacter,
      homeworld: "",
      vehicles: [],
    };
    this.updateUser = this.updateCharacter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.selectedCharacter, prevProps.selectedCharacter)) {
      this.updateCharacter();
    }
  }

  updateCharacter() {
    this.setState({
      selectedCharacter: this.props.selectedCharacter,
      homeworld: "",
      vehicles: [],
    });
    SwapiService.GetCharactersDetails(
      this.props.selectedCharacter.homeworld,
      "name"
    ).then((value) => {
      this.setState({
        homeworld: value,
      });
    });

    for (const vehicle_url of this.props.selectedCharacter.vehicles) {
      SwapiService.GetCharactersDetails(vehicle_url, "name").then((value) => {
        this.setState({
          vehicles: this.state.vehicles.concat([value]),
        });
      });
    }
  }

  render() {
    return (
      <div className="details">
        <h2>Details</h2>
        {this.state.selectedCharacter ? (
          <div className="character-details">
            <ul>
              <li> Name: {this.state.selectedCharacter.name} </li>
              <li> Birth year: {this.state.selectedCharacter.birth_year} </li>
              <li> Homeworld: {this.state.homeworld}</li>
              {this.state.vehicles.length ? <li> Vechicles: {this.state.vehicles.join(", ")}</li> : ""}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
