import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Modal, TextInput } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { theme, windowheight, windowwidth } from "../../../utils/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddItemModal({
  value,
  save,
  modalVisible,
  updateValue,
  dismiss,
  saving,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <KeyboardAwareScrollView
        scrollEnabled={Platform.OS == "ios" ? false : true}
      >
        <View
          style={{
            width: windowwidth - 60,
            height: windowwidth / 2,
            backgroundColor: "white",
            marginTop: windowheight / 2 - 60,
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,

            elevation: 22,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <TextInput
            style={{ textAlign: "center", fontSize: 18, color: theme.realDark }}
            value={value}
            placeholder="Product name"
            placeholderTextColor={theme.secondryText}
            onChangeText={updateValue}
          />
          <View
            style={{
              flexDirection: "row",
              width: windowwidth - 120,
              marginTop: 50,
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={0.8}
              onPress={dismiss}
            >
              <Text
                style={{
                  color: theme.realDark,
                  fontSize: 18,
                  textAlign: "center",
                  padding: 10,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 1,
                backgroundColor: theme.mainAccentSecondary,
                padding: 10,
                borderRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}
              onPress={save}
            >
              {saving ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Add
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}
