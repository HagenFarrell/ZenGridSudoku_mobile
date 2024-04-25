
/* 
 * 
 *
 * 
*/

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import ForgotPassword from "../Screens/ForgotPassword";
import PuzzleSelect from "../Screens/PuzzleSelect";
import PlayScreen from "../Screens/PlayScreen";

const HomeStack = createStackNavigator();

const homeStackOptions = ({ headerShown: false })

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator screenOptions={homeStackOptions}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="LoginScreen" component={LoginScreen} />
      <HomeStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <HomeStack.Screen name="PuzzleSelect" component={PuzzleSelect} />
      <HomeStack.Screen name="PlayScreen" component={PlayScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeScreenStack;