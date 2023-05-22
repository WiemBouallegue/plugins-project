import { DataContext, DataContextProvider } from './Context';
import Main from './Main';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <DataContextProvider>
        <Main />
      </DataContextProvider>
    </QueryClientProvider>
  );
}

export default App;
