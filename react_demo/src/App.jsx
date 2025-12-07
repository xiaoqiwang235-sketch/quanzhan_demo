import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { DataPage } from './pages/DataPage';
import { QAPage } from './pages/QAPage';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, setTheme, currentTheme, c } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen ${c.bg} ${c.text} font-mono overflow-hidden relative`}>
        {/* 背景装饰 - 仅黑客主题显示 */}
        {theme === 'hacker' && (
          <>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-transparent to-cyan-500 blur-3xl"></div>
            </div>
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'linear-gradient(0deg, #10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </>
        )}

        {/* 导航栏 */}
        <Navbar theme={theme} setTheme={setTheme} currentTheme={currentTheme} />

        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<Navigate to="/qa" replace />} />
          <Route path="/data" element={<DataPage theme={theme} c={c} />} />
          <Route path="/qa" element={<QAPage theme={theme} c={c} />} />
        </Routes>
      </div>
    </Router>
  );
}
