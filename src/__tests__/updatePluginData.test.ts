import { DataRes } from '../types';
import { updatePluginData } from '../utility/data';

describe('updatePluginData', () => {
  let data: DataRes;

  beforeEach(() => {
    data = {
      tabs: ['tab1'],
      tabdata: {
        tab1: {
          title: 'Tab 1',
          icon: 'tab-icon',
          active: ['plugin1', 'plugin2'],
          inactive: ['plugin3'],
          disabled: ['plugin4'],
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
      },
    };
  });

  test('should update data for active plugin', () => {
    const updatedData = updatePluginData(data, 'tab1', 'plugin4', true, false);
    expect(updatedData.tabdata.tab1.active).toEqual([
      'plugin1',
      'plugin2',
      'plugin4',
    ]);
    expect(updatedData.tabdata.tab1.inactive).toEqual(['plugin3']);
  });

  test('should update data for inactive plugin', () => {
    const updatedData = updatePluginData(data, 'tab1', 'plugin1', false, true);
    expect(updatedData.tabdata.tab1.active).toEqual(['plugin2']);
    expect(updatedData.tabdata.tab1.inactive).toEqual(['plugin3', 'plugin1']);
  });

  test('should not update data if both active and inactive are false', () => {
    const updatedData = updatePluginData(data, 'tab1', 'plugin1', false, false);
    expect(updatedData).toEqual(data);
  });
});
