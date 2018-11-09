import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  NavigationActions
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { styles as s } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SCREEN_PROFILE,
  SCREEN_SETTINGS,
  SCREEN_LIST,
  SCREEN_LOGIN,
  SCREEN_STACK_HOME,
  SCREEN_TABBED1,
  SCREEN_TABBED_MAIN,
  SCREEN_TABBED2
} from './screenNames';
import { ScreenProfileContainer } from '../containers/ScreenProfileContainer';
import { ScreenSettingsContainer } from '../containers/ScreenSettingsContainer';
import { DrawerMainMenuContainer } from '../containers/DrawerMainMenuContainer';
import { ScreenListContainer } from '../containers/ScreenListContainer';
import { ScreenLoginContainer } from '../containers/ScreenLoginContainer';
import colors from '../theme/colors';
import { ScreenTabbed1Container } from '../containers/ScreenTabbed1Container';
import { ScreenTabbed2Container } from '../containers/ScreenTabbed2Container';

const renderMenuButton = (focused, tintColor, navigation) => {
  return (
    <TouchableHighlight onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Icon style={s.ml2} name="ios-menu" size={30} color={tintColor} />
    </TouchableHighlight>
  );
};

const renderBackButton = (focused, tintColor, navigation) => {
  return (
    <TouchableHighlight onPress={() => navigation.dispatch(NavigationActions.back())}>
      <Text style={[{ color: tintColor }, s.ml2]}>Back</Text>
    </TouchableHighlight>
  );
};

export const BottomTabNavigator = createBottomTabNavigator(
  {
    [SCREEN_TABBED1]: ScreenTabbed1Container,
    [SCREEN_TABBED2]: ScreenTabbed2Container
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === SCREEN_TABBED1) {
          iconName = `ios-people`;
        } else if (routeName === SCREEN_TABBED2) {
          iconName = `md-microphone`;
        }
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.blue,
      inactiveTintColor: colors.midGray,
      showLabel: false
    }
  }
);

// Screens that share the same header bar
export const MainStackNavigator = createStackNavigator(
  {
    [SCREEN_LIST]: {
      screen: ScreenListContainer,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
        };
      }
    },
    [SCREEN_PROFILE]: {
      screen: ScreenProfileContainer
    },
    [SCREEN_SETTINGS]: {
      screen: ScreenSettingsContainer
    }
  },
  {
    initialRouteName: SCREEN_LIST,
    headerMode: 'float'
  }
);

export const ScreenProfileNavigator = createStackNavigator({
  [SCREEN_PROFILE]: {
    screen: ScreenProfileContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const ScreenSettingsNavigator = createStackNavigator({
  [SCREEN_SETTINGS]: {
    screen: ScreenSettingsContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const ScreenTabbedNavigator = createStackNavigator({
  [SCREEN_TABBED_MAIN]: {
    screen: BottomTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: ({ focused, tintColor }) => renderMenuButton(focused, tintColor, navigation)
      };
    }
  }
});

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Profile: {
      screen: ScreenProfileNavigator
    },
    Settings: {
      screen: ScreenSettingsNavigator
    },
    List: {
      screen: MainStackNavigator
    },
    Tabbed: {
      screen: ScreenTabbedNavigator
    }
  },
  {
    contentComponent: DrawerMainMenuContainer,
    drawerWidth: 280,
    initialRouteName: 'List',
    contentOptions: {
      inactiveTintColor: colors.white,
      activeTintColor: colors.blue
    }
  }
);

export const HomeStack = createStackNavigator({
  Drawer: {
    screen: AppDrawerNavigator,
    navigationOptions: { header: null }
  }
});

export const AppNavigator = createSwitchNavigator(
  {
    [SCREEN_LOGIN]: {
      screen: ScreenLoginContainer,
      navigationOptions: { header: null }
    },
    [SCREEN_STACK_HOME]: {
      screen: HomeStack,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: SCREEN_LOGIN
  }
);
