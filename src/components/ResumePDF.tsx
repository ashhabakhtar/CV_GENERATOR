import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contact: {
    fontSize: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  itemSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  bullet: {
    flexDirection: 'row',
    gap: 5,
    paddingLeft: 10,
  },
  bulletDot: {
    width: 3,
    height: 3,
    backgroundColor: '#000',
    borderRadius: 1.5,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
  },
});

export const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'YOUR NAME'}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email}</Text>
          <Text>{data.personalInfo.phone}</Text>
          <Text>{data.personalInfo.location}</Text>
        </View>
      </View>

      {/* Summary */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 10 }}>
              <View style={styles.itemHeader}>
                <Text style={{ fontWeight: 'bold' }}>{exp.position}</Text>
                <Text>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
              </View>
              <View style={styles.itemSubHeader}>
                <Text>{exp.company}</Text>
                <Text>{exp.location}</Text>
              </View>
              {exp.description.map((bullet, i) => (
                bullet && (
                  <View key={i} style={styles.bullet}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                )
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={{ marginBottom: 6 }}>
              <View style={styles.itemHeader}>
                <Text style={{ fontWeight: 'bold' }}>{edu.school}</Text>
                <Text>{edu.startDate} – {edu.endDate}</Text>
              </View>
              <View style={styles.itemSubHeader}>
                <Text>{edu.degree} in {edu.field}</Text>
                <Text>{edu.location}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Technical Skills: </Text>
            {data.skills.map((s, i) => s.name + (i < data.skills.length - 1 ? ', ' : ''))}
          </Text>
        </View>
      )}
    </Page>
  </Document>
);
