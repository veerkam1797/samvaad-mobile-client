import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Switch} from 'react-native-paper';
import TextTitle from '../texts/TextTitle';

type Props = {
  item: {
    id: number;
    category: string;
    option: {
      id: number;
      icon: string;
      name: string;
      desp: string;
      switch: boolean;
    }[];
  };
};

const SettingsCard = (props: Props) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState<boolean[]>(
    props.item.option.map(opt => false),
  );

  const onToggleSwitch = (index: number) => {
    const newSwitchValues = [...isSwitchOn];
    newSwitchValues[index] = !newSwitchValues[index];
    setIsSwitchOn(newSwitchValues);
  };

  return (
    <View style={{gap: 8, marginBottom: 16}}>
      <TextTitle
        variant="titleLarge"
        text={props.item.category}
        extraTextStyle={{fontFamily: 'InterSemiBold'}}
      />
      <View
        style={{
          gap: 12,
        }}>
        {props.item.option.map((opt, index) => (
          <Card
            key={opt.id}
            contentStyle={{
              padding: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <IconButton mode="contained" icon={opt.icon} size={24} />
              <View style={{flex: 1}}>
                <TextTitle
                  variant="titleMedium"
                  text={opt.name}
                  extraTextStyle={{fontFamily: 'InterSemiBold'}}
                />
                {opt.desp && (
                  <TextTitle
                    variant="titleMedium"
                    text={opt.desp}
                    extraTextStyle={{fontFamily: 'Inter'}}
                  />
                )}
              </View>
              {opt.switch && (
                <Switch
                  value={isSwitchOn[index]}
                  onValueChange={() => onToggleSwitch(index)}
                />
              )}
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({});
