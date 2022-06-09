import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { theme, windowwidth } from "../../../utils/theme";

export default function ExpBottomButtons({ save, navigation, saving }) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        position: "absolute",
        bottom: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          // this.validateForm();
          //   this.logoutLogin();
          Alert.alert(
            "Discard changes?",
            "This will discard all the changes done in the current page.",
            [
              {
                text: "DISCARD",
                onPress: () => navigation.pop(),
                style: "destructive",
              },
              {
                text: "Keep changes",
                onPress: () => console.log("Cancel Pressed"),
              },
            ]
          );
        }}
        activeOpacity={0.8}
        disabled={saving}
        style={{
          // padding: 15,
          //   backgroundColor: theme.mainAccent,
          width: (windowwidth - 40) / 2 - 20,
          alignItems: "center",
          // marginTop: 30,

          // marginTop: 10,
          marginRight: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: theme.secondryText,
            // fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Discard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={save}
        activeOpacity={0.8}
        disabled={saving}
        style={{
          // padding: 15,
          backgroundColor: theme.mainAccent,
          width: (windowwidth - 40) / 2 - 20,
          alignItems: "center",
          // marginTop: 30,

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
            width: (windowwidth - 40) / 2 - 20,
            borderRadius: 5,
            height: 50,
            justifyContent: "center",
          }}
        >
          {saving ? (
            <ActivityIndicator color={theme.white} size={16} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: theme.white,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Save
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
