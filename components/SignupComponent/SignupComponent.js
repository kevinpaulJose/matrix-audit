import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";

import { fetchUser, removeUser } from "../redux/ActionCreators";
import { connect } from "react-redux";

import { Icon } from "@rneui/base";
import LottieView from "lottie-react-native";
import { firedb } from "../../utils/firebase/config";
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import LottieTopView from "./LottieTopView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { theme, windowheight, windowwidth } from "../../utils/theme";
import { LinearGradient } from "expo-linear-gradient";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: ({ email }) => dispatch(fetchUser({ email: email })),
  removeUser: () => dispatch(removeUser()),
});

class SignupComponent extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    emailError: false,
    passwordError: false,
  };

  loginLogic = () => {
    this.setState({ loading: true });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        this.props.fetchUser({ email: user.email });
        this.setState({ loading: false });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " -> " + errorMessage);
        if (errorCode == "auth/wrong-password") {
          this.setState({ passwordError: true, loading: false });
        }
        if (errorCode == "auth/user-not-found") {
          this.setState({ emailError: true, loading: false });
        }
      });
  };

  logoutLogin = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  validateForm = () => {
    const emailError = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email
    );
    const passwordError = this.state.password.length < 5;
    if (!emailError) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }
    if (passwordError) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
    if (emailError && !passwordError) {
      this.loginLogic();
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: theme.white, height: windowheight }}>
          <TouchableOpacity
            onPress={() => {
              this.validateForm();
              //   this.logoutLogin();
            }}
            activeOpacity={0.8}
            disabled={this.state.loading}
            style={{
              // padding: 15,
              backgroundColor: theme.mainAccent,
              width: windowwidth - 40,
              alignItems: "center",
              // marginTop: 30,
              alignSelf: "center",
              borderRadius: 5,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,

              position: "absolute",
              bottom: Platform.OS == "ios" ? 100 : 30,
              zIndex: 100,
            }}
          >
            <LinearGradient
              start={{ x: 0.5, y: 0.3 }}
              // Button Linear Gradient
              colors={[theme.mainAccent, theme.mainAccentSecondary]}
              style={{
                //   padding: 15,
                width: windowwidth - 40,
                borderRadius: 5,
                height: 50,
                justifyContent: "center",
              }}
            >
              {this.state.loading ? (
                <ActivityIndicator color={theme.blank} size={19} />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Login
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <KeyboardAwareScrollView>
            <LottieTopView />

            <View style={{ marginTop: 80, paddingBottom: 50 }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: theme.blank,
                  padding: 20,
                  width: windowwidth - 40,
                  alignSelf: "center",
                  borderRadius: 5,
                }}
              >
                <TextInput
                  placeholder="apple@gmail.com"
                  value={this.state.email}
                  keyboardType="email-address"
                  style={{
                    textAlign: "center",
                    color: this.state.emailError ? "red" : theme.mainBlue,
                    fontSize: 18,
                    //   fontWeight: "bold",
                  }}
                  placeholderTextColor={this.state.emailError ? "red" : null}
                  onChangeText={(text) =>
                    this.setState({ email: text, emailError: false })
                  }
                  // inputContainerStyle={{ borderBottomWidth: 0, marginTop: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: theme.blank,
                  padding: 20,
                  width: windowwidth - 40,
                  alignSelf: "center",
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <TextInput
                  secureTextEntry={true}
                  placeholder="*****"
                  value={this.state.password}
                  style={{
                    textAlign: "center",
                    color: this.state.passwordError ? "red" : theme.mainBlue,
                    fontSize: 18,
                    //   fontWeight: "bold",
                  }}
                  placeholderTextColor={this.state.passwordError ? "red" : null}
                  onChangeText={(text) =>
                    this.setState({ password: text, passwordError: false })
                  }
                  // inputContainerStyle={{ borderBottomWidth: 0, marginTop: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: windowwidth - 40, alignSelf: "center" }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    color: theme.secondryText,
                    marginTop: 3,
                    fontSize: 12,
                  }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
