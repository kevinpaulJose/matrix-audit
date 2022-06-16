import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { theme, windowwidth } from "../../../utils/theme";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { monthAndDay } from "../../../utils/DateFormat";
import { Icon } from "@rneui/base";

export default function ReportPerCard({ sale }) {
  // console.log("rendered");
  const Header = ({ date, amount }) => (
    <View
      style={{
        height: 50,
        justifyContent: "center",
        width: windowwidth - 40,
        paddingLeft: 20,
      }}
    >
      <Text
        style={{ fontWeight: "bold", fontSize: 20, color: theme.realDark }}
      >{`${date}: ₹${amount}`}</Text>
      <View style={{ position: "absolute", right: 20 }}>
        <Icon
          type="ionicon"
          name="chevron-down"
          size={18}
          color={theme.realDark}
        />
      </View>
    </View>
  );
  return (
    <View
      style={{
        backgroundColor: theme.white,
        width: windowwidth - 40,
        alignSelf: "center",
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      <CollapsibleView
        title={
          <Header amount={sale.total} date={monthAndDay(sale.readableDate)} />
        }
        noArrow
        style={{
          backgroundColor: theme.white,
          width: windowwidth - 40,
          alignSelf: "center",
          borderWidth: 0,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text
            style={{
              marginLeft: 20,
              fontWeight: "normal",
              fontSize: 18,
              textDecorationLine: "underline",
              color: theme.realDark,
            }}
          >
            Expenses:
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "normal",
              fontSize: 18,
              textDecorationLine: "underline",
              color: theme.secondryText,
            }}
          >
            {`(₹${sale.expenseTotal})`}
          </Text>
        </View>

        {sale.expenses.map((v, i) => {
          return (
            v.amount != "0" && (
              <View
                key={v.title}
                style={{
                  width: windowwidth / 2,
                  flexDirection: "row",
                  marginLeft: 30,
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{ fontSize: 16, color: theme.realDark }}
                  >{`${v.title} -`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, color: theme.realDark }}
                  >{`₹${v.amount}`}</Text>
                </View>
              </View>
            )
          );
        })}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          <Text
            style={{
              marginLeft: 20,
              fontWeight: "normal",
              fontSize: 18,
              textDecorationLine: "underline",
              color: theme.realDark,
            }}
          >
            Sales:
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "normal",
              fontSize: 16,
              textDecorationLine: "underline",
              color: theme.secondryText,
            }}
          >
            {`(₹${sale.salesTotal})`}
          </Text>
        </View>
        {sale.sales[0] != 0 && (
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text
              style={{ fontSize: 16, color: theme.realDark }}
            >{`2000 x ${sale.sales[0]}`}</Text>
          </View>
        )}
        {sale.sales[1] != 0 && (
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text
              style={{ fontSize: 16, color: theme.realDark }}
            >{`500 x ${sale.sales[1]}`}</Text>
          </View>
        )}
        {sale.sales[2] != 0 && (
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text
              style={{ fontSize: 16, color: theme.realDark }}
            >{`200 x ${sale.sales[2]}`}</Text>
          </View>
        )}
        {sale.sales[3] != 0 && (
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text
              style={{ fontSize: 16, color: theme.realDark }}
            >{`100 x ${sale.sales[3]}`}</Text>
          </View>
        )}
        {sale.sales[4] != 0 && (
          <View style={{ flex: 1, marginLeft: 30 }}>
            <Text
              style={{ fontSize: 16, color: theme.realDark }}
            >{`50 x ${sale.sales[4]}`}</Text>
          </View>
        )}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          <Text
            style={{
              marginLeft: 20,
              fontWeight: "normal",
              fontSize: 18,
              textDecorationLine: "underline",
              color: theme.realDark,
            }}
          >
            UPI:
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "normal",
              fontSize: 16,
              textDecorationLine: "underline",
              color: theme.realDark,
            }}
          >
            {`(₹${sale.upi})`}
          </Text>
        </View>
      </CollapsibleView>
    </View>
  );
}
