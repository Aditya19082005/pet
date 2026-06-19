import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  bookingStatusContainer: {
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },

  bookingStatusTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
  },

  bookingStatusGradientText: {
    color: "#9333ea",
  },

  bookingStatusSubtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 15,
  },

  bookingStatusScrollContainer: {
    paddingHorizontal: 15,
  },

  bookingStatusCard: {
    width: width * 0.82,
    borderRadius: 25,
    marginRight: 15,
    padding: 10,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  bookingStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  bookingStatusPetRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  bookingStatusIconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  bookingStatusPetImage: {
    width: 50,
    height: 50,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: "#f3f4f6",
  },

  bookingStatusPetEmoji: {
    fontSize: 22,
  },

  bookingStatusPetName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827",
  },

  bookingStatusType: {
    color: "#6b7280",
    fontSize: 12,
  },

  bookingStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginVertical: 10,
  },

  bookingStatusBadgeText: {
    fontWeight: "600",
  },

  bookingStatusInfoBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },

  bookingStatusLabel: {
    fontSize: 11,
    color: "#6b7280",
  },

  bookingStatusValue: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#111827",
  },

  bookingStatusCostText: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "bold",
  },
});
