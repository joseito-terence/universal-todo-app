import { Text, useSx, View, H1, Row, TextInput, Pressable, useResponsiveValue } from 'dripsy'
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
  const isMobile = useResponsiveValue([true, false])
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, task: 'Complete online Javascript course', status: 'completed' },
    { id: 2, task: 'Jog around the park 3x', status: 'completed' },
    { id: 3, task: 'Read for 1 hour', status: 'active' },
    { id: 4, task: 'Pick up groceries', status: 'active' },
    { id: 5, task: 'Complete Todo App on Frontend Mentor', status: 'active' }
  ])
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const activeCount = useMemo(() => todos.filter(todo => todo.status === 'active').length, [todos])

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
            <View key={idx} sx={{ p: 15, borderBottomColor: 'silver', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Checkbox
                checked={todo.status === 'completed'}
                onChange={checked =>
                  setTodos(_todos => _todos.map(_todo => _todo.id === todo.id ? { ..._todo, status: checked ? 'completed' : 'active' } : _todo))
                }
                labelText={todo.task}
              />
              <Pressable onPress={() => setTodos(_todos => _todos.filter((todo, index) => index !== idx))}>
                <Ionicons name="md-close-outline" size={30} color="gray" />
              </Pressable>
            </View>
          ))
        }

        <Row sx={{ justifyContent: 'space-between', p: 20, fontSize: 12 }}>
          <Text sx={{ color: 'gray' }}>{activeCount} items left</Text>
          {!isMobile &&
            <Row>
              <Filters filter={filter} setFilter={setFilter} />
            </Row>
          }
          <Pressable onPress={clearCompleted}>
            <Text sx={{ color: 'gray' }}>Clear Completed</Text>
          </Pressable>
        </Row>
      </View>

      {isMobile &&
        <Row sx={{
          marginTop: 10,
          bg: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          p: 15,
          borderRadius: 4
        }}>
          <Filters filter={filter} setFilter={setFilter} />
        </Row>
      }
    </View >
  )
}

const Filters = ({ filter, setFilter }) => (
  <>
    {['all', 'active', 'completed'].map((option: FilterType, idx) => (
      <Pressable
        onPress={() => setFilter(option)}
        sx={{ px: 2 }}
        key={idx}
      >
        <Text sx={{
          color: (filter === option) ? '#484b6a' : '#757575',
          fontWeight: 'bold'
        }}>
          {capitilize(option)}
        </Text>
      </Pressable>
    ))}
  </>
)

const capitilize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`
