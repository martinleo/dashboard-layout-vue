export const dummyMenu = [
  {
    section: "Expenses",
    options: [
      {
        id: 'dashboard',
        displayText: "Dashboard",
        to: "/app/dashboard",
        ionIcon: "pie-chart-outline"
      },
      {
        id: 'expenses',
        displayText: "Expenses",
        to: "/app/expenses",
        ionIcon: "reader-outline"
      },
      {
        id: 'test-child',
        displayText: "Test Child",
        ionIcon: "chatbubbles-outline",
        children: [
          { id: 'categories', displayText: "Categories", to: "/app/categories", ionIcon: "pricetag-outline" },
        ],
      },
      {
        id: 'dashboard',
        displayText: "Dashboard",
        to: "/app/dashboard",
        ionIcon: "pie-chart-outline"
      },
      {
        id: 'dashboard',
        displayText: "Dashboard",
        to: "/app/dashboard",
        ionIcon: "pie-chart-outline"
      },
      {
        id: 'dashboard',
        displayText: "Dashboard",
        to: "/app/dashboard",
        ionIcon: "pie-chart-outline"
      },
    ],
  },
  {
    section: "Options",
    options: [
      {
        id: 'options',
        displayText: "Options",
        ionIcon: "cog-outline",
        children: [
          { id: 'categories', displayText: "Categories", to: "/app/categories", ionIcon: "pricetag-outline" },
        ],
      },
      {
        id: 'example',
        displayText: "Example",
        to: "/app/example"
      },
    ],
  },
];