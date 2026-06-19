import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  welcomeSubtitle: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 15,
  },
  welcomeHeader: {
    marginBottom: 18,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 999,
    padding: 4,
    marginBottom: 16,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#fff",
  },
  segmentText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  segmentActiveText: {
    color: "#111827",
  },
  authCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  guestContainer: {
    marginTop: 18,
  },
  guestTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  guestButton: {
    backgroundColor: "#f5f3ff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  guestButtonText: {
    color: "#6b21a8",
    fontWeight: "600",
    textAlign: "center",
  },
});
