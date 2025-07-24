export interface MockFile {
  id: string;
  name: string;
  type: 'Folder' | 'MS Powerpoint File' | 'PDF File' | 'MS Word File' | 'MS Excel Sheet';
  tags: string[];
  access: 'All' | 'Team' | 'Private';
  lastModified: string;
  modifiedBy: string;
  icon: string;
}

export const mockFiles: MockFile[] = [
  {
    id: '0',
    name: 'Christmas Campaign',
    type: 'Folder',
    tags: ['Email Marketing'],
    access: 'All',
    lastModified: 'Dec 21, 2024',
    modifiedBy: 'me',
    icon: 'folder',
  },
  {
    id: '1',
    name: 'Branding Files',
    type: 'Folder',
    tags: ['Email Marketing'],
    access: 'All',
    lastModified: 'Dec 21, 2024',
    modifiedBy: 'me',
    icon: 'folder',
  },
  {
    id: '2',
    name: 'Waymax Pitch Deck 2024.pptx',
    type: 'MS Powerpoint File',
    tags: [],
    access: 'All',
    lastModified: 'Dec 21, 2024',
    modifiedBy: 'me',
    icon: 'Waymax Pitch Deck 2024.pptx',
  },
  {
    id: '3',
    name: 'Waymax Brand Guide 2024.pdf',
    type: 'PDF File',
    tags: [],
    access: 'All',
    lastModified: 'Dec 21, 2024',
    modifiedBy: 'me',
    icon: 'Waymax Brand Guide 2024.pdf',
  },
  {
    id: '4',
    name: 'Waymax Marketing Plan 2024.docx',
    type: 'MS Word File',
    tags: [],
    access: 'All',
    lastModified: 'Dec 21, 2024',
    modifiedBy: 'me',
    icon: 'Waymax Marketing Plan 2024.docx',
  },
  {
    id: '5',
    name: 'Waymax Financial Report 2024.xlsx',
    type: 'MS Excel Sheet',
    tags: [],
    access: 'All',
    lastModified: 'Dec 21, 2024',
    modifiedBy: 'me',
    icon: 'Waymax Financial Report 2024.xlsx',
  },
];