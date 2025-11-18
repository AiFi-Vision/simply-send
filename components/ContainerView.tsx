import React, { ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../elements/Text";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "@/styles/global";
import { COLORS } from "@/styles/colors";

// Define the type for the props
interface ContainerViewProps {
  title: string;
  content?: string;
  prev?: string | ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  background?: ReactNode;
  fullScreenMode?: boolean;
  scrollViewHidden?: boolean;
}

const ContainerView: React.FC<ContainerViewProps> = ({
  title,
  content,
  prev,
  footer,
  children,
  background,
  fullScreenMode,
  scrollViewHidden,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {background}
      <SafeAreaView
        style={[
          styles.mainContainer,
          fullScreenMode && { paddingHorizontal: 0 },
        ]}
      >
        {/* Top Navigation */}
        <View
          style={[styles.header, fullScreenMode && { paddingHorizontal: 24 }]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={[globalStyles.h2, { color: COLORS.textColor }]}>
            {prev}
          </Text>
        </View>

        {scrollViewHidden ? (
          <View style={[styles.body, { flex: 1 }]}>
            {title && <Text style={globalStyles.h1}>{title}</Text>}
            {content && (
              <Text style={[globalStyles.h4, styles.subtitle]}>{content}</Text>
            )}
            {children}
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false} // Hides vertical scrollbar
            showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar
          >
            {/* Main Content */}
            <View style={styles.body}>
              {title && <Text style={globalStyles.h1}>{title}</Text>}
              {content && (
                <Text style={[globalStyles.h4, styles.subtitle]}>
                  {content}
                </Text>
              )}
              <View>{children}</View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <View style={styles.footer}>{footer}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
    gap: 10,
  },
  body: {
    marginTop: 20,
  },
  subtitle: {
    marginVertical: 15,
    lineHeight: 22,
  },
  footer: {},
});

export default ContainerView;
