import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// No props are needed for this test, so the interface is removed.

const styles = StyleSheet.create({
  page: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

// The component now takes no props
export const ResumeDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.text}>
        PDF Generation Test: Success!
      </Text>
    </Page>
  </Document>
);