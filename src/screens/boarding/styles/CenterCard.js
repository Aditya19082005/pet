import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const isTablet = width >= 768;

const scale = (size) => {
  if (isTablet) return size * 1.25;
  if (width < 360) return size * 0.9;
  return size;
};

export default StyleSheet.create({
 centerCardWrapper: {
  flex: 1,

  borderRadius: scale(30),

  borderWidth: 1,
  borderColor: "#F1F5F9",

   // Glass Effect
  borderWidth: 1.5,
  borderColor: "rgba(255,255,255,0.65)",

  backgroundColor: "rgba(255,255,255,0.18)",

  // Depth
  shadowColor: "#B79FFF",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.08,
  shadowRadius: 24,

  elevation: 10,

  overflow: "hidden",
},
cardContainer: {
 
  margin: 8,
},
 centerCardContent: {
  flex: 1,
  padding: width * 0.055,
},

  /* BADGE */
  centerCardBadge: {
    alignSelf: "flex-start",

    backgroundColor: "#F5F3FF",

    borderRadius: 999,

    paddingHorizontal: scale(14),
    paddingVertical: scale(8),

    borderWidth: 1,
    borderColor: "#E9D5FF",

    marginBottom: scale(20),
  },

  centerCardBadgeText: {
    color: "#7C3AED",
    fontSize: scale(11),
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* TITLE */
  centerCardTitle: {
    fontSize: scale(24),
    fontWeight: "800",

    color: "#0F172A",

    lineHeight: scale(32),

    marginBottom: scale(10),
  },

  /* DESCRIPTION */
  centerCardDescription: {
    fontSize: scale(14),
    color: "#64748B",

    lineHeight: scale(22),

    marginBottom: scale(22),
  },

  /* CITY + PRICE */
 centerCardRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginTop: "auto",
  marginBottom: scale(22),
},

  centerCardCity: {
    flex: 1,

    fontSize: scale(17),
    fontWeight: "700",

    color: "#334155",
  },

  centerCardPrice: {
    fontSize: scale(17),
    fontWeight: "800",

    color: "#7C3AED",

    backgroundColor: "#F5F3FF",

    paddingHorizontal: scale(14),
    paddingVertical: scale(8),

    borderRadius: scale(14),

    overflow: "hidden",
  },

  /* BUTTON */
  centerCardButton: {
    height: scale(52),

    borderRadius: scale(18),

    backgroundColor: "#FAFAFF",

    borderWidth: 1.5,
    borderColor: "#E9D5FF",

    justifyContent: "center",
    alignItems: "center",
  },

  centerCardButtonText: {
    fontSize: scale(15),
    fontWeight: "700",

    color: "#7C3AED",

    letterSpacing: 0.4,
  },
});