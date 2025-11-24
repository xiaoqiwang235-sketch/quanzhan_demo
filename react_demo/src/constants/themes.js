import { Sun, Moon, Terminal } from 'lucide-react';

export const themes = {
  light: {
    name: '简约白',
    icon: Sun,
    colors: {
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-300',
      borderHover: 'hover:border-gray-400',
      primary: 'bg-blue-600',
      primaryText: 'text-blue-600',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-gray-100',
      secondaryHover: 'hover:bg-gray-200',
      tableBorder: 'border-gray-200',
      tableHover: 'hover:bg-gray-50',
      tableStripe: 'bg-gray-50',
      inputBg: 'bg-white',
      inputBorder: 'border-gray-300',
      buttonBorder: 'border-gray-400'
    }
  },
  hacker: {
    name: '黑客绿',
    icon: Terminal,
    colors: {
      bg: 'bg-black',
      cardBg: 'bg-black',
      text: 'text-emerald-400',
      textSecondary: 'text-emerald-600',
      border: 'border-emerald-500',
      borderHover: 'hover:border-emerald-400',
      primary: 'bg-emerald-600',
      primaryText: 'text-emerald-400',
      primaryHover: 'hover:bg-emerald-950',
      secondary: 'bg-emerald-950/20',
      secondaryHover: 'hover:bg-emerald-950/40',
      tableBorder: 'border-emerald-900',
      tableHover: 'hover:bg-emerald-950/20',
      tableStripe: 'bg-black/60',
      inputBg: 'bg-black',
      inputBorder: 'border-emerald-600',
      buttonBorder: 'border-emerald-600'
    }
  },
  dark: {
    name: '暗黑高级',
    icon: Moon,
    colors: {
      bg: 'bg-black',
      cardBg: 'bg-black',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      border: 'border-gray-700',
      borderHover: 'hover:border-gray-600',
      primary: 'bg-gray-800',
      primaryText: 'text-white',
      primaryHover: 'hover:bg-gray-700',
      secondary: 'bg-gray-900',
      secondaryHover: 'hover:bg-gray-800',
      tableBorder: 'border-gray-800',
      tableHover: 'hover:bg-gray-900',
      tableStripe: 'bg-gray-950',
      inputBg: 'bg-gray-900',
      inputBorder: 'border-gray-700',
      buttonBorder: 'border-gray-600'
    }
  }
};
