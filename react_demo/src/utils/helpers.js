export const getStatusColor = (status, theme) => {
  if (theme === 'hacker') {
    const colors = {
      'Operating': 'bg-emerald-900 text-emerald-300 border border-emerald-500',
      'Retired': 'bg-slate-900 text-slate-400 border border-slate-600',
      'Under Construction': 'bg-amber-900 text-amber-300 border border-amber-500'
    };
    return colors[status] || 'bg-slate-900 text-slate-400';
  } else if (theme === 'light') {
    const colors = {
      'Operating': 'bg-green-100 text-green-800 border border-green-300',
      'Retired': 'bg-gray-100 text-gray-600 border border-gray-300',
      'Under Construction': 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  } else {
    const colors = {
      'Operating': 'bg-green-900 text-green-300 border border-green-700',
      'Retired': 'bg-gray-800 text-gray-400 border border-gray-600',
      'Under Construction': 'bg-yellow-900 text-yellow-300 border border-yellow-700'
    };
    return colors[status] || 'bg-gray-800 text-gray-400';
  }
};

export const generatePageNumbers = (currentPage, totalPages) => {
  const pageNumbers = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const halfWay = Math.ceil(totalPages / 2);

    if (currentPage <= halfWay) {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(startPage + 4, totalPages - 3);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, 2, 3);
      pageNumbers.push('...');

      const endPage = Math.min(totalPages, currentPage + 2);
      const startPage = Math.max(4, endPage - 4);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
  }

  return pageNumbers;
};
