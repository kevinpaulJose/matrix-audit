// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import React from "react";
import Navigator from "./components/NavigationComponent";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigureStore } from "./components/redux/configureStore";
import { LogBox } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const { persistor, store } = ConfigureStore();
LogBox.ignoreLogs([/ViewPropTypes/]);
LogBox.ignoreLogs([/useNativeDriver/]);
LogBox.ignoreLogs([/VirtualizedLists/]);

// async function changeScreenOrientation() {
//   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
// }

export default class App extends React.Component {
  componentDidMount() {
    // StatusBar.setHidden(true);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
