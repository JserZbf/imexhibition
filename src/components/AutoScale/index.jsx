import React, { Component } from 'react';
import { min, debounce } from 'lodash-es';

export default (Com) => {
  class AutoScale extends Component {
    constructor() {
      super();
      this.state = {
        scale: 1,
        windowInnerHeight: window.innerHeight,
        windowInnerWidth: window.innerWidth,
      };
      this.resize = debounce(() => {
        const scale = min([window.innerWidth / 2560, window.innerHeight / 1600]);
        this.setState((state) => ({
          ...state,
          scale,
          windowInnerHeight: window.innerHeight,
          windowInnerWidth: window.innerWidth,
        }));
      }, 100);
    }

    componentDidMount() {
      this.resize();
      window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }

    render() {
      const { scale, windowInnerHeight, windowInnerWidth } = this.state;
      return (
        <Com
          {...this.props}
          scale={scale}
          windowInnerHeight={windowInnerHeight}
          windowInnerWidth={windowInnerWidth}
        />
      );
    }
  }
  return AutoScale;
};
