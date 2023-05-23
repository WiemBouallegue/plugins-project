import { getTabDetails } from '../utility/data';
import { DataRes, TabDetails, Plugin } from '../types';

describe('getTabDetails', () => {
  const mockData: DataRes = {
    tabs: ['tab1', 'tab2'],
    tabdata: {
      tab1: {
        title: 'Tab 1',
        icon: 'icon1',
        active: ['plugin1', 'plugin2'],
        inactive: ['plugin3'],
        disabled: ['plugin4'],
      },
      tab2: {
        title: 'Tab 2',
        icon: 'icon2',
        active: ['plugin5'],
        inactive: [],
        disabled: ['plugin6'],
      },
    },
    plugins: {
      plugin1: {
        title: 'Plugin 1',
        description: 'Plugin 1 description',
      },
      plugin2: {
        title: 'Plugin 2',
        description: 'Plugin 2 description',
      },
      plugin3: {
        title: 'Plugin 3',
        description: 'Plugin 3 description',
      },
      plugin4: {
        title: 'Plugin 4',
        description: 'Plugin 4 description',
      },
      plugin5: {
        title: 'Plugin 5',
        description: 'Plugin 5 description',
      },
      plugin6: {
        title: 'Plugin 6',
        description: 'Plugin 6 description',
      },
    },
  };

  test('returns the correct tab details', () => {
    const expectedTabDetails: TabDetails[] = [
      {
        title: 'Tab 1',
        icon: 'icon1',
        AllPlugins: [
          {
            id: 'plugin1',
            title: 'Plugin 1',
            description: 'Plugin 1 description',
            active: true,
            enableSwitch: true,
          },
          {
            id: 'plugin2',
            title: 'Plugin 2',
            description: 'Plugin 2 description',
            active: true,
            enableSwitch: true,
          },
          {
            id: 'plugin3',
            title: 'Plugin 3',
            description: 'Plugin 3 description',
            active: true,
            enableSwitch: false,
          },
          {
            id: 'plugin4',
            title: 'Plugin 4',
            description: 'Plugin 4 description',
            active: false,
            enableSwitch: true,
          },
        ],
        tabId: 'tab1',
      },
      {
        title: 'Tab 2',
        icon: 'icon2',
        AllPlugins: [
          {
            id: 'plugin5',
            title: 'Plugin 5',
            description: 'Plugin 5 description',
            active: true,
            enableSwitch: true,
          },
          {
            id: 'plugin6',
            title: 'Plugin 6',
            description: 'Plugin 6 description',
            active: false,
            enableSwitch: true,
          },
        ],
        tabId: 'tab2',
      },
    ];

    const result = getTabDetails(mockData);
    expect(result).toEqual(expectedTabDetails);
  });

  test('returns undefined for empty data', () => {
    const result = getTabDetails(null);
    expect(result).toBeUndefined();
  });
});
