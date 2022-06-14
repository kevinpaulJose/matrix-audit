import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { theme, windowwidth } from "../../../utils/theme";

export default function OverAllReport({
  friutBillTotal,
  expensesTotal,
  salesTotal,
  upiTotal,
  totalTotal,
  key,
}) {
  return (
    <View
      key={key}
      style={{
        backgroundColor: "white",
        width: windowwidth - 40,
        alignSelf: "center",
        marginTop: 20,
        padding: 10,
        borderRadius: 5,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}
    >
      <View style={{ alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.secondryText,
          }}
        >
          Sales / Expense summary
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, color: theme.realDark }}>
            Fruits Bill:
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`₹${friutBillTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>Expenses:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`₹${expensesTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>Cash Flow:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`₹${salesTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>UPI:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`₹${upiTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>Overall:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`₹${totalTotal}`}</Text>
        </View>
      </View>
    </View>
  );
}
