import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {
  adminUser,
  theme,
  windowheight,
  windowwidth,
} from "../../../utils/theme";

export default function ReportDisplayComponent({ data, user, save, total }) {
  // useEffect(refreshTotal, [total]);
  return (
    <View style={{ paddingTop: 20 }}>
      <View
        style={{
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
        <ScrollView
          style={{
            backgroundColor: theme.white,
            borderRadius: 5,
            width: windowwidth - 40,
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
            // height: windowheight - 470,
          }}
        >
          {data.expenses.map((v, i) => {
            if (v.title == "Fruit Bill" && adminUser == user) {
              return (
                <View
                  key={i + Math.random()}
                  style={{
                    // backgroundColor: theme.white,
                    flexDirection: "row",
                    width: windowwidth - 40,
                    alignSelf: "center",
                    height: 60,

                    paddingLeft: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.secondryText,
                  }}
                >
                  <View
                    style={{
                      flex: 3,
                      // backgroundColor: "blue",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: theme.realDark,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {v.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      // backgroundColor: "blue",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, color: theme.realDark }}
                    >{`₹${v.amount}`}</Text>
                  </View>
                </View>
              );
            } else return <></>;
          })}
        </ScrollView>
      </View>

      <View
        style={{
          height: windowheight / 2,
          width: windowwidth - 40,
          alignSelf: "center",
          backgroundColor: theme.white,
          marginTop: 20,
          // justifyContent: "center",
          // alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: theme.secondryText,
            // fontWeight: "bold",
            margin: 20,
          }}
        >
          Daily Sales Total
        </Text>
        <View
          style={{
            // backgroundColor: theme.white,
            flexDirection: "row",
            width: windowwidth - 40,
            alignSelf: "center",
            height: 40,

            paddingLeft: 20,
            // borderBottomWidth: 0.3,
            // borderBottomColor: theme.secondryText,
          }}
        >
          <View
            style={{
              flex: 3,
              // backgroundColor: "blue",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.realDark,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Sales
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              // backgroundColor: "blue",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, color: theme.realDark }}
            >{`₹${data.salesTotal}`}</Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "red",
            flexDirection: "row",
            width: windowwidth - 40,
            alignSelf: "center",
            height: 40,

            paddingLeft: 20,
            // borderBottomWidth: 0.3,
            // borderBottomColor: theme.secondryText,
          }}
        >
          <View
            style={{
              flex: 3,
              // backgroundColor: "blue",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.realDark,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Expenses
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              // backgroundColor: "blue",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, color: theme.realDark }}
            >{`₹${data.expenseTotal}`}</Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "red",
            flexDirection: "row",
            width: windowwidth - 40,
            alignSelf: "center",
            height: 40,

            paddingLeft: 20,
            // borderBottomWidth: 0.3,
            // borderBottomColor: theme.secondryText,
          }}
        >
          <View
            style={{
              flex: 3,
              // backgroundColor: "blue",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.realDark,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              UPI
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              // backgroundColor: "blue",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, color: theme.realDark }}
            >{`₹${data.upi}`}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={save}
          activeOpacity={0.8}
          style={{
            width: windowwidth - 80,
            alignSelf: "center",
            height: 70,
            backgroundColor: theme.mainAccentSecondary,
            justifyContent: "center",
            marginTop: 50,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >{`Total: ₹${total}`}</Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "white",
              // fontWeight: "bold",
            }}
          >{`(Save to get total)`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
