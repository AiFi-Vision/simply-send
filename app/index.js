import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import SplashScreen from "@/components/Splash";
import PaginationDots from "@/components/PaginationDots";
import { SPLASHS } from "@/data";
import { Text } from "@/elements";
import { COLORS } from "@/styles/colors";

const DashBoardScreen = () => {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token");
  //       const orgId = await AsyncStorage.getItem("orgId");
  //       setHasToken(token !== null);
  //       if (!token || !orgId) router.replace("/login");
  //       else {
  //         router.replace("/home");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //     }
  //   };
  //   checkToken();
  // }, []);

  const nextSlide = () => {
    if (currentIndex < SPLASHS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const prevSlide = () => {
    if (currentIndex >= 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const skipSlide = () => {
    flatListRef.current?.scrollToIndex({ index: 3 });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={SPLASHS}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <SplashScreen
            item={item}
            index={currentIndex}
            total={SPLASHS.length}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / Dimensions.get("window").width
          );
          setCurrentIndex(index);
        }}
      />

      {currentIndex ? (
        <></>
      ) : (
        <Image
          source={require("@/assets/images/simplisend-logo.png")}
          style={styles.logo}
        />
      )}
      {currentIndex === 3 ? (
        <></>
      ) : (
        <TouchableOpacity onPress={() => skipSlide()} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
      {currentIndex !== 3 ? (
        <View style={styles.fixed}>
          <View style={styles.fixLeft}>
            <Text style={styles.swipe}>Swipe to explore</Text>
            <PaginationDots
              currentIndex={currentIndex}
              total={SPLASHS.length}
            />
          </View>
          <View style={styles.fixRight}>
            {currentIndex ? (
              <TouchableOpacity
                style={[styles.stepButton, styles.prevButton]}
                onPress={() => prevSlide()}
              >
                <Image source={require("@/assets/images/extra/prev.png")} />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={[styles.stepButton, styles.nextButton]}
              onPress={() => nextSlide()}
            >
              <Image source={require("@/assets/images/extra/next.png")} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.lastfixed}>
          <TouchableOpacity
            style={[styles.lastButton, { backgroundColor: COLORS.white }]}
            onPress={() => router.replace("/login")}
            // onPress={() => router.replace("/home")}
          >
            <Text style={styles.lastText}>Get started</Text>
            <Image source={require("@/assets/images/extra/next.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.lastButton, { backgroundColor: COLORS.primary }]}
            onPress={() => router.replace("/login")}
          >
            <Text style={[styles.lastText, { color: "#fff" }]}>Sign In</Text>
            <Image source={require("@/assets/images/extra/user.png")} />
          </TouchableOpacity>
          <Text style={styles.lastContent}>
            By joining Simplisend, you agree to our Terms of service and Privacy
            Policy
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 35,
    width: "100%",
    paddingHorizontal: 20,
  },
  fixLeft: {
    alignItems: "flex-start",
  },
  swipe: {
    fontWeight: "300",
    fontSize: 18,
    color: "#fff",
  },
  fixRight: {
    flexDirection: "row",
  },
  stepButton: {
    opacity: 0.5,
    height: 50,
    backgroundColor: "#F0F1F7",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    width: 160,
  },
  prevButton: {
    width: 50,
    marginRight: 12,
  },
  logo: {
    position: "absolute",
    top: 70,
    left: 20,
    // width: 160,
    // height: 40,
    // resizeMode: "contain",
  },
  skip: {
    position: "absolute",
    top: 70,
    right: 20,
  },
  skipText: {
    fontWeight: "400",
    fontSize: 18,
    // color: "#fff",
  },
  lastfixed: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  lastButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 5,
    borderRadius: 16,
  },
  lastText: {
    fontWeight: "500",
    fontSize: 22,
    color: COLORS.primary,
  },
  lastContent: {
    textAlign: "center",
    padding: 24,
    color: COLORS.white,
    fontSize: 14,
  },
});

export default DashBoardScreen;
