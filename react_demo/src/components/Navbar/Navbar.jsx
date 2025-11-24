import React from 'react';
import { Terminal } from 'lucide-react';
import { themes } from '../../constants/themes';

export const Navbar = ({ theme, setTheme, currentTheme }) => {
  const c = currentTheme.colors;

  return (
    <nav className={`${c.cardBg} border-b-2 ${c.border} sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className={`w-6 h-6 ${c.primaryText}`} />
            <h1 className={`text-xl font-bold ${c.text}`}>
              Power Station Database
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-sm ${c.textSecondary} mr-2`}>主题:</span>
            {Object.entries(themes).map(([key, value]) => {
              const IconComponent = value.icon;
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`p-2 rounded transition-all ${
                    theme === key
                      ? `${c.primary} text-white shadow-lg`
                      : `${c.secondary} ${c.text} ${c.secondaryHover}`
                  }`}
                  title={value.name}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
