// src/utils/getFileIcon.ts

/**
 * Returns the path to the icon based on file extension.
 * @param filename - File name or just the extension
 */
export function getFileIcon(filename: string): string {
    const ext = filename
      .split('.')
      .pop()
      ?.toLowerCase();
  
    // Mapea las extensiones a los nombres de los archivos de icono
    const iconMap: Record<string, string> = {
      pdf: '/assets/icons/files/pdf.svg',
      jpg: '/assets/icons/files/jpg.svg',
      jpeg: '/assets/icons/files/jpeg.svg',
      png: '/assets/icons/files/png.svg',
      csv: '/assets/icons/files/csv.svg',
      xls: '/assets/icons/files/xls.svg',
      xlsx: '/assets/icons/files/xls.svg', // usa el mismo icono para xls y xlsx
      docx: '/assets/icons/files/docx.svg',
      doc: '/assets/icons/files/doc.svg',
      pptx: '/assets/icons/files/pptx.svg',
      fig: '/assets/icons/files/fig.svg',
      psd: '/assets/icons/files/psd.svg',
      ai: '/assets/icons/files/ai.svg',
      zip: '/assets/icons/files/zip.svg',
      rar: '/assets/icons/files/zip.svg', // usa el mismo para zip/rar
    };
  
    return iconMap[ext || ''] || '/assets/icons/files/default.svg';
  }
  