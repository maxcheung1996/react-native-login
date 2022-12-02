import {Button, List, MD3Colors, ProgressBar, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';

const CustomList = (props) => {
  return (
    <>
      <List.Item
        key={uuid.v4()}
        title={props.title}
        description={props.description}
        left={(prop) => (
          <List.Icon {...prop} icon={props.icon} />
        )}
        right={props.rightIcon}
        onPress={props.onPress}
        style={props.style}
        titleStyle={{}}
        descriptionStyle={{}}
        titleEllipsizeMode="clip"
        descriptionEllipsizeMode="tail"
      />
    </>
  );
};

export default CustomList;
