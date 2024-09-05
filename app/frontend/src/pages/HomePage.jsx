import { useSelector, useDispatch } from 'react-redux';

export default function HomePage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const increment = () => ({ type: 'counter/increment' });
  const decrement = () => ({ type: 'counter/decrement' });

  return (
    <main style={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Home Page</h1>
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </main>
  );
}
