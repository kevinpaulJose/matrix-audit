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
import { dateHeader, monthAndDay } from "../../../utils/DateFormat";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import ExpBottomButtons from "../SharedComponents/ExpBottomButtons";
import {
  getAllItems,
  getOnlyItems,
  updateItems,
  updateSales,
} from "../../../utils/firebase/functions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ExpensesDisplayComponent from "../SharedComponents/ExpensesDisplayComponent";
import AddItemModal from "../SharedComponents/AddItemModal";
import SalesDisplayComponent from "../SharedComponents/SalesDisplayComponent";
import ReportDisplayComponent from "../SharedComponents/ReportDisplayComponent";

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
  state = {
    loading: false,
    saved: true,
    data: [
      {
        date: 1655116902826.9888,
        expenseTotal: 0,
        expenses: [
          {
            amount: 0,
            title: "Fruit Bill",
          },
          {
            amount: 0,
            title: "Banana Bill",
          },
          {
            amount: 0,
            title: "Annaci",
          },
          {
            amount: 0,
            title: "Mathulai",
          },
          {
            amount: 0,
            title: "Athi",
          },
          {
            amount: 0,
            title: "Dates",
          },
          {
            amount: 0,
            title: "Lemon",
          },
        ],
        notes: "",
        readableDate: "2022-06-13",
        sales: [0, 0, 0, 0, 0],
        salesTotal: 0,
        total: 0,
        upi: 0,
      },
    ],
    selected: "report",
    saving: false,
    addModalVisible: false,
    newItem: "",
    savingItem: false,
  };

  componentDidMount() {
    // console.log(this.props.route.params.date);
    this.fetchItems();
  }

  triggerModal = () => {
    this.setState({ addModalVisible: !this.state.addModalVisible });
  };
  fetchItems = async () => {
    this.setState({ loading: true });
    const data = await getAllItems(this.props.route.params.date);
    this.setState({ data: data, loading: false, saving: false });
    if (data[1]) {
      this.setState({ selected: "expenses" });
    } else {
      this.setState({ selected: "report" });
    }
    // console.log(data[0].expenses);
  };

  save = async () => {
    this.calculateTotal();
    this.setState({ saving: true });
    await updateSales(this.state.data[0], this.props.route.params.date);
    this.setState({ saving: false, saved: true });
    this.fetchItems();
  };

  discardChanges = () => {
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
  };

  changeAmount = (text, title) => {
    this.setState({ saved: false });
    let currentData = this.state.data;
    let currentState = this.state.data[0].expenses;
    const currentIndex = currentState.findIndex((v) => v.title == title);
    // console.log();
    if (text.slice(1, text.length).length > 0) {
      let finalAmount = text.slice(1, text.length);
      if (finalAmount.charAt(0) == "0") {
        finalAmount = finalAmount.slice(1, finalAmount.length);
      }
      currentState[currentIndex] = {
        amount: finalAmount,
        title: title,
      };
      currentData[0].expenses = currentState;
      this.setState({ data: currentData });
      this.calulateExpenseTotal(currentData[0].expenses);
    } else {
      currentState[currentIndex] = {
        amount: "0",
        title: title,
      };
      currentData[0].expenses = currentState;
      this.setState({ data: currentData });
      this.calulateExpenseTotal(currentData[0].expenses);
    }
  };

  changeSales = (text, index) => {
    this.setState({ saved: false });
    let currentSales = this.state.data[0].sales;
    if (text.trim() != "") {
      if (text.charAt(0) == "0") {
        currentSales[index] = parseInt(text.slice(1, text.length));
        this.calculateSalesTotal(currentSales);
      } else {
        currentSales[index] = parseInt(text);
        this.calculateSalesTotal(currentSales);
      }
    } else {
      currentSales[index] = 0;
      this.calculateSalesTotal(currentSales);
    }
  };
  changeUPI = (text) => {
    this.setState({ saved: false });
    let currentData = this.state.data;
    let currentState = this.state.data[0].upi;
    // const currentIndex = currentState.findIndex((v) => v.title == title);
    // console.log();
    if (text.slice(1, text.length).length > 0) {
      let finalAmount = text.slice(1, text.length);
      if (finalAmount.charAt(0) == "0") {
        finalAmount = finalAmount.slice(1, finalAmount.length);
      }
      currentState = finalAmount;
      if (isNaN(parseFloat(currentState))) currentData[0].upi = 0;
      else currentData[0].upi = parseFloat(currentState);

      this.setState({ data: currentData });
      // this.calulateExpenseTotal(currentData[0].expenses);
    } else {
      currentState = 0;
      currentData[0].upi = 0;
      this.setState({ data: currentData });
      // this.calulateExpenseTotal(currentData[0].expenses);
    }
    // this.setState({ saved: false });
    // let currentUpi = this.state.data[0].upi;
    // let allData = this.state.data;
    // text = text.slice(1, text.length);
    // if (text.trim().length > 0) {
    //   if (text.charAt(0) == "0") {
    //     currentUpi = parseFloat(text.slice(1, text.length));
    //     allData[0].upi = currentUpi;
    //     this.setState({ data: allData });
    //   } else {
    //     currentUpi = parseFloat(text);
    //     allData[0].upi = currentUpi;
    //     this.setState({ data: allData });
    //   }
    // } else {
    //   currentUpi = parseFloat("0");
    //   allData[0].upi = currentUpi;
    //   this.setState({ data: allData });
    // }
  };
  getChangeValue = (value, index) => {
    switch (index) {
      case 0:
        return value * 2000;
      case 1:
        return value * 500;
      case 2:
        return value * 200;
      case 3:
        return value * 100;
      case 4:
        return value * 50;
    }
  };

  calulateExpenseTotal = (expensesData) => {
    let total = 0;
    for (let exp of expensesData) {
      if (exp.title != "Fruit Bill") total += parseInt(exp.amount);
    }
    this.state.data[0].expenseTotal = total;
  };
  calculateSalesTotal = (salesData) => {
    let sales = this.state.data[0].sales;
    let total = 0;
    sales.map((v, i) => {
      total += this.getChangeValue(v, i);
    });
    this.state.data[0].salesTotal = total;
  };
  calculateTotal = () => {
    this.state.data[0].total =
      parseFloat(this.state.data[0].expenseTotal) +
      parseFloat(this.state.data[0].salesTotal) +
      parseFloat(this.state.data[0].upi);
  };

  changeNote = (text) => {
    this.setState({ saved: false });
    this.state.data[0].notes = text;
  };
  saveItem = async () => {
    if (this.state.newItem.trim() != "") {
      this.setState({ savingItem: true });
      let items = await getOnlyItems();
      items.push(this.state.newItem);
      await updateItems(items);
      this.setState({ savingItem: false, addModalVisible: false, newItem: "" });
      this.fetchItems();
    } else {
      this.setState({ savingItem: false, addModalVisible: false });
    }
  };
  updateItemInLocal = (text) => {
    this.setState({ newItem: text });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        scrollEnabled={Platform.OS == "ios" ? false : false}
      >
        <AddItemModal
          modalVisible={this.state.addModalVisible}
          save={this.saveItem}
          value={this.state.newItem}
          updateValue={this.updateItemInLocal}
          dismiss={this.triggerModal}
          saving={this.state.savingItem}
        />
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
              {/* {this.props.user.data[0] == adminUser && ( */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.triggerModal}
                style={{
                  position: "absolute",
                  right: 40,
                  zIndex: 500,
                  top: 30,
                }}
              >
                <Icon
                  type="ionicon"
                  name="add"
                  size={28}
                  color={theme.mainAccentSecondary}
                />
              </TouchableOpacity>
              {/* )} */}

              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
                onPress={() => {
                  this.discardChanges();
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
                  backgroundColor:
                    this.state.selected == "expenses"
                      ? theme.mainAccentSecondary
                      : null,
                  margin: 2,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
                onPress={() => this.setState({ selected: "expenses" })}
              >
                <Text
                  style={{
                    fontWeight:
                      this.state.selected == "expenses" ? "bold" : "normal",
                    color:
                      this.state.selected == "expenses"
                        ? theme.white
                        : theme.realDark,
                  }}
                >
                  Expenses
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    this.state.selected == "sales"
                      ? theme.mainAccentSecondary
                      : null,
                  margin: 2,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
                onPress={() => this.setState({ selected: "sales" })}
              >
                <Text
                  style={{
                    fontWeight:
                      this.state.selected == "sales" ? "bold" : "normal",
                    color:
                      this.state.selected == "sales"
                        ? theme.white
                        : theme.realDark,
                  }}
                >
                  Sales
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    this.state.selected == "report"
                      ? theme.mainAccentSecondary
                      : null,
                  margin: 2,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
                onPress={() => this.setState({ selected: "report" })}
              >
                <Text
                  style={{
                    fontWeight:
                      this.state.selected == "report" ? "bold" : "normal",
                    color:
                      this.state.selected == "report"
                        ? theme.white
                        : theme.realDark,
                  }}
                >
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: windowheight - 300,
              // backgroundColor: "pink",
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator
                style={{ marginTop: 20 }}
                color={theme.mainAccent}
              />
            ) : (
              this.state.selected == "expenses" && (
                <ExpensesDisplayComponent
                  changeAmount={this.changeAmount}
                  changeNote={this.changeNote}
                  data={this.state.data[0]}
                  key={"123"}
                  user={this.props.user.data[0]}
                />
              )
            )}
            {this.state.selected == "sales" && !this.state.loading && (
              <SalesDisplayComponent
                data={this.state.data[0].sales}
                changeSales={this.changeSales}
                totalSales={this.state.data[0].salesTotal}
                upiData={this.state.data[0].upi}
                changeUpi={this.changeUPI}
              />
            )}
            {this.state.selected == "report" && !this.state.loading && (
              <ReportDisplayComponent
                data={this.state.data[0]}
                user={this.props.user.data[0]}
                key={"567"}
                save={this.save}
                total={this.state.data[0].total}
              />
            )}
          </View>
          <ExpBottomButtons
            navigation={this.props.navigation}
            saving={this.state.saving}
            save={this.save}
            discard={this.discardChanges}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesComponent);
