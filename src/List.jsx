import React from "react";
import Swal from 'sweetalert2';

export default function ListInput({ items, checkedItems, toggleItemChecked, removeItem }) {

  const handleRemoveItem = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",

    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(index);
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <main className="main">
      <div className="p-3 d-flex gap-3 overflow-x-auto p-5 flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="item rounded-pill d-flex justify-content-between align-items-center gap-1 p-2">
            <input
              type="checkbox"
              className="m-2"
              checked={checkedItems[index]}
              onChange={() => toggleItemChecked(index)}
            />
            <p
              className="m-0"
              style={{ textDecoration: checkedItems[index] ? "line-through" : "none" }}
            >
              {item.count} {item.name}
            </p>
            <span
              className="p-2"
              role="button"
              aria-label="Remove item"
              onClick={() => handleRemoveItem(index)}
            >
              ❌
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
