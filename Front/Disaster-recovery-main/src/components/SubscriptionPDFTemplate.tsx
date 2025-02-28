import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    width: '25%',
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
    <Page style={styles.page}>
      <Text style={styles.header}>Subscription Report</Text>
      
      <View style={styles.section}>
        <Text>Filters:</Text>
        <Text>Month: {selectedMonth || 'All'}</Text>
        <Text>Location: {selectedLocation || 'All'}</Text>
      </View>

      <View style={styles.section}>
        <Text>Method Distribution:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Method</Text>
          <Text style={styles.cell}>Count</Text>
        </View>
        {methodDistribution.map((item) => (
          <View style={styles.tableRow} key={item.label}>
            <Text style={styles.cell}>{item.label}</Text>
            <Text style={styles.cell}>{item.count}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Location Distribution:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Location</Text>
          <Text style={styles.cell}>Count</Text>
        </View>
        {locationDistribution.map((item) => (
          <View style={styles.tableRow} key={item.label}>
            <Text style={styles.cell}>{item.label}</Text>
            <Text style={styles.cell}>{item.count}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Subscriptions ({data.length}):</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Method</Text>
          <Text style={styles.cell}>Contact</Text>
          <Text style={styles.cell}>Locations</Text>
          <Text style={styles.cell}>Created At</Text>
        </View>
        {data.map((subscription) => (
          <View style={styles.tableRow} key={subscription.id}>
            <Text style={styles.cell}>{subscription.method}</Text>
            <Text style={styles.cell}>{subscription.contact}</Text>
            <Text style={styles.cell}>{subscription.locations.join(', ')}</Text>
            <Text style={styles.cell}>
              {new Date(subscription.createdAt).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default SubscriptionPDFTemplate;