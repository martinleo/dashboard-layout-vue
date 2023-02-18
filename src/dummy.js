export const dummyMenu = [
  {
    section: "Section 1",
    options: [
      {
        id: 'option-1',
        displayText: "Option 1",
        to: "/app/option1",
        ionIcon: "pie-chart-outline"
      },
      {
        id: 'option-child',
        displayText: "Option w/ children",
        ionIcon: "chatbubbles-outline",
        children: [
          { id: 'child-1', displayText: "One child", to: "/app/child", ionIcon: "flask-outline" },
          { id: 'child-2', displayText: "Another child", to: "/app/child", ionIcon: "pricetag-outline" },
        ],
      },
      {
        id: 'option-2',
        displayText: "Option 2",
        to: "/app/option2",
        ionIcon: "flash-outline"
      }    
    ]
  },
  {
    section: "Section 2",
    options: [
      {
        id: 'option-3',
        displayText: "Option 3",
        to: "/app/option3",
        ionIcon: "fish-outline"
      }      
    ]
  },
]