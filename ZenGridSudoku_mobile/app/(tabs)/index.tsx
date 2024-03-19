import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "@/app/Screens/LoginScreen";
import SignupScreen from "@/app/Screens/SignupScreen";
import PlayScreen from "@/app/Screens/PlayScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Login") {
            iconName = focused ? "log-in" : "log-in-outline";
          } else if (route.name === "Signup") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "Play") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Signup" component={SignupScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />

      {/* ... other tabs */}
    </Tab.Navigator>
  );
}
