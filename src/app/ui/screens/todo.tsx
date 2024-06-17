import React from 'react';
import {View, FlatList} from 'react-native';
import {useTodoList} from '../../hooks/useTodoTask';
import {AppText} from '../views/AppText';

const TodoScreen = () => {
  const {todos} = useTodoList();
  return (
    <View>
      <FlatList
        data={todos?.list ?? []}
        keyExtractor={(item, index) =>
          item.id.toString() + '-' + index.toString()
        }
        renderItem={({item}) => (
          <View>
            <AppText variant="medium">{`id: ${item.id}, title: ${item.title}, ${
              item.completed ? 'is completed' : 'does not complete'
            }`}</AppText>
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;
