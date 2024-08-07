import { useState } from 'react';
import Swal from 'sweetalert2';

export default function InputSection({ addItem }) {
  const [itemCount, setItemCount] = useState(1); 
  const [itemInput, setItemInput] = useState('');

  const handleAdd = () => {

    if (!itemInput.trim()) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please enter an item name.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
      return;
    }

    if (itemCount <= 0 || isNaN(itemCount)) {
      Swal.fire({
        title: "Invalid Count",
        text: "Please enter a valid number greater than zero.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
      return;
    }

    
    addItem(itemCount, itemInput);
    setItemInput('');
    setItemCount(1); 
  };

  const handleInputChange = (event) => {
    setItemInput(event.target.value);
  };

  const handleCountChange = (event) => {
    const value = Number(event.target.value); 
    
    setItemCount(isNaN(value) ? 1 : value);
  };

  return (
    <header className="inputsection">
      <p>What do you need for your <span>🌍</span> Trip?</p>
      <input
        type="number"
        className="rounded-pill text-center"
        onChange={handleCountChange}
        value={itemCount} 
      />
      <input
        type="text"
        className="rounded-pill text-center"
        placeholder="item..."
        onChange={handleInputChange}
        value={itemInput} 
      />
      <button onClick={handleAdd}>Add</button>
    </header>
  );
}
