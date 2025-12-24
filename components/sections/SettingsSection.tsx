import {settingOptions} from '@/constants/Constant';
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import SettingsCard from '../cards/SettingsCard';

type ItemData = {
  id: number;
  category: string;
  option: [
    {
      id: number;
      icon: string;
      name: string;
      desp: string;
      switch: boolean;
    },
  ];
};

const SettingsSection = () => {
  const [settings, setSettings] = React.useState<ItemData[]>([]);

  React.useEffect(() => {
    const filteredOptions = settingOptions.filter(
      (option): option is ItemData => typeof option !== 'string',
    );
    setSettings(filteredOptions);
  }, []);

  const renderItem: ListRenderItem<ItemData> = ({item}) => {
    return <SettingsCard item={item} />;
  };

  return (
    <View>
      <FlatList
        data={settings}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{padding: 16}}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        overScrollMode="always"
      />
    </View>
  );
};

export default SettingsSection;

const styles = StyleSheet.create({});
