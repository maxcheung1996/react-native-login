import {List} from 'react-native-paper';

const CustomList = (props) => {
  return (
    <>
      <List.Item
        key={props.key}
        title={props.title}
        description={props.description}
        left={prop => (
          <List.Icon {...prop} icon={props.icon} />
        )}
        right={prop => <List.Icon {...prop} icon="arrow-right-thin" />}
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
