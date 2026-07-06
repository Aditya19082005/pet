import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const isTablet = width >= 768;

const scale = (size) => {
  if (isTablet) return size * 1.25;
  if (width < 360) return size * 0.9;
  return size;
};

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf5ff",
  },

  /* HEADER SECTION */
  headerSection: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: scale(12),
  },

  headerTitle: {
    fontSize: scale(28),
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: scale(4),
  },

  headerSubtitle: {
    fontSize: scale(14),
    color: "#64748b",
    fontWeight: "500",
  },

  centerCountBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(12),
    gap: scale(6),
  },

  centerCountText: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#6b21a8",
  },

  /* FILTER CHIPS */
  filterChipsContainer: {
    flexDirection: "row",
    gap: scale(8),
  },

  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(8),
    gap: scale(6),
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  filterChipText: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "#4f46e5",
  },

  /* LIST CONTENT */
  listContent: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    paddingBottom: scale(24),
  },

  /* EMPTY STATE */
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(32),
  },

  emptyStateText: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#0f172a",
    marginTop: scale(16),
    marginBottom: scale(8),
  },

  emptyStateSubtext: {
    fontSize: scale(14),
    color: "#94a3b8",
    textAlign: "center",
    fontWeight: "500",
  },
});