import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";

import { fetchUser, removeUser } from "../../redux/ActionCreators";
import { connect } from "react-redux";

import { Icon } from "@rneui/base";
import LottieView from "lottie-react-native";
import { firedb } from "../../../utils/firebase/config";
import React from "react";
import { theme } from "../../../utils/theme";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { dateHeader, monthAndDay } from "../../../utils/DateFormat";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import ExpBottomButtons from "../SharedComponents/ExpBottomButtons";

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

class ExpensesComponent extends React.Component {
  state = { loading: false, saved: true };

  componentDidMount() {
    // console.log(this.props.route.params.date);
  }

  save = () => {
    console.log("Save");
  };

  render() {
    return (
      <View
        style={{
          height:
            windowheight +
            (Platform.OS == "android" ? StatusBar.currentHeight : 0),
          backgroundColor: theme.blank,
        }}
      >
        <View
          style={{
            height: 150,
            backgroundColor: theme.white,
            width: windowwidth,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        >
          <SafeAreaView
            style={{
              paddingTop:
                Platform.OS == "android" ? StatusBar.currentHeight : 0,
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              onPress={() => {
                if (this.state.saved) {
                  this.props.navigation.pop();
                } else {
                  Alert.alert(
                    "Discard changes?",
                    "This will discard all the changes done in the current page.",
                    [
                      {
                        text: "DISCARD",
                        onPress: () => this.props.navigation.pop(),
                        style: "destructive",
                      },
                      {
                        text: "Keep changes",
                        onPress: () => console.log("Cancel Pressed"),
                      },
                    ]
                  );
                }
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: theme.mainAccentSecondary,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                {monthAndDay(this.props.route.params.date)}
              </Text>
              <View style={{ justifyContent: "flex-end", marginLeft: 2 }}>
                <Icon
                  type="ionicon"
                  name="caret-down"
                  size={18}
                  color={theme.mainAccentSecondary}
                />
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <View
          style={{
            height:
              windowheight -
              150 -
              90 +
              (Platform.OS == "android" ? StatusBar.currentHeight : 0),
            // backgroundColor: "pink",
          }}
        >
          <ScrollView></ScrollView>
        </View>
        <ExpBottomButtons
          navigation={this.props.navigation}
          saving={this.state.loading}
          save={this.save}
        />
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesComponent);
