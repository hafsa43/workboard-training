import { Layout } from './components/Layout';
function App() {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome to WorkBoard
        </h2>
        <p className="text-gray-600">
          Your project and task management application.
        </p>
      </div>
    </Layout>
  );
}
export default App;