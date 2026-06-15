import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  bookingScreenContent: {
    padding: 16,
    paddingBottom: 30,
  },
  calendarWrapper: {
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  smallLoader: {
    marginTop: 10,
  },
  warningText: {
    marginTop: 10,
    color: "#ef4444",
    fontWeight: "600",
  },
  statusNote: {
    marginTop: 10,
    color: "#4b5563",
  },
  totalCostText: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 18,
  },
  availableInfoContainer: {
    marginTop: 15,
  },
  availabilityText: {
    marginTop: 10,
    fontWeight: "bold",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    borderRadius: 28,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  centerCardWrapper: {
    borderRadius: 28,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
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
    color: "#ea580c",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  centerCardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },
  centerCardDescription: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 24,
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
    color: "#f97316",
  },
  centerCardButton: {
    backgroundColor: "#f97316",
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
    shadowOffset: { width: 0, height: 3 },
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
  addressInfoText: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    textAlign: "left",
  },
  addressLine: {
    marginTop: 4,
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
    shadowOffset: { width: 0, height: 5 },
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
  capacityStatusText: {
    marginTop: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  bookingScreenContainer: {
    flex: 1,
  },
  bookingScreenCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    marginHorizontal: 0,
    width: "100%",
  },
  bookingScreenCenterName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  bookingScreenPrice: {
    marginTop: 5,
    color: "#ea580c",
    fontWeight: "700",
  },
  bookingScreenHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  bookingScreenDateInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  bookingScreenDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  bookingScreenDatePill: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 12,
  },
  bookingScreenActivePillText: {
    color: "#ffffff",
  },
  bookingScreenActivePill: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  bookingScreenDateLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  bookingScreenDateValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  bookingScreenLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  bookingScreenMarkerBadge: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  bookingScreenMarkerText: {
    color: "#4b5563",
  },
  bookingScreenOrangeBtn: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  bookingScreenBookBtn: {
    backgroundColor: "#ec4899",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
  },
  bookingScreenBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  bookingScreenInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  bookingScreenInputWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  bookingScreenPicker: {
    width: "100%",
    color: "#111827",
  },

  bookingInterfaceContainer: {
    flex: 1,
  },
  bookingInterfaceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
  },
  bookingInterfaceGradientText: {
    color: "#f97316",
  },
  bookingInterfaceCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
  },
  bookingInterfaceHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f2937",
  },
  bookingInterfacePetRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  bookingInterfacePetChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bookingInterfaceAddPetChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bookingInterfaceAddPetBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#c7d2fe",
    backgroundColor: "#eef2ff",
  },
  bookingInterfaceInput: {
    borderWidth: 2,
    borderColor: "#c7d2fe",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  bookingInterfaceAddButton: {
    backgroundColor: "#f97316",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  bookingInterfaceDateInput: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fed7aa",
    marginBottom: 10,
  },
  bookingInterfaceSummaryBox: {
    marginTop: 15,
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fed7aa",
  },
  bookingInterfaceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bookingInterfaceTotalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ea580c",
  },
  bookingInterfaceButton: {
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  bookingInterfaceButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  bookingInterfaceScroll: {
    padding: 16,
  },

  bookingInterfacePetLabel: {
    color: "#374151",
    fontWeight: "600",
  },

  bookingInterfacePetLabelActive: {
    color: "#ffffff",
  },

  bookingInterfaceAddPetLabel: {
    fontWeight: "bold",
    color: "#4338ca",
  },

  bookingInterfaceSummaryLabel: {
    color: "#111827",
  },

  bookingInterfaceSummaryLabelBold: {
    fontWeight: "bold",
  },

  bookingInterfaceSummaryValue: {
    fontWeight: "bold",
    color: "#ea580c",
  },

  bookingInterfaceSummaryAmount: {
    color: "#db2777",
    fontWeight: "bold",
  },

  bookingStatusContainer: {
    paddingTop: 30,
    paddingBottom: 60,
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
    marginTop: 8,
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
  bookingStatusButton: {
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  bookingStatusBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookingStatusOutlineBtn: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    marginTop: 8,
  },
  bookingStatusGreenOutline: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#16a34a",
    alignItems: "center",
    marginTop: 8,
  },
  bookingStatusPurpleOutline: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#9333ea",
    alignItems: "center",
    marginTop: 8,
  },
  bookingStatusSupportBox: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 24,
  },
  bookingStatusSupportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingStatusSupportText: {
    marginVertical: 10,
    color: "#6b7280",
  },

  pickupContainer: {
    flex: 1,
  },
  pickupContentContainer: {
    padding: 16,
  },
  pickupHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  pickupSubHeading: {
    color: "#6b7280",
    marginBottom: 16,
  },
  pickupCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
  },
  pickupCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  pickupTimelineRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  pickupTimelineLeft: {
    alignItems: "center",
    marginRight: 12,
  },
  pickupDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  pickupLine: {
    width: 2,
    height: 40,
    backgroundColor: "#d1d5db",
    marginTop: 4,
  },
  pickupTimelineContent: {
    flex: 1,
  },
  pickupTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  pickupDesc: {
    fontSize: 13,
    color: "#555",
  },
  pickupDate: {
    fontSize: 12,
    color: "#888",
  },
});

