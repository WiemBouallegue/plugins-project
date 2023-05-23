import { DataRes } from '../types';
import { disableAllPlugins } from '../utility/data';

describe('disableAllPlugins', () => {
  let data: DataRes;

  beforeEach(() => {
    data = data = {
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

  test('should disable all plugins when switch status is false', () => {
    const updatedData = disableAllPlugins(data, false);

    expect(updatedData.tabdata.tab1.disabled).toEqual([
      'plugin1',
      'plugin2',
      'plugin3',
      'plugin4',
    ]);
  });

  test('should enable all disabled plugins when switch status is true', () => {
    const updatedData = disableAllPlugins(data, true);

    expect(updatedData.tabdata.tab1.disabled).toEqual([]);
    expect(updatedData.tabdata.tab1.active).toEqual([
      'plugin1',
      'plugin2',
      'plugin4',
    ]);
  });
});
