import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { windowwidth } from "../../utils/theme";

export default function LottieTopView() {
  return (
    <View>
      <LottieView
        style={{
          width: windowwidth - 20,
          height: windowwidth,
          alignSelf: "center",
          // marginTop: 100,
          // marginLeft: -5,
          marginTop: 20,
        }}
        source={require("../../assets/lottie/signup.json")}
        autoPlay
        loop={true}
        // backgroundColor={"red"}
        resizeMode="contain"
      />
    </View>
  );
}
