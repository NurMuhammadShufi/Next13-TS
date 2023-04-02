"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
};

export default function DeleteProduct(product: Product) {
    const [isMutating, setIsMutating] = useState(false);
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const router = useRouter();

    async function handleDelete(productId: number) {
        setIsMutating(true);
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: "DELETE",
        });
        setIsMutating(false);
        router.refresh();
        setModal(false);
    }

    return (
        <div>
            <button className="btn invert btn-sm" onClick={handleChange}>
                Delete
            </button>
            <input type="checkbox" title="Products" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">Are you sure delete {product.title}</h3>
                    <div className="modal-action">
                        <button type="button" className="btn invert" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">
                                Delete
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                                Deleting...
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
