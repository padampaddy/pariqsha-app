export interface Modal {
  body?: JSX.Element | string;
  title?: string;
  visible: boolean;
  dismissable?:boolean;
}
