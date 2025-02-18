/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */
/* eslint-env node, mocha */
'use strict';

import React, { Component } from "react";
import PropTypes            from "prop-types";
import { View, Animated }   from "react-native";

export default class BlinkView extends Component
{
  /**
   * Local timer handled function. Destroyed on unmount
   * @type {Function}
   */
  _onDelay:any = null;

  /**
   * Props validation
   * @type {Object} Ex: {
   *   element  : {any}     Blinking element type, can be 'View', 'Text' or any kind of <Element />, Default is 'View'
   *   children : {any}     Element displayed in within the <BlinkView>{...}</BlinkView>, it can be a {string} or any kind of <Element />, Default is null
   *   delay    : {number}  Delay between each blinks in miliseconds, Default is 1500 millisec
   *   blinking : {boolean} Defines if the element is currently blinkink, Default is true
   * }
   */
  static propTypes:Object = {
    element  : PropTypes.any,
    children : PropTypes.any,
    delay    : PropTypes.number,
    blinking : PropTypes.bool
  }

  /**
   * Default props
   * @return {object} Default props for this element.
   */
  static defaultProps:Object = {
    element  : View,
    children : null,
    delay    : 1500,
    blinking : true
  }

  /**
   * Init states
   * @return {object} states
   */
  constructor( props:Object, state:Object ):Object
  {
    try
    {
      super( props );

      this.state = {
        delay     : props && props.delay || 1500,
        blinkAnim : new Animated.Value( 0.5 )
      };
    }
    catch ( err )
    {
      console.warn( err );
    }
  }

  componentDidMount():void
  {
    try
    {
      if ( this.props.blinking === true )
      {
        clearInterval( this._onDelay );
        this._onDelay = setInterval( ():void =>
        {
          this.state.blinkAnim.stopAnimation();
          Animated.timing( this.state.blinkAnim, {
            toValue   : this.state.blinkAnim._value === 0.5 ? 1 : 0.5,
            duration  : this.state.delay-1
          }).start();
        }, this.state.delay+1 );
      }
    }
    catch ( err )
    {
      console.warn( err );
    }
  }
  componentDidUpdate (prevProps, prevState) {
    try
    {
      if ( prevProps.blinking !== this.props.blinking && this.props.blinking )
      {
        clearInterval( this._onDelay );
        this._onDelay = setInterval( ():void =>
        {
          this.state.blinkAnim.stopAnimation();
          Animated.timing( this.state.blinkAnim, {
            toValue   : this.state.blinkAnim._value === 0.5 ? 1 : 0.5,
            duration  : this.state.delay-1
          }).start();
        }, this.state.delay+1 );
      }
    }
    catch ( err )
    {
      console.warn( err );
    }
  }
  componentWillUnmount():void
  {
    try
    {
      clearInterval( this._onDelay );
    }
    catch ( err )
    {
      console.warn( err );
    }
  }

  render ()
  {
      const isBlinking:bolean = this.props && this.props.blinking || false;
      const Element:any = ( ( isBlinking === true ) ?
        Animated.createAnimatedComponent( this.props && this.props.element ) : this.props && this.props.element )
      return  (
        <Element
          {...this.props}
          style = {[this.props.style, { opacity: ( isBlinking === true ) ? this.state.blinkAnim : 1 } ]}>
          {this.props && this.props.children}
        </Element>
      )
    }
    // return (
    //   this.props && this.props.children || <View />
    // );

}
