import { StyleSheet } from "react-native";

export default StyleSheet.create({
  centerCardWrapper: {
    borderRadius: 28,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },

  centerCardContent: {
    padding: 20,
  },

  centerCardBadge: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fdba74",
  },

  centerCardBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6b21a8",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  centerCardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },

  centerCardDescription: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 12,
  },

  centerCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  centerCardCity: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },

  centerCardPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6b21a8",
  },

  centerCardButton: {
    backgroundColor: "#6b21a8",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  centerCardButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
