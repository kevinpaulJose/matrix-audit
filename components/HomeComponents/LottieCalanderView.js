import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { windowheight, windowwidth } from "../../utils/theme";

export default function LottieCalenderView() {
  return (
    <View>
      <LottieView
        style={{
          width: windowheight / 2 - 200,
          height: windowheight / 2 - 200,
          alignSelf: "center",
          // marginTop: 100,
          // marginLeft: -5,
          marginTop: 20,
        }}
        source={require("../../assets/lottie/calneder-home.json")}
        autoPlay
        loop={true}
        // backgroundColor={"red"}
        resizeMode="contain"
        speed={0.4}
      />
    </View>
  );
}
