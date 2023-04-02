"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault;
        setIsMutating(true);
        await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                price: price,
            }),
        });
        setIsMutating(false);

        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    return (
        <div>
            <button className="btn btn-sm btn-primary" onClick={handleChange}>
                Add New
            </button>
            <input type="checkbox" title="Products" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">Add New Products</h3>
                    <form onSubmit={handleSubmit}>
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
                            <input title="Prices" type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Price " />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn invert" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Saving...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
