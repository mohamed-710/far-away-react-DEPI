import { useState, useEffect } from 'react';
import './App.css';
import Sort_Done from './Footer';
import Header from './Header';
import InputSection from './InputSection';
import ListInput from './List';

function App() {
  // Load initial state from local storage
  const loadStateFromLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    const sortOption = localStorage.getItem('sortOption') || 'inputOrder';
    return { items, checkedItems, sortOption };
  };

  const [items, setItems] = useState(loadStateFromLocalStorage().items);
  const [checkedItems, setCheckedItems] = useState(loadStateFromLocalStorage().checkedItems);
  const [sortOption, setSortOption] = useState(loadStateFromLocalStorage().sortOption);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    localStorage.setItem('sortOption', sortOption);
  }, [items, checkedItems, sortOption]);

  const addItem = (count, name) => {
    const newItems = [...items, { count, name }];
    const newCheckedItems = [...checkedItems, false];
    setItems(newItems);
    setCheckedItems(newCheckedItems);
  };

  const clearList = () => {
    setItems([]);
    setCheckedItems([]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    const newCheckedItems = checkedItems.filter((_, i) => i !== index);
    setItems(newItems);
    setCheckedItems(newCheckedItems);
  };

  const toggleItemChecked = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const totalItemsCount = items.length;
  const packedItemsCount = checkedItems.filter((item) => item).length;
  const packedPercentage = totalItemsCount === 0 ? 0 : (packedItemsCount / totalItemsCount) * 100;
  const sortByPackedStatus = (a, b) => checkedItems[items.indexOf(a)] - checkedItems[items.indexOf(b)];
  const sortByDescription = (a, b) => a.name.localeCompare(b.name);
  const sortByAmount = (a, b) => a.count - b.count;

  useEffect(() => {
    let sortedItems = [...items];
    if (sortOption === 'packed') {
      sortedItems.sort(sortByPackedStatus);
    } else if (sortOption === 'description') {
      sortedItems.sort(sortByDescription);
    } else if (sortOption === 'amount') {
      sortedItems.sort(sortByAmount);
    }
    if (JSON.stringify(sortedItems) !== JSON.stringify(items)) {
      setItems(sortedItems);
    }
  }, [sortOption]);

  return (
    <>
      <Header />
      <InputSection addItem={addItem} />
      <ListInput items={items} checkedItems={checkedItems} toggleItemChecked={toggleItemChecked} removeItem={removeItem} />
      <Sort_Done totalItemsCount={totalItemsCount} packedItemsCount={packedItemsCount} packedPercentage={packedPercentage} clearList={clearList} setSortOption={setSortOption}/>
    </>
  );
}

export default App;
