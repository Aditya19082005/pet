import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { RefreshProvider } from "./src/context/RefreshContext";

export default function App() {
  return (
    <RefreshProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </RefreshProvider>
  );
}