import Swal from 'sweetalert2';

export default function Sort_Done({ totalItemsCount, packedItemsCount, packedPercentage, clearList, setSortOption }) {

    const handleClearList = () => {
        if (totalItemsCount === 0) {
            Swal.fire({
                title: "No items added yet",
                text: "Please add some items to the list before clearing.",
                icon: "info",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
             
            }).then((result) => {
                if (result.isConfirmed) {
                    clearList();
                    Swal.fire({
                        title: "Cleared!",
                        text: "Your list has been cleared.",
                        icon: "success",
                      
                    });
                }
            });
        }
    };

    return (
        <footer>
            <div className="inputs">
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value disabled>Sort by...</option>
                    <option value="packed">Sort by packed status</option>
                    <option value="inputOrder">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="amount">Sort by amount</option>
                </select>
                <button onClick={handleClearList}>Clear list</button>
            </div>
            <div>
                {totalItemsCount === 0 ? (
                    <p>Start adding some items to your list <span className="fs-5">🚀</span></p>
                ) : (
                    <>
                        <p><span> 💼 </span> You have {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in your list. You already packed {packedItemsCount} {packedItemsCount === 1 ? "item" : "items"} ({packedPercentage.toFixed(2)}%).</p>
                    </>
                )}
            </div>
        </footer>
    );
}
