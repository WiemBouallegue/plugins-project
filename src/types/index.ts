export interface Plugin {
  id: string;
  title: string;
  description: string;
  active: boolean;
  enableSwitch: boolean;
}

export interface Tab {
  title: string;
  icon: string;
  active: string[];
  inactive: string[];
  disabled: string[];
}

export interface Tabdata {
  [key: string]: Tab;
}

export interface PluginResElement {
  title: string;
  description: string;
}

export interface PluginRes {
  [key: string]: PluginResElement;
}

export interface TabDetails {
  tabId: string;
  title: string;
  icon: string;
  AllPlugins: Plugin[];
}
export interface ApiError {
  error: string;
}

export interface DataRes {
  tabs: string[];
  tabdata: Tabdata;
  plugins: PluginRes;
}
