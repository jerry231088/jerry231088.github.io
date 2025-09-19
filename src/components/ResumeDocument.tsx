import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// Using 'any' is okay for this temporary test since we aren't using the data prop
interface ResumeDocumentProps {
  data: any;
}

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

export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.text}>
        PDF Generation Test: Success!
      </Text>
    </Page>
  </Document>
);