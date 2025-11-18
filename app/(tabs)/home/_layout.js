import { Tabs } from "expo-router";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";
import { Text } from "@/elements";
import globalStyles from "@/styles/global";

// Optional: replace with your actual route-to-label mapping
const routeNames = {
  index: "Home",
  transactions: "Transaction",
  recipients: "Recipient",
  profile: "Profile",
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const router = useRouter();
  return (
    <View style={styles.tabBarWrapper}>
      <Image
        source={require("@/assets/images/home/tabbar.png")}
        style={{ width: SCREEN_WIDTH, height: (SCREEN_WIDTH / 375) * 135 }}
      />
      <View style={styles.tabBarBackground}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          if (route.name === "create") {
            return (
              <TouchableOpacity
                key={index}
                style={styles.fabContainer}
                onPress={() => router.push("/(tabs)/manage-account")}
              >
                <View style={styles.fab}>
                  <Ionicons name="add" size={30} color="white" />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              {!isFocused ? (
                <Ionicons name={options.tabBarIcon} size={24} color={"#ccc"} />
              ) : (
                <Text style={[globalStyles.h3, { color: COLORS.white }]}>
                  {routeNames[route.name]}
                </Text>
              )}
              {isFocused && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function HomeLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: "home" }} />
      <Tabs.Screen
        name="transactions"
        options={{ tabBarIcon: "document-text-outline" }}
      />
      <Tabs.Screen name="create" options={{ tabBarIcon: "add" }} />
      <Tabs.Screen
        name="recipients"
        options={{ tabBarIcon: "people-outline" }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: "person-outline",
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: -3,
  },
  tabBarBackground: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
  },
  tab: {
    height: 45,
    width: SCREEN_WIDTH / 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    marginTop: 4,
  },
  fabContainer: {
    position: "absolute",
    top: -64,
    left: SCREEN_WIDTH / 2 - 32,
    zIndex: 2,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
