import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyStateText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },

  listContent: {
    paddingBottom: 30,
  },
});