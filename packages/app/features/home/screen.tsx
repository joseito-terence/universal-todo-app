import { Text, useSx, View, H1, P, Row, A, TextInput } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

type TodoType = {
  task: string,
  status: 'active' | 'completed'
}

export function HomeScreen() {
  const sx = useSx()
  const [todos, setTodos] = useState<TodoType[] | []>([
    {task: 'one', status: 'active'},
    {task: 'one', status: 'active'},
    {task: 'one', status: 'active'},
    {task: 'one', status: 'active'},
    {task: 'one', status: 'active'},
  ])
  const [task, setTask] = useState('')

  return (
    <View
      sx={{ flex: 1, p: 16, width: ['100%', 600], mx: 'auto' }}
    >
      <H1 sx={{ fontWeight: '800', color: 'white', letterSpacing: 10 }}>TODO</H1>
      <TextInput 
        placeholder='Create a new todo...'
        value={task}
        onChangeText={setTask}
        onSubmitEditing={() => {
          setTodos(_todos => [...todos, { task, status: 'active' }])
          setTask('')
        }}
        sx={{
          height: 40,
          width: '100%',
          p: 30,
          bg: 'white',
          borderRadius: 4,
          fontSize: 18,
        }}
      />
      <View sx={{ width: '100%', bg: 'white', borderRadius: 4, mt: 10, boxShadow: 'md' }}>
        {todos.map((todo, idx) => (
          <View key={idx} sx={{ p: 20, borderBottomColor: 'silver', borderBottomWidth: 1 }}>
            <Text sx={{ fontSize: 16 }}>{todo.task}</Text>
          </View>
        ))}
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
