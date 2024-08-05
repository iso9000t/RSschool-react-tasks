import { useDispatch, useSelector } from 'react-redux';

import { unselectAllItems } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems,
  );

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = () => {
    const headers = ['Name', 'Species', 'URL'];
    const rows = selectedItems.map((item) => [
      item.name,
      item.species,
      item.url,
    ]);

    const csvContent =
      headers.join(',') + '\n' + rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedItems.length}_items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flyout">
      <p>{`${selectedItems.length} items are selected`}</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
