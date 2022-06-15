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
      key={"123876"}
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
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: theme.realDark,
              fontWeight: "bold",
              textAlign: "right",
              marginRight: 10,
            }}
          >
            Fruits Bill:
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{ fontSize: 20, color: theme.realDark }}
          >{`₹${friutBillTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: theme.realDark,
              fontWeight: "bold",
              textAlign: "right",
              marginRight: 10,
            }}
          >
            Expenses:
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{ fontSize: 20, color: theme.realDark }}
          >{`₹${expensesTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: theme.realDark,
              fontWeight: "bold",
              textAlign: "right",
              marginRight: 10,
            }}
          >
            Cash Flow:
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{ fontSize: 20, color: theme.realDark }}
          >{`₹${salesTotal}`}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: theme.realDark,
              fontWeight: "bold",
              textAlign: "right",
              marginRight: 10,
            }}
          >
            UPI:
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text
            style={{ fontSize: 20, color: theme.realDark }}
          >{`₹${upiTotal}`}</Text>
        </View>
      </View>
      <View
        style={{
          width: windowwidth / 2,
          backgroundColor: theme.blank,
          height: 40,
          borderRadius: 5,
          alignSelf: "center",
          justifyContent: "center",
          marginBottom: 10,
          marginTop: 10,
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
        <Text
          style={{
            color: theme.realDark,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            // overflow: "hidden",
          }}
          // numberOfLines={1}
        >{`Overall: ₹${totalTotal}`}</Text>
      </View>
      {/* <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={{ fontSize: 20, color: theme.realDark }}>Overall:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 20, color: theme.realDark }}
          >{`₹${totalTotal}`}</Text>
        </View>
      </View> */}
    </View>
  );
}
