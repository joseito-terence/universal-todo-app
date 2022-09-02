import { Text, useSx, View, H1, P, Row, A, TextInput, Image, Pressable } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import Checkbox from '../Checkbox'

type TodoType = {
  id: number,
  task: string,
  status: 'active' | 'completed'
}

type FilterType = 'all' | TodoType['status']

export function HomeScreen() {
  const sx = useSx()
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, task: 'Complete online Javascript course', status: 'completed' },
    { id: 2, task: 'Jog around the park 3x', status: 'completed' },
    { id: 3, task: '10 minutes meditation', status: 'active' },
    { id: 4, task: 'Read for 1 hour', status: 'active' },
    { id: 5, task: 'Pick up groceries', status: 'active' },
    { id: 6, task: 'Complete Todo App on Frontend Mentor', status: 'active' }
  ])
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const activeCount = useMemo(() => todos.filter(todo => todo.status === 'active').length , [todos])

  const clearCompleted = () => {
    setTodos(_todos => _todos.filter((todo) => todo.status === 'active'))
  }

  return (
    <View
      sx={{ flex: 1, p: 16, width: ['100%', 600], mx: 'auto', mt: 15 }}
    >
      <H1 sx={{ fontWeight: '800', color: 'white', letterSpacing: 10 }}>TODO</H1>
      <TextInput
        placeholder='Create a new todo...'
        value={task}
        onChangeText={setTask}
        onSubmitEditing={() => {
          setTodos(_todos => [...todos, { task, status: 'active', id: _todos.length + 1 }])
          setTask('')
        }}
        sx={{
          width: '100%',
          px: 30,
          py: 3,
          bg: 'white',
          borderRadius: 4,
          fontSize: 18,
        }}
      />
      <View sx={{ width: '100%', bg: 'white', borderRadius: 4, mt: 20, boxShadow: 'md' }}>
        {todos
          .filter((todo) => (filter === 'all') ? true : (todo.status === filter))
          .map((todo, idx) => (
            <View key={idx} sx={{ p: 20, borderBottomColor: 'silver', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Checkbox checked={todo.status === 'completed'}
                onChange={checked => 
                  setTodos(_todos => _todos.map(_todo => _todo.id === todo.id ? {..._todo, status: checked ? 'completed' : 'active'} : _todo))
                }
              />
              <Text sx={{ 
                fontSize: 16,
                textDecorationLine: (todo.status === 'completed') ? 'line-through' : undefined
              }}>
                {todo.task}
              </Text>
            </View>
          ))
        }

        <Row sx={{ justifyContent: 'space-between', p: 20, fontSize: 12 }}>
          <Text sx={{ color: 'gray' }}>{activeCount} items left</Text>
          <Row sx={{ gap: 3 }}>
            {['all', 'active', 'completed'].map((option: FilterType, idx) => (
              <Pressable 
                onPress={() => setFilter(option)} 
                sx={{ 
                  color: (filter === option) ? 'blue' : 'black',
                  textTransform: 'capitalize'
                }}
                key={idx}
              >
                {option}
              </Pressable>
            ))}
          </Row>
          <Pressable onPress={clearCompleted}>
            Clear Completed
          </Pressable>
        </Row>
      </View>

      <View sx={{ height: 32 }} />
      {/* <Row>
        <TextLink
          href="/user/fernando"
          textProps={{
            style: sx({ fontSize: 16, fontWeight: 'bold', color: 'blue' }),
          }}
        >
          Regular Link
        </TextLink>
        <View sx={{ width: 32 }} />
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text
            selectable={false}
            sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
          >
            Moti Link
          </Text>
        </MotiLink>
      </Row> */}
    </View>
  )
}
