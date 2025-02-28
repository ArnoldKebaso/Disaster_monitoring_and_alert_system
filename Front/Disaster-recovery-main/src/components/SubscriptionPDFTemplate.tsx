import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 5,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ecf0f1',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3498db',
    fontWeight: 'bold',
  },
  filterText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#7f8c8d',
  },
  table: {
    width: '100%',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    color: 'white',
    paddingVertical: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  cell: {
    padding: 4,
    fontSize: 10,
    flexGrow: 1,
    width: '25%',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  locationCell: {
    width: '35%', // Give more space for locations
  },
  dateCell: {
    width: '20%',
  },
});

const SubscriptionPDFTemplate = ({ 
  data,
  methodDistribution,
  locationDistribution,
  selectedMonth,
  selectedLocation 
}) => (
  <Document>
    <Page style={styles.page} size="A4">
      <Text style={styles.header}>Subscription Report</Text>
      
      {/* Filters Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filters</Text>
        <Text style={styles.filterText}>Month: {selectedMonth || 'All Months'}</Text>
        <Text style={styles.filterText}>Location: {selectedLocation || 'All Locations'}</Text>
      </View>

      {/* Method Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Method Distribution</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell, { width: '70%' }]}>Method</Text>
            <Text style={[styles.cell, styles.headerCell, { width: '30%' }]}>Count</Text>
          </View>
          {methodDistribution.map((item) => (
            <View style={styles.tableRow} key={item.label}>
              <Text style={[styles.cell, { width: '70%', textTransform: 'capitalize' }]}>{item.label}</Text>
              <Text style={[styles.cell, { width: '30%' }]}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Location Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Distribution</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell, { width: '70%' }]}>Location</Text>
            <Text style={[styles.cell, styles.headerCell, { width: '30%' }]}>Count</Text>
          </View>
          {locationDistribution.map((item) => (
            <View style={styles.tableRow} key={item.label}>
              <Text style={[styles.cell, { width: '70%' }]}>{item.label}</Text>
              <Text style={[styles.cell, { width: '30%' }]}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Subscriptions Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscriptions ({data.length})</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell, { width: '15%' }]}>Method</Text>
            <Text style={[styles.cell, styles.headerCell, { width: '25%' }]}>Contact</Text>
            <Text style={[styles.cell, styles.headerCell, styles.locationCell]}>Locations</Text>
            <Text style={[styles.cell, styles.headerCell, styles.dateCell]}>Created At</Text>
          </View>
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