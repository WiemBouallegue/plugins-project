import { DataRes, TabDetails, Plugin } from '../types';

export const getTabDetails = (
  data: DataRes | null
): TabDetails[] | undefined => {
  if (!data) {
    return;
  }
  const { tabs, tabdata, plugins } = data;
  const tabDetails: TabDetails[] = [];

  tabs?.forEach((tab) => {
    const tabInfo = tabdata[tab];
    const pluginsArray: Plugin[] = [];
    const uniquePlugins = [
      ...new Set([...tabInfo.active, ...tabInfo.disabled, ...tabInfo.inactive]),
    ];
    uniquePlugins.forEach((plugin) => {
      if (plugins[plugin]) {
        let p: Plugin = {
          id: plugin,
          title: plugins[plugin].title,
          description: plugins[plugin].description,
          active: true,
          enableSwitch: true,
        };
        if (tabInfo.inactive.includes(plugin)) {
          p.enableSwitch = false;
        }
        if (tabInfo.active.includes(plugin)) {
          p.enableSwitch = true;
        }
        if (tabInfo.disabled.includes(plugin)) {
          p.active = false;
        }
        pluginsArray.push(p);
      }
    });

    tabDetails.push({
      title: tabInfo.title,
      icon: tabInfo.icon,
      AllPlugins: pluginsArray.sort((a, b) =>
        +a.id.slice(6) > +b.id.slice(6)
          ? 1
          : +b.id.slice(6) > +a.id.slice(6)
          ? -1
          : 0
      ),
      tabId: tab,
    });
  });

  return tabDetails;
};

export const updatePluginData = (
  data: DataRes,
  idTab: string,
  idPlugin: string,
  active: boolean,
  inactive: boolean
): DataRes => {
  if (active) {
    data.tabdata[idTab].active.push(idPlugin);
    data.tabdata[idTab].inactive = data.tabdata[idTab].inactive.filter(
      (item) => item !== idPlugin
    );
  }
  if (inactive) {
    data.tabdata[idTab].inactive.push(idPlugin);
    data.tabdata[idTab].active = data.tabdata[idTab].active.filter(
      (item) => item !== idPlugin
    );
  }

  return data;
};

export const disableAllPlugins = (
  data: DataRes,
  switchStatus: boolean
): DataRes => {
  const { tabdata, plugins } = data;

  for (const tab in tabdata) {
    const tabItem = tabdata[tab];
    const { active, inactive, disabled } = tabItem;
    if (!switchStatus) {
      tabItem.disabled = [...active, ...inactive, ...disabled];
      tabItem.disabled = Array.from(new Set(tabItem.disabled));
      tabItem.disabled = tabItem.disabled.filter((plugin) => plugin in plugins);
    } else {
      tabItem.disabled.forEach((element) => {
        if (
          !tabItem.active.includes(element) &&
          !tabItem.inactive.includes(element)
        ) {
          tabItem.active.push(element);
        }
      });
      tabItem.disabled = [];
    }
  }

  return data;
};
