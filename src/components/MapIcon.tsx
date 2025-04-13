import React, { Component } from "react";

interface MapIconProps {
  icon: string;
  name: string;
}

class MapIcon extends Component<MapIconProps> {
  render() {
    const { icon, name } = this.props;

    return (
      <img
        src={`/icons/${icon}.png`}
        alt={name}
        style={{ width: `40px`, height: `40px` }}
      />
    );
  }
}

export default MapIcon;
