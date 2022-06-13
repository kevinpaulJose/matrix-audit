import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {
  adminUser,
  theme,
  windowheight,
  windowwidth,
} from "../../../utils/theme";

export default function SalesDisplayComponent({
  data,
  changeSales,
  totalSales,
  upiData,
  changeUpi,
}) {
  const denomination = ["2000", "500", "200", "100", "50"];
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
          {denomination.map((v, i) => {
            // console.log(data[i]);
            return (
              <View
                key={i}
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
                    {v}
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
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      color: theme.realDark,
                      fontSize: 20,
                      width: "100%",
                      // backgroundColor: "red",
                      // padding: 5,
                    }}
                    value={data[i].toString()}
                    onChangeText={(text) => changeSales(text, i)}
                    // onBlur={(text) => this.changeAmount(text, v.title)}
                    // editable={v.title == "Fruit Bill" && user != adminUser}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            // backgroundColor: "blue",
            flexDirection: "row",
            width: windowwidth - 40,
            alignSelf: "center",
            // height: 20,
            marginBottom: 10,
            justifyContent: "center",
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: theme.secondryText,
                fontSize: 16,
                textAlign: "right",
                marginRight: 6,
              }}
            >
              Total:
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ color: theme.secondryText, fontSize: 16 }}>
              {`₹${totalSales}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.white,
            flexDirection: "row",
            width: windowwidth - 40,
            alignSelf: "center",
            height: 60,

            paddingLeft: 20,
            borderBottomWidth: 0.3,
            borderBottomColor: theme.secondryText,
            marginTop: 20,
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
            <TextInput
              keyboardType="numeric"
              style={{
                color: theme.realDark,
                fontSize: 20,
                width: "100%",
                // backgroundColor: "red",
                // padding: 5,
              }}
              value={`₹${upiData.toString()}`}
              onChangeText={changeUpi}
              // onBlur={(text) => this.changeAmount(text, v.title)}
              // editable={v.title == "Fruit Bill" && user != adminUser}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
