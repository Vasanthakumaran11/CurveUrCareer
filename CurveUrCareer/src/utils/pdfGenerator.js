// PDF Report Generation using jsPDF
import jsPDF from 'jspdf';

/**
 * Generate comprehensive career guidance PDF report
 */
export const generatePDFReport = (formData, recommendations) => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);

  // Helper function to add text with word wrap
  const addText = (text, x, y, maxWidth, fontSize = 12, isBold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.5);
  };

  // Header
  doc.setFillColor(14, 165, 233);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  yPosition = addText('Career Guidance Report', margin, 25, contentWidth, 20, true);
  doc.setTextColor(0, 0, 0);
  yPosition = 50;

  // Student Profile Section
  yPosition = addText('Student Profile', margin, yPosition, contentWidth, 16, true);
  yPosition += 5;
  
  doc.setDrawColor(14, 165, 233);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  yPosition = addText(`Stream: ${formData.academic.stream}`, margin, yPosition, contentWidth);
  yPosition = addText(`Subjects: ${formData.academic.subjects?.join(', ') || 'N/A'}`, margin, yPosition, contentWidth);
  yPosition = addText(`Percentage: ${formData.academic.percentage}%`, margin, yPosition, contentWidth);
  yPosition += 10;

  // Top Recommendations Section
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition = addText('Top Course Recommendations', margin, yPosition, contentWidth, 16, true);
  yPosition += 5;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Add top 5 recommendations
  const topRecs = recommendations.slice(0, 5);
  topRecs.forEach((rec, index) => {
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    // Recommendation number and match percentage
    doc.setFillColor(240, 249, 255);
    doc.rect(margin, yPosition - 5, contentWidth, 8, 'F');
    
    yPosition = addText(
      `${index + 1}. ${rec.course.name} - ${rec.matchPercentage}% Match`,
      margin + 2,
      yPosition,
      contentWidth - 4,
      12,
      true
    );
    yPosition += 2;

    // Course details
    yPosition = addText(`Duration: ${rec.course.duration}`, margin + 5, yPosition, contentWidth - 10, 10);
    yPosition = addText(`Average Salary: ${rec.course.averageSalary}`, margin + 5, yPosition, contentWidth - 10, 10);
    yPosition = addText(`Future Scope: ${rec.course.futureScope}`, margin + 5, yPosition, contentWidth - 10, 10);
    yPosition += 3;

    // Reasoning
    if (rec.reasoning && rec.reasoning.length > 0) {
      yPosition = addText('Why this course:', margin + 5, yPosition, contentWidth - 10, 10, true);
      rec.reasoning.slice(0, 3).forEach(reason => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        yPosition = addText(`• ${reason}`, margin + 8, yPosition, contentWidth - 13, 9);
      });
    }
    yPosition += 5;
  });

  // Score Breakdown Section
  if (topRecs.length > 0) {
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    yPosition = addText('Score Breakdown (Top Recommendation)', margin, yPosition, contentWidth, 16, true);
    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    const topScore = topRecs[0].scores;
    const scoreData = [
      { label: 'Academic Eligibility', score: topScore.academic, weight: '40%' },
      { label: 'Interest Alignment', score: topScore.interest, weight: '30%' },
      { label: 'Skills Compatibility', score: topScore.skills, weight: '20%' },
      { label: 'Expectations Match', score: topScore.expectations, weight: '10%' }
    ];

    scoreData.forEach(item => {
      // Draw score bar
      const barWidth = (item.score / 100) * (contentWidth - 80);
      doc.setFillColor(14, 165, 233);
      doc.rect(margin + 80, yPosition - 4, barWidth, 6, 'F');
      
      // Draw border
      doc.setDrawColor(200, 200, 200);
      doc.rect(margin + 80, yPosition - 4, contentWidth - 80, 6);

      // Label and score
      yPosition = addText(
        `${item.label} (${item.weight}): ${Math.round(item.score)}%`,
        margin,
        yPosition,
        75,
        10
      );
      yPosition += 2;
    });
    yPosition += 5;
  }

  // Career Path Section
  if (topRecs.length > 0 && topRecs[0].course.careerPaths) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    yPosition = addText('Career Opportunities', margin, yPosition, contentWidth, 16, true);
    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    topRecs[0].course.careerPaths.slice(0, 6).forEach(path => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      yPosition = addText(`• ${path}`, margin + 5, yPosition, contentWidth - 10, 10);
    });
    yPosition += 10;
  }

  // Summary and Next Steps
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  yPosition = addText('Summary & Next Steps', margin, yPosition, contentWidth, 16, true);
  yPosition += 5;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  const summaryPoints = [
    `You are eligible for ${recommendations.length} courses based on your profile.`,
    `Your top recommendation is ${topRecs[0]?.course?.name || 'N/A'} with ${topRecs[0]?.matchPercentage || 0}% match.`,
    `Focus on preparing for entrance exams: ${topRecs[0]?.course?.eligibility?.entranceExams?.join(', ') || 'Check course details'}.`,
    `Research colleges and their admission criteria.`,
    `Consider talking to professionals in your field of interest.`,
    `Keep your options open with Plan B and Plan C courses.`
  ];

  summaryPoints.forEach(point => {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
    yPosition = addText(`• ${point}`, margin, yPosition, contentWidth - 5, 10);
    yPosition += 2;
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  return doc;
};

/**
 * Download PDF report
 */
export const downloadPDFReport = (formData, recommendations, analysis) => {
  const doc = generatePDFReport(formData, recommendations, analysis);
  const fileName = `Career_Guidance_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

/**
 * Preview PDF in new tab
 */
export const previewPDFReport = (formData, recommendations, analysis) => {
  const doc = generatePDFReport(formData, recommendations, analysis);
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};

export default {
  generatePDFReport,
  downloadPDFReport,
  previewPDFReport
};
