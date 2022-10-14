export enum Type {
  DEVELOP = 'develop',
  BUILD = 'build',
  SERVER = 'server',
  DESKTOP = 'desktop',
}

export interface UrlProps {
  name?: string;
  icon?: string;
  desc?: string;
  url?: string;
  type?: Type;
  edit?: boolean;
  id?: number;
}

export interface ModuleItemProps {
  name: string;
  value: UrlProps[];
}

export interface ModulesProps {
  [key: string]: ModuleItemProps;
}

export interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: UrlProps) => void;
  onCancel: () => void;
  initialValues: UrlProps;
}
