import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { TabsBar, Tab, TabContent, stylesFactory } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { QueryHistorySettings } from './QueryHistorySettings';

interface QueryHistoryProps {
  width: any;
}

export enum Tabs {
  QueryHistory = 'Query history',
  Starred = 'Starred',
  Settings = 'Settings',
}

interface QueryHistoryState {
  // The Selected Tab
  activeTab: Tabs;
}

const getStyles = stylesFactory(() => {
  return {
    tabContent: css`
      height: calc(100% - 32px);
      background-color: #f7f8fa;
      margin-left: -10px;
      border-top: solid 1px #dde4ed;
    `,
    drawer: css`
      position: fixed;
      bottom: 0;
      height: 400px;
      background-color: white;
      border: solid 1px #dde4ed;
      padding-left: 10px;
      padding-top: 3px;
    `,
  };
});

export class QueryHistory extends PureComponent<QueryHistoryProps, QueryHistoryState> {
  constructor(props: QueryHistoryProps) {
    super(props);
    this.state = {
      activeTab: Tabs.QueryHistory,
    };
  }

  onSelectTab = (item: SelectableValue<Tabs>) => {
    this.setState({ activeTab: item.value });
  };

  render() {
    const { activeTab } = this.state;
    const { width } = this.props;
    const styles = getStyles();

    const tabs = [];
    tabs.push({ label: 'Query history', value: Tabs.QueryHistory, content: 'Query history', icon: 'fa fa-history' });
    tabs.push({ label: 'Starred', value: Tabs.Starred, content: 'Starred', icon: 'fa fa-star' });
    tabs.push({
      label: 'Settings',
      value: Tabs.Settings,
      content: <QueryHistorySettings />,
      icon: 'gicon gicon-preferences',
    });

    return (
      <div className={styles.drawer} style={{ width }}>
        <TabsBar hideBorder={true}>
          {tabs.map((t, index) => {
            return (
              <Tab
                key={`${t.value}-${index}`}
                label={t.label}
                active={t.value === activeTab}
                onChangeTab={() => this.onSelectTab(t)}
                icon={t.icon}
              />
            );
          })}
        </TabsBar>
        <TabContent className={styles.tabContent}>
          {tabs
            .filter(t => t.value === activeTab)
            .map(t => (
              <div key={t.label}>{t.content}</div>
            ))}
        </TabContent>
      </div>
    );
  }
}
