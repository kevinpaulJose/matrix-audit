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
  TextInput,
} from "react-native";

import { fetchUser, removeUser } from "../../redux/ActionCreators";
import { connect } from "react-redux";

import { Icon } from "@rneui/base";
import LottieView from "lottie-react-native";
import { firedb } from "../../../utils/firebase/config";
import React from "react";
import { adminUser, theme } from "../../../utils/theme";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import {
  dateHeader,
  dateToStandard,
  getListOfDates,
  monthAndDay,
} from "../../../utils/DateFormat";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import ExpBottomButtons from "../SharedComponents/ExpBottomButtons";
import {
  getAllItems,
  getOnlyItems,
  getReportData,
  updateItems,
  updateSales,
} from "../../../utils/firebase/functions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ExpensesDisplayComponent from "../SharedComponents/ExpensesDisplayComponent";
import AddItemModal from "../SharedComponents/AddItemModal";
import SalesDisplayComponent from "../SharedComponents/SalesDisplayComponent";
import ReportDisplayComponent from "../SharedComponents/ReportDisplayComponent";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import OverAllReport from "../SharedComponents/OverAllReport";

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

class ReportsComponent extends React.Component {
  state = {
    loading: false,
    startDate: "",
    endDate: "",
    showStartDate: false,
    showEndDate: false,
    data: {},
  };

  componentDidMount() {}

  getData = async () => {
    if (this.state.startDate != "" && this.state.endDate != "") {
      this.setState({ loading: true });
      const listOfDates = getListOfDates(
        this.state.startDate,
        this.state.endDate
      );

      const reportData = await getReportData(listOfDates);
      this.setState({ loading: false, data: reportData });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        scrollEnabled={Platform.OS == "ios" ? false : false}
      >
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
              borderBottomStartRadius: 5,
              borderBottomEndRadius: 5,
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
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.mainAccentSecondary,
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Report
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                // flexWrap: "wrap",
                height: 50,
                // backgroundColor: "red",
                marginTop: 10,
                width: windowwidth - 40,
                alignSelf: "center",
                // padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  //   backgroundColor: theme.mainAccentSecondary,
                  margin: 2,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
                onPress={() => this.setState({ showStartDate: true })}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.secondryText,
                    fontWeight: "bold",
                  }}
                >
                  Start Date
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.realDark,
                  }}
                >
                  {this.state.startDate == ""
                    ? "--"
                    : dateToStandard(this.state.startDate)}
                </Text>
                {this.state.showStartDate && (
                  <RNDateTimePicker
                    // display="inline"
                    value={
                      this.state.startDate == ""
                        ? new Date()
                        : this.state.startDate
                    }
                    onChange={(e, date) =>
                      this.setState({ startDate: date, showStartDate: false })
                    }
                    mode="default"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  //   backgroundColor: theme.mainAccentSecondary,
                  margin: 2,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
                // onPress={() => this.setState({ selected: "report" })}
                onPress={() => this.setState({ showEndDate: true })}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.secondryText,
                    fontWeight: "bold",
                  }}
                >
                  End Date
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: theme.realDark,
                  }}
                >
                  {this.state.endDate == ""
                    ? "--"
                    : dateToStandard(this.state.endDate)}
                </Text>
                {this.state.showEndDate && (
                  <RNDateTimePicker
                    //   display="inline"
                    value={
                      this.state.endDate == "" ? new Date() : this.state.endDate
                    }
                    onChange={(e, date) =>
                      this.setState({ endDate: date, showEndDate: false })
                    }
                    mode="default"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: theme.mainAccentSecondary,
              width: windowwidth / 2,
              height: 40,
              borderRadius: 5,
              alignSelf: "center",
              justifyContent: "center",
            }}
            onPress={this.getData}
          >
            {this.state.loading ? (
              <ActivityIndicator color={"white"} size={18} />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Get Report
              </Text>
            )}
          </TouchableOpacity>
          {this.state.data.fruitBillTotal != undefined && (
            <OverAllReport
              expensesTotal={this.state.data.expenseTotal}
              friutBillTotal={this.state.data.fruitBillTotal}
              salesTotal={this.state.data.salesTotal}
              totalTotal={this.state.data.totalTotal}
              upiTotal={this.state.data.upiTotal}
              key={"123876"}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent);
