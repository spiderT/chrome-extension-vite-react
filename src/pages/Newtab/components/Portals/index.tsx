import './index.scss';
import { useState, useEffect } from 'react';
import { data } from './data';
import Module from '../Module';
import Add from '../Add';
import { NEWTAB_STORAGE_KEY } from '../../constant';
import { LocalStorage } from '../../../../utils/storage';
import { ModulesProps } from '../../interface';
import { mergeData } from '../../utils';

export default function Portals() {
  const [datas, setData] = useState<ModulesProps>(data);

  useEffect(() => {
    const storageData = LocalStorage.get(NEWTAB_STORAGE_KEY);
    const merge = mergeData(data, storageData);
    setData(merge);
  }, []);

  const handleAdd = (v) => {
    const res = { ...datas };
    res[v.type].value.push(v);
    setData(res);
    LocalStorage.set(NEWTAB_STORAGE_KEY, res);
  };

  const editData = (type, v) => {
    const res = { ...datas };
    const value = res[v.type].value;
    const index = value.findIndex((i) => i.id === v.id);
    if (index > 0) {
      if (type === 'edit') {
        value[index] = v;
      } else if (type === 'delete') {
        value.splice(index, 1);
      }
      res[v.type].value = value;
      setData(res);
      LocalStorage.set(NEWTAB_STORAGE_KEY, res);
    }
  };

  const handleEdit = (v) => editData('edit', v);
  const handleRemove = (v) => editData('delete', v);
  return (
    <div>
      {Object.values(datas).map((item) => (
        <Module {...item} key={item.name} onEdit={handleEdit} onRemove={handleRemove} />
      ))}
      <Add onChange={handleAdd} />
    </div>
  );
}
