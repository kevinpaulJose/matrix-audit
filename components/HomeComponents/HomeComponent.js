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

import { fetchUser, removeUser } from "../redux/ActionCreators";
import { connect } from "react-redux";

import { Icon } from "@rneui/base";
import LottieView from "lottie-react-native";
import { firedb } from "../../utils/firebase/config";
import React from "react";
import { theme } from "../../utils/theme";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { dateHeader, dateToStandard } from "../../utils/DateFormat";
import LottieCalenderView from "./LottieCalanderView";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { getAuth, signOut } from "firebase/auth";

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

class HomeComponent extends React.Component {
  state = {
    selectedMonth: dateToStandard(new Date()),
    calenderShown: false,
  };

  componentDidMount() {
    console.log(this.state.selectedMonth);
  }

  logoutLogin = () => {
    Alert.alert("Sign out?", "This will signout from the application.", [
      {
        text: "Log Out",
        onPress: () => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              this.props.removeUser();
              // console.log("Signed out");
            })
            .catch((error) => {
              // An error happened.
              console.log(error.message);
            });
        },
        style: "destructive",
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);
  };

  render() {
    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
          backgroundColor: theme.white,
        }}
      >
        <View
          style={{
            height: windowheight,
            backgroundColor: theme.white,
          }}
        >
          {/* <ScrollView style={{ backgroundColor: theme.white }}> */}
          <Calendar
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            current={this.state.selectedMonth}
            minDate={"2012-05-10"}
            maxDate={"2025-05-30"}
            onDayPress={(day) => {
              // console.log("selected day", day);
              // const date = new Date(day.dateString);
              // console.log(day.dateString);
              this.props.navigation.navigate("datatab", {
                date: day.dateString,
              });
            }}
            onDayLongPress={(day) => {
              // console.log("selected day", day);
            }}
            monthFormat={"yyyy MM"}
            onMonthChange={(month) => {
              // console.log("month changed", month);
            }}
            renderArrow={(direction) => {
              // console.log(direction);
              if (direction == "left")
                return (
                  <Icon
                    type="ionicon"
                    name="chevron-back"
                    size={16}
                    color={theme.realDark}
                  />
                );
              else
                return (
                  <Icon
                    type="ionicon"
                    name="chevron-forward"
                    size={16}
                    color={theme.realDark}
                  />
                );
            }}
            firstDay={1}
            showWeekNumbers={false}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            disableAllTouchEventsForDisabledDays={false}
            renderHeader={(date) => {
              /*Return JSX*/
              // console.log(date.getFullYear());
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  // style={{ backgroundColor: "red" }}
                  onPress={() => {
                    // this.setState({ calenderShown: true });
                    // this.setState({selectedMonth: '2021-04-01'})
                  }}
                >
                  <Text style={{ color: theme.realDark, fontSize: 18 }}>
                    {dateHeader(date)}
                  </Text>
                </TouchableOpacity>
              );
            }}
            enableSwipeMonths={true}
            theme={{
              calendarBackground: theme.white,
              todayTextColor: theme.mainAccent,
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
            // style={{
            //   height: windowheight,
            // }}
          />
          {this.state.calenderShown && (
            <RNDateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                console.log(dateToStandard(date));
                this.setState({
                  calenderShown: false,
                  selectedMonth: dateToStandard(date),
                });
              }}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                let d = new Date();
                d.setDate(d.getDate() - 1);
                this.props.navigation.navigate("datatab", {
                  date: dateToStandard(d),
                });
              }}
              activeOpacity={0.8}
              disabled={this.state.loading}
              style={{
                // padding: 15,
                backgroundColor: theme.mainAccent,
                width: (windowwidth - 40) / 2,
                alignItems: "center",
                // marginTop: 30,
                alignSelf: "center",
                borderRadius: 5,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
                // marginTop: 10,
              }}
            >
              <LinearGradient
                start={{ x: 0.5, y: 0.3 }}
                // Button Linear Gradient
                colors={[theme.mainAccent, theme.mainAccentSecondary]}
                style={{
                  //   padding: 15,
                  width: (windowwidth - 40) / 2,
                  borderRadius: 5,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Yesterday
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // console.log(dateToStandard(new Date()));
                this.props.navigation.navigate("datatab", {
                  date: dateToStandard(new Date()),
                });
              }}
              activeOpacity={0.8}
              disabled={this.state.loading}
              style={{
                // padding: 15,
                backgroundColor: theme.mainAccent,
                width: (windowwidth - 40) / 2,
                alignItems: "center",
                // marginTop: 30,
                alignSelf: "center",
                borderRadius: 5,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
                // marginTop: 10,
                marginLeft: 10,
              }}
            >
              <LinearGradient
                start={{ x: 0.5, y: 0.3 }}
                // Button Linear Gradient
                colors={[theme.mainAccent, theme.mainAccentSecondary]}
                style={{
                  //   padding: 15,
                  width: (windowwidth - 40) / 2,
                  borderRadius: 5,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Today
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <LottieCalenderView />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignSelf: "center",
              // marginTop: 20,
              position: "absolute",
              // bottom: Platform.OS == "android" ? 40 : 100,
              bottom: 100,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.logoutLogin();
              }}
              activeOpacity={0.5}
              disabled={this.state.loading}
              style={{
                // padding: 15,
                // backgroundColor: theme.mainAccent,
                width: (windowwidth - 40) / 2,
                alignItems: "center",
                // marginTop: 30,
                alignSelf: "center",
                borderRadius: 5,
                zIndex: 100,
                // marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: theme.secondryText,
                  fontWeight: "normal",
                  fontSize: 16,
                }}
              >
                Log out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // this.validateForm();
                //   this.logoutLogin();
                this.props.navigation.navigate("reports");
              }}
              activeOpacity={0.5}
              disabled={this.state.loading}
              style={{
                width: (windowwidth - 40) / 2,
                alignItems: "center",
                // marginTop: 30,
                alignSelf: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: theme.mainAccent,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
