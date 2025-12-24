export const settingOptions = [
  {
    id: 0,
    category: 'General',
    option: [
      {
        id: 0,
        icon: 'content-save',
        name: 'AutoSave',
        desp: 'Automatically save transcripts',
        switch: true,
      },
    ],
  },
  {
    id: 1,
    category: 'Accessibility',
    option: [
      {
        id: 0,
        icon: 'volume-high',
        name: 'Text-to-Speech',
        desp: 'Enalbe audio playback for all text',
        switch: true,
      },
      {
        id: 1,
        icon: 'format-underline',
        name: 'High Contrast',
        desp: 'Improve visibilty with higher contrast',
        switch: true,
      },
      {
        id: 2,
        icon: 'format-size',
        name: 'Large Text',
        desp: 'Increase text size for better readibility ',
        switch: true,
      },
    ],
  },
  {
    id: 2,
    category: 'Action',
    option: [
      {
        id: 0,
        icon: 'refresh',
        name: 'Reset Settings',
        desp: '',
        switch: false,
      },
      {
        id: 1,
        icon: 'check',
        name: 'Clear all data',
        desp: '',
        switch: false,
      },
    ],
  },
  {
    id: 3,
    category: 'Support',
    option: [
      {
        id: 0,
        icon: 'star-outline',
        name: 'Rate this app',
        desp: '',
        switch: false,
      },
      {
        id: 1,
        icon: 'share-variant',
        name: 'Share the app',
        desp: '',
        switch: false,
      },
    ],
  },
];
