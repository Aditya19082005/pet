// ../styles/PhaseTwoFormStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Screen + scroll (same pattern as Phase One)
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Grid layout
  gridRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  gridItem: {
    marginBottom: 12,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 15,
    color: "#111827",
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  // Date-like input
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dateInputText: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
  },

  sectionLabel: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 14,
    color: "#374151",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "#374151",
    flex: 1,
  },
});