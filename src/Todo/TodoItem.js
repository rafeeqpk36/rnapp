/*import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_TODOS } from "./Queries";
import { UPDATE_TODO, REMOVE_TODO } from "./Mutations";
import PropTypes from "prop-types";

const TodoItem = ({ item, isPublic }) => {
  const [updateTodo, { loading: updating, error: updateError }] = useMutation(
    UPDATE_TODO
  );
  const [deleteTodo, { loading: deleting, error: deleteError }] = useMutation(
    REMOVE_TODO
  );

  const userIcon = () => {
    if (!isPublic) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() =>
          Alert.alert("Message", `This todo is by @${item.user.name}`)
        }
      >
        <Text style={styles.userText}>@{item.user.name.toLowerCase()}</Text>
      </TouchableOpacity>
    );
  };

  const updateCheckbox = () => {
    if (isPublic) return null;
    const update = () => {
      if (updating) return;

      updateTodo({
        variables: {
          id: item.id,
          isCompleted: !item.is_completed
        }
      });
    };
    return (
      <TouchableOpacity
        style={item.is_completed ? styles.completedCheckBox : styles.checkBox}
        disabled={updating}
        onPress={update}
      >
        {null}
      </TouchableOpacity>
    );
  };

  const todoText = () => (
    <View style={styles.todoTextWrapper}>
      <Text
        style={item.is_completed ? styles.completedText : styles.activeText}
      >
        {item.title}
      </Text>
    </View>
  );

  const deleteButton = () => {
    if (isPublic) return null;

    const updateCache = client => {
      const data = client.readQuery({
        query: FETCH_TODOS,
        variables: {
          isPublic
        }
      });
      const newData = {
        todos: data.todos.filter(t => t.id !== item.id)
      };
      client.writeQuery({
        query: FETCH_TODOS,
        variables: {
          isPublic
        },
        data: newData
      });
    };

    const remove = () => {
      if (deleting) return;
      deleteTodo({
        variables: { id: item.id },
        update: updateCache
      });
    };

    return (
      <View style={styles.deleteButton}>
        <Icon
          name="delete"
          size={26}
          onPress={remove}
          disabled={deleting}
          color={"#BC0000"}
        />
      </View>
    );
  };

  const todoContainerStyle = isPublic
    ? styles.todoContainerPublic
    : styles.todoContainerPrivate;

  return (
    <View style={todoContainerStyle}>
      {userIcon()}
      {updateCheckbox()}
      {todoText()}
      {deleteButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainerPrivate: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "white"
  },
  todoContainerPublic: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "white"
  },
  todoTextWrapper: {
    flex: 0.7,
    margin: 5
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    flexWrap: "wrap"
  },
  activeText: {
    flexWrap: "wrap"
  },
  deleteButton: {
    flex: 0.1
  },
  checkBox: {
    flex: 0.1,
    height: 30,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "white"
  },
  completedCheckBox: {
    flex: 0.1,
    height: 30,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "green"
  },
  userItem: {
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  userText: {
    fontWeight: "bold"
  }
});

export default TodoItem;*/

import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { UPDATE_TODO, REMOVE_TODO } from "./Mutations";
import { FETCH_TODOS } from "./Queries";

const TodoItem = ({ item, isPublic }) => {
  const { id, title, is_completed } = item;
  const [
    deleteTodo,
    { loading: deleteLoading, error: deleteError }
  ] = useMutation(REMOVE_TODO);
  const [
    updateTodo,
    { loading: updateLoading, error: updateError }
  ] = useMutation(UPDATE_TODO);

  if (deleteError || updateError) return <Text>`Error! ${error.message}`</Text>;
  const userIcon = () => {
    if (!isPublic) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() =>
          Alert.alert("Message", `This todo is by @${item.user.name}`)
        }
      >
        <Text style={styles.userText}>@{item.user.name.toLowerCase()}</Text>
      </TouchableOpacity>
    );
  };

  const updateCheckbox = () => {
    if (isPublic) return null;
    return (
      <View style={styles.container}>
        <Text
          style={[styles.mark, is_completed ? styles.completed : {}]}
          onPress={() => {
            if (!updateLoading) {
              updateTodo({
                variables: { id, isCompleted: !is_completed }
              });
            }
          }}
        >
          {is_completed ? "☑" : "☒"}
        </Text>
      </View>
    );
  };

  const todoText = () => (
    <View style={styles.container}>
      <Text style={[styles.item, is_completed ? styles.completed : {}]}>
        {title}
      </Text>
    </View>
  );
  const deleteButton = () => {
    if (isPublic) return null;

    const updateCache = client => {
      const data = client.readQuery({
        query: FETCH_TODOS,
        variables: {
          isPublic
        }
      });
      const newData = {
        todos: data.todos.filter(t => t.id !== item.id)
      };
      client.writeQuery({
        query: FETCH_TODOS,
        variables: {
          isPublic
        },
        data: newData
      });
    };

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deleteTodo({
            variables: { id },
            update: updateCache
          });
        }}
        disabled={deleteLoading}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const todoContainerStyle = isPublic
    ? styles.todoContainerPublic
    : styles.todoContainerPrivate;

  return (
    <View style={todoContainerStyle}>
      {userIcon()}
      {updateCheckbox()}
      {todoText()}
      {deleteButton()}
    </View>
  );
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  todoContainerPrivate: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "white"
  },
  todoContainerPublic: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "white"
  },
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  mark: {
    fontSize: 30
  },
  item: {
    padding: 10,
    fontSize: 24
  },
  button: {
    backgroundColor: "green",
    padding: 5,
    marginLeft: "auto"
  },
  buttonText: {
    color: "white",
    fontSize: 14
  },
  completed: {
    color: "lightgray"
  },
  userItem: {
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  userText: {
    fontWeight: "bold"
  }
});

export default TodoItem;
