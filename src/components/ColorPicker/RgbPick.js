import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";
import { getContrastYIQ } from "../../stores/ColorLogic";
import "./ColorPicker.css";

@observer
class RgbPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r: undefined,
      g: undefined,
      b: undefined
    };
  }

  componentDidMount() {
    const { dataStore } = this.props;
    const swatch = dataStore.currentPalatte.colors[dataStore.targetSwatch];
    this.setState({
      r: swatch.rgb[0],
      g: swatch.rgb[1],
      b: swatch.rgb[2]
    });
  }

  updateStore = () => {
    const { dataStore } = this.props;
    const { r, g, b } = this.state;
    dataStore.changeRgb(r, g, b);
  };

  handleRChange = val => {
    this.setState({
      r: val
    });
    this.updateStore();
  };
  handleGChange = val => {
    this.setState({
      g: val
    });
    this.updateStore();
  };
  handleBChange = val => {
    this.setState({
      b: val
    });
    this.updateStore();
  };

  static propTypes = {
    dataStore: PropTypes.object
  };

  render() {
    const { dataStore } = this.props;

    const swatch = dataStore.currentPalatte.colors[dataStore.targetSwatch];

    const handleStyle = {
      background: `hsl(${swatch.hue}, ${swatch.saturation}%, ${swatch.lightness}%)`,
      color: `${getContrastYIQ(swatch.hex, 0.8, false)}`,
      borderColor: `${getContrastYIQ(swatch.hex, 0.8, false)}`
    };
    const backgroundRed = {
      background: `
      linear-gradient(to right,
        rgb(0, 0, 0),
        rgb(255, 0, 0)`
    };
    const backgroundGreen = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(0, 255, 0)`
    };
    const backgroundBlue = {
      background: `
        linear-gradient(to right,
          rgb(0, 0, 0),
          rgb(0, 0, 255)`
    };

    return (
      <div className="sliders">
        <div className="slider-container">
          <h2 className="slider-heading">R</h2>
          <div className="bar-container" style={backgroundRed}>
            <ReactSlider
              className="bar"
              style={backgroundRed}
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={swatch.rgb[0]}
              withBars={true}
              pearling={true}
              value={swatch.rgb[0]}
              onChange={value => this.handleRChange(value)}
            >
              <div className="my-handle" style={handleStyle}>
                {swatch.rgb[0]}
              </div>
            </ReactSlider>
          </div>
        </div>

        <div className="slider-container">
          <h2 className="slider-heading">G</h2>
          <div className="bar-container" style={backgroundGreen}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={swatch.rgb[1]}
              withBars={true}
              pearling={true}
              value={swatch.rgb[1]}
              onChange={value => this.handleGChange(value)}
            >
              <div className="my-handle" style={handleStyle}>
                {swatch.rgb[1]}
              </div>
            </ReactSlider>
          </div>
        </div>
        <div className="slider-container">
          <h2 className="slider-heading">B</h2>
          <div className="bar-container" style={backgroundBlue}>
            <ReactSlider
              className="bar"
              handleClassName="test-handle"
              barClassName="test-bar"
              min={0}
              max={255}
              defaultValue={swatch.rgb[2]}
              withBars={true}
              pearling={true}
              value={swatch.rgb[2]}
              onChange={value => this.handleBChange(value)}
            >
              <div className="my-handle" style={handleStyle}>
                {swatch.rgb[2]}
              </div>
            </ReactSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default RgbPick;
