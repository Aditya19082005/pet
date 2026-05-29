import {
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } =
  Dimensions.get("window");

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

  card: {
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

  image: {
    width: "100%",
    height: 240,
  },

  sliderImage: {
  width,
  height: 320,
},

  content: {
    padding: 20,
  },

  badge: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fdba74",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ea580c",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 12,
  },

  desc: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 24,
  },

  detailsContainer: {
    padding: 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
  },

  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,

    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
    width: "38%",
  },

  infoText: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    textAlign: "right",
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f97316",
  },

  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },

  amenityBox: {
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#fdba74",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },

  amenityText: {
    color: "#ea580c",
    fontWeight: "700",
    fontSize: 13,
  },

  primaryBtn: {
    backgroundColor: "#f97316",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#f97316",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 5,
  },

  primaryBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },

  licenseImage: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginTop: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
  },

});