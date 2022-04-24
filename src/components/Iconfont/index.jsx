import React, { Component } from 'react';

class Iconfont extends Component {
  render() {
    const {
      width,
      height,
      className,
      src,
      iconMode,
      type,
      disabled,
      style: styleProps,
      ...restPorps
    } = this.props;
    if (iconMode === 'svg') {
      const style = {
        ...styleProps,
        width: width || height || '1em',
        height: height || width || '1em',
      };
      if (src) {
        return <embed type="image/svg+xml" src={src} style={style} />;
      }
      return (
        <span className={className || ''}>
          <svg aria-hidden="true" style={style}>
            <use xlinkHref={`#${(type || '').startsWith('icon-') ? type : `icon-${type}`}`} />
          </svg>
        </span>
      );
    }
    return (
      <i
        style={styleProps}
        className={`iconfont ${
          (type || '').startsWith('icon-') ? type : `icon-${type}`
        } ${className}`}
        {...restPorps}
      />
    );
  }
}
Iconfont.defaultProps = {
  width: undefined,
  height: undefined,
  className: '',
  iconMode: 'unicode',
};

export default Iconfont;
