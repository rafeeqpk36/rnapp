import React from "react";
import TodoScreen from "./TodoScreen";
import MenuButton from "./MenuButton";

const PublicTodos = ({ navigate }) => {
  //return TodoScreen with prop isPublic to true
  return <TodoScreen isPublic={true} />;
};
PublicTodos.navigationOptions = ({ navigation }) => ({
  headerTitle: "Public Todos",
  headerLeft: () => <MenuButton onPress={navigation.toggleDrawer} />
});
export default PublicTodos;
