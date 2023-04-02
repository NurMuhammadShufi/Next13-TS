"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
};

export default function UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [isMutating, setIsMutating] = useState(false);
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault;
        setIsMutating(true);
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                price: price,
            }),
        });
        setIsMutating(false);
        router.refresh();
        setModal(false);
    }

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={handleChange}>
                Edit
            </button>
            <input type="checkbox" title="Products" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">Edit {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label htmlFor="" className="label font-bold">
                                Title
                            </label>
                            <input title="Products" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Products Name" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className="label font-bold">
                                Price
                            </label>
                            <input title="Prices" type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Price " />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn invert" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Updating...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
