// Import necessary components from @react-pdf/renderer
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30, // Padding for the entire page
    fontFamily: 'Helvetica', // Default font family
  },
  header: {
    fontSize: 24, // Font size for the header
    marginBottom: 20, // Space below the header
    color: '#2c3e50', // Text color
    fontWeight: 'bold', // Bold font weight
    borderBottomWidth: 2, // Bottom border width
    borderBottomColor: '#3498db', // Bottom border color
    paddingBottom: 5, // Padding below the header text
  },
  section: {
    marginBottom: 20, // Space below each section
    padding: 10, // Padding inside the section
    borderColor: '#ecf0f1', // Border color
    borderRadius: 5, // Rounded corners
    backgroundColor: '#f9f9f9', // Background color
  },
  sectionTitle: {
    fontSize: 16, // Font size for section titles
    marginBottom: 10, // Space below the title
    color: '#3498db', // Text color
    fontWeight: 'bold', // Bold font weight
  },
  filterText: {
    fontSize: 12, // Font size for filter text
    marginBottom: 5, // Space below each filter
    color: '#7f8c8d', // Text color
  },
  table: {
    width: '100%', // Full width table
    marginTop: 10, // Space above the table
  },
  tableHeader: {
    flexDirection: 'row', // Arrange header cells in a row
    backgroundColor: '#3498db', // Background color for the header
    color: 'white', // Text color
    paddingVertical: 8, // Vertical padding
    borderTopLeftRadius: 4, // Rounded top-left corner
    borderTopRightRadius: 4, // Rounded top-right corner
  },
  tableRow: {
    flexDirection: 'row', // Arrange row cells in a row
    paddingVertical: 8, // Vertical padding
    borderBottomWidth: 1, // Bottom border width
    borderBottomColor: '#ecf0f1', // Bottom border color
  },
  cell: {
    padding: 4, // Padding inside each cell
    fontSize: 10, // Font size for cell text
    flexGrow: 1, // Allow cells to grow equally
    width: '25%', // Default width for cells
  },
  headerCell: {
    fontWeight: 'bold', // Bold font weight for header cells
    fontSize: 12, // Font size for header cells
  },
  locationCell: {
    width: '35%', // Wider width for location cells
  },
  dateCell: {
    width: '20%', // Narrower width for date cells
  },
});

// Define the SubscriptionPDFTemplate component
const SubscriptionPDFTemplate = ({ 
  data, // Array of subscription data
  methodDistribution, // Distribution of subscription methods (email, SMS)
  locationDistribution, // Distribution of subscriptions by location
  selectedMonth, // Selected month filter
  selectedLocation // Selected location filter
}) => (
  <Document>
    {/* Define a single page in the PDF */}
    <Page style={styles.page} size="A4">
      {/* Header Section */}
      <Text style={styles.header}>Subscription Report</Text>
      
      {/* Filters Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filters</Text>
        <Text style={styles.filterText}>Month: {selectedMonth || 'All Months'}</Text>
        <Text style={styles.filterText}>Location: {selectedLocation || 'All Locations'}</Text>
      </View>

      {/* Method Distribution Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Method Distribution</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell, { width: '70%' }]}>Method</Text>
            <Text style={[styles.cell, styles.headerCell, { width: '30%' }]}>Count</Text>
          </View>
          {/* Render each method distribution row */}
          {methodDistribution.map((item) => (
            <View style={styles.tableRow} key={item.label}>
              <Text style={[styles.cell, { width: '70%', textTransform: 'capitalize' }]}>{item.label}</Text>
              <Text style={[styles.cell, { width: '30%' }]}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Location Distribution Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Distribution</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell, { width: '70%' }]}>Location</Text>
            <Text style={[styles.cell, styles.headerCell, { width: '30%' }]}>Count</Text>
          </View>
          {/* Render each location distribution row */}
          {locationDistribution.map((item) => (
            <View style={styles.tableRow} key={item.label}>
              <Text style={[styles.cell, { width: '70%' }]}>{item.label}</Text>
              <Text style={[styles.cell, { width: '30%' }]}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Subscriptions Table Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscriptions ({data.length})</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell, { width: '15%' }]}>Method</Text>
            <Text style={[styles.cell, styles.headerCell, { width: '25%' }]}>Contact</Text>
            <Text style={[styles.cell, styles.headerCell, styles.locationCell]}>Locations</Text>
            <Text style={[styles.cell, styles.headerCell, styles.dateCell]}>Created At</Text>
          </View>
          {/* Render each subscription row */}
          {data.map((subscription) => (
            <View style={styles.tableRow} key={subscription.id}>
              <Text style={[styles.cell, { width: '15%', textTransform: 'capitalize' }]}>
                {subscription.method}
              </Text>
              <Text style={[styles.cell, { width: '25%' }]}>{subscription.contact}</Text>
              <Text style={[styles.cell, styles.locationCell]}>
                {subscription.locations.join(', ')}
              </Text>
              <Text style={[styles.cell, styles.dateCell]}>
                {new Date(subscription.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default SubscriptionPDFTemplate;