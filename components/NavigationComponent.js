import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { fetchUser, removeUser } from "./redux/ActionCreators";
import { connect } from "react-redux";

import { Icon } from "@rneui/base";
import LottieView from "lottie-react-native";
import { firedb } from "../utils/firebase/config";
import React from "react";
import SignupComponent from "./SignupComponent/SignupComponent";
import HomeComponent from "./HomeComponents/HomeComponent";
import { theme } from "../utils/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExpensesComponent from "./HomeComponents/DataTabsComponent/ExpensesComponent";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const windowwidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

const mapDispatchToProps = (dispatch) => ({
  fetchUser: ({ email }) => dispatch(fetchUser({ email: email })),
  removeUser: () => dispatch(removeUser()),
});

class Navigator extends React.Component {
  state = {};

  componentDidMount() {
    console.log(this.props.user.data.length);
  }
  ExpensesTabComponent = (props) => {
    <ExpensesComponent props={props} />;
  };

  MyTabs = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            // color: theme.mainDark,
          },
          tabBarActiveTintColor: theme.mainDark,
          // tabBarStyle: { backgroundColor: theme.mainLight },
          tabBarIndicatorStyle: { backgroundColor: theme.mainDark },
        }}
      >
        <Tab.Screen
          name="Expenses"
          options={{ tabBarLabel: "Expenses" }}
          component={ExpensesComponent}
        />
        {/* <Tab.Screen name="Library" component={LibComponent} />
        <Tab.Screen name="My Drive" component={ListingComponent} /> */}
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    );
  };

  render() {
    const Stack = createNativeStackNavigator();
    if (this.props.user.data.length > 0) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              // headerTitle: this.state.conStatus,
              // headerTintColor: theme.mainDark,
            }}
            initialRouteName="home"
          >
            <Stack.Screen
              options={{
                //   headerTitle: () => <this.logoTitle />,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: theme.white,
                },
                //   headerRight: () => <this.headerIcon />,
                headerShown: false,
                headerTitle: "",
                headerShadowVisible: false,
                headerTitleAlign: "center",
              }}
              name="home"
              component={HomeComponent}
            />
            <Stack.Screen
              options={{
                //   headerTitle: () => <this.logoTitle />,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: theme.white,
                },
                //   headerRight: () => <this.headerIcon />,
                headerShown: false,
                headerTitle: "",
                headerShadowVisible: false,
                headerTitleAlign: "center",
              }}
              name="datatab"
              component={ExpensesComponent}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            // headerTitle: this.state.conStatus,
            // headerTintColor: theme.mainDark,
          }}
        >
          <Stack.Screen
            options={{
              //   headerTitle: () => <this.logoTitle />,
              //   headerStyle: {
              //     elevation: 0,
              //     shadowOpacity: 0,
              //     backgroundColor: theme.mainDark,
              //   },
              //   headerRight: () => <this.headerIcon />,
              headerShown: false,
            }}
            name="signup"
            component={SignupComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
