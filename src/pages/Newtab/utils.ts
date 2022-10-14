import { UrlProps, ModulesProps } from './interface';

const generateId = () => Math.floor(Math.random() * 100000000);

export const transFormToInterface = (values: UrlProps): UrlProps => {
  const res: UrlProps = {
    id: values.id || generateId(),
    name: values.name,
    desc: values.desc,
    icon: values.icon,
    type: values.type,
    url: values.url,
    edit: true,
  };

  return res;
};

export const transInterfaceToForm = (values: UrlProps): UrlProps => {
  const forms: UrlProps = {
    id: values.id,
    name: values.name,
    desc: values.desc,
    icon: values.icon,
    type: values.type,
    url: values.url,
    edit: true,
  };
  return forms;
};

// 合并数据, 后面key不一样的新增
export const mergeData = (originData: ModulesProps, storageData: ModulesProps): ModulesProps => {
  if (!storageData) {
    return originData;
  }
  const data = {};
  const keys = Object.keys(originData);
  keys.forEach((item) => {
    const value = originData[item]?.value;
    const storageDataValue = storageData[item]?.value;
    storageDataValue?.forEach((item) => {
      if (item.id) {
        value.push(item);
      }
    });

    data[item] = {
      name: originData[item].name,
      value,
    };
  });

  return data;
};
