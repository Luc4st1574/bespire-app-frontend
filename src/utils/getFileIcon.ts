/**
 * Returns the path to the icon based on file extension or a special keyword.
 * @param identifier - The file's icon identifier (e.g., 'folder', 'Waymax Pitch Deck.pptx')
 */
export function getFileIcon(identifier: string): string {
  // First, check for special-case keywords like 'folder'
  if (identifier === 'folder') {
    // You must place your folder icon at this path
    return '/assets/icons/files/folder.svg';
  }

  // If not a special keyword, proceed with the original extension-based logic
  const ext = identifier
    .split('.')
    .pop()
    ?.toLowerCase();

  const iconMap: Record<string, string> = {
    pdf: '/assets/icons/files/pdf.svg',
    jpg: '/assets/icons/files/jpg.svg',
    jpeg: '/assets/icons/files/jpeg.svg',
    png: '/assets/icons/files/png.svg',
    csv: '/assets/icons/files/csv.svg',
    xls: '/assets/icons/files/xls.svg',
    xlsx: '/assets/icons/files/xls.svg',
    docx: '/assets/icons/files/docx.svg',
    doc: '/assets/icons/files/doc.svg',
    pptx: '/assets/icons/files/pptx.svg',
    fig: '/assets/icons/files/fig.svg',
    psd: '/assets/icons/files/psd.svg',
    ai: '/assets/icons/files/ai.svg',
    zip: '/assets/icons/files/zip.svg',
    rar: '/assets/icons/files/zip.svg',
  };

  return iconMap[ext || ''] || '/assets/icons/files/default.svg';
}