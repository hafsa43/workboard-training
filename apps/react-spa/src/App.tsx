import { Layout } from './components/Layout';
import { ComponentDemo } from './components/ComponentDemo';
function App() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Component Library Demo
      </h1>
      <ComponentDemo />
    </Layout>
  );
}
export default App;