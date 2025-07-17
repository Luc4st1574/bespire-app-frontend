// mocks/requestDetailMock.ts
export const mockRequestDetail = {
  id: "req-1",
  title: "Waymax Logo Refresh",
  details: `Waymax necesita una actualización moderna de su logo para la campaña de Q3. El cliente requiere entregables en SVG y PNG, además de un manual de uso básico.`,
  priority: "high",
  status: "in_progress",
  client: {
    id: "cli-1",
    name: "Spherule",
    avatar: "/assets/avatars/avatar_client.svg",
  },
  requester: {
    id: "u1",
    name: "Gerard Santos",
    avatarUrl: "/assets/avatars/avatar4.svg",
    teamRole: "Spherule",
  },
  assignees: [
    {
      id: "u2",
      name: "Barnard Co",
      teamRole: "Creative Director",
      avatarUrl: "/assets/avatars/avatar3.svg",
    },
    {
      id: "u3",
      name: "Michelle Cruz",
      teamRole: "Designer",
      avatarUrl: "/assets/avatars/avatar1.svg",
    },
  ],
  createdAt: "2024-12-24T09:00:00Z",
  dueDate: "2024-12-31T23:59:59Z",
  timeSpent: { hours: 2, minutes: 30 },
  category: "Branding",
  subType: "Logo",
  credits: 3,
  links: [
    {
      url: "https://bespire.vercel.app/",
      title: "Bespire – On-Demand Creative Services",
      favicon: "https://bespire.vercel.app/favicon.svg",
    },
     {
      url: "https://bespire.vercel.app/",
      title: "Bespire – On-Demand Creative Services",
      favicon: "https://bespire.vercel.app/favicon.svg",
    }, {
      url: "https://bespire.vercel.app/",
      title: "Bespire – On-Demand Creative Services",
      favicon: "https://bespire.vercel.app/favicon.svg",
    },
   
  ],
  attachments: [
    {
      name: "Cómo funciona Bespire.pdf",
      url: "https://res.cloudinary.com/dy7gtvq6w/image/upload/v1750976859/avatars/pmqdhmnh0xtrkaunncno.pdf",
      ext: "pdf",
      size: 33387,
      uploadedBy: "Gerard Santos",
      uploadedAt: "2024-12-25T10:11:00Z",
    },
     {
      name: "Cómo funciona Bespire.pdf",
      url: "https://res.cloudinary.com/dy7gtvq6w/image/upload/v1750976859/avatars/pmqdhmnh0xtrkaunncno.pdf",
      ext: "pdf",
      size: 33387,
      uploadedBy: "Gerard Santos",
      uploadedAt: "2024-12-25T10:11:00Z",
    }, {
      name: "Cómo funciona Bespire.pdf",
      url: "https://res.cloudinary.com/dy7gtvq6w/image/upload/v1750976859/avatars/pmqdhmnh0xtrkaunncno.pdf",
      ext: "pdf",
      size: 33387,
      uploadedBy: "Gerard Santos",
      uploadedAt: "2024-12-25T10:11:00Z",
    },
  ],
  subtasks: [
    {
      id: "sub-1",
      title: "Crear variantes color",
      status: "in_progress",
      dueDate: "2024-12-28T00:00:00Z",
      assignee: {
        id: "u3",
        name: "Michelle Cruz",
        avatarUrl: "/assets/avatars/avatar1.svg",
      },
    },
    {
      id: "sub-2",
      title: "Manual de uso",
      status: "queued",
      dueDate: "2024-12-29T00:00:00Z",
      assignee: {
        id: "u2",
        name: "Barnard Co",
        avatarUrl: "/assets/avatars/avatar3.svg",
      },
    },
  ],
  comments: [
   {
    id: "c1",
    user: {
      id: "u1",
      name: "Gerard Santos",
      avatarUrl: "/assets/avatars/gerard.png",
    },
    createdAt: "2024-12-21T10:11:00",
    type: "activity",
    activityText: "created this task.",
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Michelle Cruz",
      avatarUrl: "/assets/avatars/michelle.png",
    },
    createdAt: "2024-12-21T00:11:00",
    type: "activity",
    activityText: "moved the task to In Progress",
  },
  {
    id: "c3",
    user: {
      id: "u2",
      name: "Michelle Cruz",
      avatarUrl: "/assets/avatars/michelle.png",
    },
    createdAt: "2024-12-24T14:15:00",
    type: "comment",
    text: `Hey @Gerard !

2 major updates:

First off is the logo:
I did some refinements on the chosen logo. Did 3 suboptions here.

Option A is a refined version of the chosen logo. I added curves to complement it to the surrounding elements. Also refined the edges and shapes further.

For Options B & C, did a more refined logo for Bespire. I shifted the circle and made it letter D to make the initials more clear and a bit more explicit. I have also elevated the colors to a more modern look.

Thanks!`,
  },
  {
    id: "c4",
    user: {
      id: "u1",
      name: "Gerard Santos",
      avatarUrl: "/assets/avatars/gerard.png",
    },
    createdAt: "2024-12-24T14:15:00",
    type: "comment",
    text: `Hi @Michelle !

Great job on the designs.`,
  },
  ],
};
