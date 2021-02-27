import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, View, ImageBackground, Image} from 'react-native';

import {ViewPropTypes, getStatusBarHeight, withTheme, spacing} from '../config';
import {renderNode, nodeType} from '../helpers';

import Text from '../text/Text';
import Icon from '../icons/Icon';
import {BtnLink} from '../buttons/BtnLink';
import {imagesTheme} from '../../config/images';

const ALIGN_STYLE = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

const Children = ({style, placement, children}) => (
  <View
    style={StyleSheet.flatten([{alignItems: ALIGN_STYLE[placement]}, style])}>
    {children == null || children === false
      ? null
      : children.text
      ? renderNode(Text, children.text, {numberOfLines: 1, ...children})
      : children.icon
      ? renderNode(Icon, {
          ...children,
          name: children.icon,
          containerStyle: StyleSheet.flatten([
            {alignItems: ALIGN_STYLE[placement]},
            children.containerStyle,
          ]),
        })
      : renderNode(Text, children)}
  </View>
);

Children.propTypes = {
  placement: PropTypes.oneOf(['left', 'center', 'right']),
  style: ViewPropTypes.style,
  children: PropTypes.oneOfType([nodeType, PropTypes.node]),
};

const Header = ({
  // statusBarProps,
  leftComponent,
  centerComponent,
  rightComponent,
  leftContainerStyle,
  centerContainerStyle,
  rightContainerStyle,
  backgroundColor,
  backgroundImage,
  backgroundImageStyle,
  containerStyle,
  placement,
  // barStyle,
  children,
  theme,
  ...attributes
}) => (
  <ImageBackground
    testID="headerContainer"
    {...attributes}
    style={StyleSheet.flatten([
      styles.container(theme),
      backgroundColor && {backgroundColor},
      containerStyle,
    ])}
    source={backgroundImage}
    imageStyle={backgroundImageStyle}>
    {/*<StatusBar barStyle={barStyle} {...statusBarProps} />*/}
    <Children
      style={StyleSheet.flatten([
        placement === 'center' && styles.rightLeftContainer,
        leftContainerStyle,
      ])}
      placement="left">
      {(React.isValidElement(children) && children) ||
        children[0] ||
        leftComponent}
    </Children>

    <Children>
      <BtnLink url="tel:01322061001">
      <Image
          source={imagesTheme.icon.mobile}
          style={{width: 14}}
          resizeMode="contain"
        />
      </BtnLink>
    </Children>
    <Children>
      <BtnLink url="https://call.imo.im/bibhinno.com">
        <Image
          source={imagesTheme.icon.imo}
          style={{width: 25}}
          resizeMode="contain"
        />
      </BtnLink>
    </Children>
    <Children>
      <BtnLink url="https://m.me/Bibhinno.com.bd">
        <Image
          source={imagesTheme.icon.messanger}
          style={{width: 25}}
          resizeMode="contain"
        />
      </BtnLink>
    </Children>

    <Children
      style={StyleSheet.flatten([
        styles.centerContainer,
        placement !== 'center' && {
          paddingHorizontal: Platform.select({
            android: 16,
            default: 15,
          }),
        },
        centerContainerStyle,
      ])}
      placement={placement}>
      {children[1] || centerComponent}
    </Children>

    <Children
      style={StyleSheet.flatten([
        placement === 'center' && styles.rightLeftContainer,
        rightContainerStyle,
      ])}
      placement="right">
      {children[2] || rightComponent}
    </Children>
  </ImageBackground>
);

Header.propTypes = {
  placement: PropTypes.oneOf(['left', 'center', 'right']),
  leftComponent: nodeType,
  centerComponent: nodeType,
  rightComponent: nodeType,
  leftContainerStyle: ViewPropTypes.style,
  centerContainerStyle: ViewPropTypes.style,
  rightContainerStyle: ViewPropTypes.style,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.object,
  backgroundImageStyle: Image.propTypes.style,
  containerStyle: ViewPropTypes.style,
  // statusBarProps: PropTypes.object,
  // barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  theme: PropTypes.object,
};

Header.defaultProps = {
  placement: 'center',
  children: [],
};

const styles = {
  container: (theme) => ({
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingHorizontal: spacing.padding.small + 1,
    backgroundColor: theme.colors.bgColor,
    paddingTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:
      Platform.select({
        android: 56,
        default: 56,
      }) + getStatusBarHeight(),
  }),
  centerContainer: {
    flex: 3,
  },
  rightLeftContainer: {
    flex: 1,
  },
};

export {Header};
export default withTheme(Header, 'Header');
