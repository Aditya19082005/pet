import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  detailsHero: {
    marginBottom: 10,
    alignItems: "center",
  },
  detailPetImage: {
    width: 220,
    height: 220,
    borderRadius: 150,
    marginBottom: 18,
    backgroundColor: "#f3f4f6",
  },
  heroText: {
    marginTop: 1,
    alignItems: "center",
  },
  detailsHeading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6b21a8",
  },
  petSubtitle: {
    color: "#6b7280",
    fontSize: 14,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b21a8",
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    marginTop: 4,
    fontSize: 15,
    color: "#666",
  },
  galleryContainer: {
    marginBottom: 0,
  },
  thumbnailScroll: {
    paddingVertical: 2,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#f3f4f6",
  },
  pdfLinkRow: {
    paddingVertical: 6,
  },
  pdfLinkInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pdfIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#6b21a8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  pdfLinkText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b21a8",
  },
  spacer: {
    height: 30,
  },
});
