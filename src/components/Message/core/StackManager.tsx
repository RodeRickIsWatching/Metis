import * as React from 'react';
import ReactDOM from 'react-dom/client';
import StackItem from './StackItem';
import type { NotificationProps, NotificationReturnInstance } from '../types';

export default class StackManager {
  private notifyList: Array<React.ComponentElement<NotificationProps, StackItem>> = [];
  private component: React.FunctionComponent<NotificationProps>;
  private root?: ReactDOM.Root;
  private keySeed = 0;

  constructor(component: React.FunctionComponent<NotificationProps>) {
    this.component = component;
    // https://stackoverflow.com/a/72238236
    this.root = ReactDOM.createRoot(this.getContainerDom(true));
    // this.root = this.getPortalDom() ? undefined : ReactDOM.createRoot(this.getContainerDom(true));
  }

  // To display a new StackItem
  open(props: NotificationProps): NotificationReturnInstance {
    const newKey = props.key || String((this.keySeed += 1));
    const newRef = React.createRef<StackItem>();
    const stackItem = <StackItem {...props} key={newKey} ref={newRef} Component={this.component} />;
    const existingIndex = this.notifyList.findIndex((item) => item.key === newKey);
    if (existingIndex === -1) {
      this.notifyList.push(stackItem);
    } else {
      this.notifyList[existingIndex] = stackItem;
    }
    this.render();
    return { close: () => this.close(newKey) };
  }

  // To close single one
  close(key: string) {
    const notify = this.notifyList.find((item) => item.key === key);
    if (notify) {
      const { current } = notify.ref as React.RefObject<StackItem>;
      current && current.close();
    }
  }

  // To close all
  closeAll() {
    this.notifyList.forEach((notify) => {
      const { current } = notify.ref as React.RefObject<StackItem>;
      current && current.close();
    });
  }

  // To unmount & reomve container dom
  destroy() {
    this.notifyList.length = 0;
    const div = this.getContainerDom();
    if (div) {
      this.root?.unmount();
      window.document.body.removeChild(div);
    }
  }

  private render() {
    const list = this.notifyList;
    this.root?.render(<>{list}</>);
  }

  private getContainerDom(create?: boolean) {
    let div = this.getPortalDom();
    if (!div && create) {
      div = window.document.createElement('div');
      div.id = 'global-bedrock';
      window.document.body.appendChild(div);
    }
    return div as HTMLDivElement;
  }

  // Portal dom
  private getPortalDom() {
    return window.document.getElementById('global-bedrock');
  }
}
