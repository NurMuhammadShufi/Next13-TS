import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

type Product = {
    id: number;
    title: string;
    price: number;
};

async function getProducts() {
    const res = await fetch("http://localhost:5000/products", { cache: "no-store" });
    return res.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts();
    return (
        <div className="p-10">
            <div className="py-2">
                <AddProduct />
            </div>
            <div className="overflow-x-auto my-10">
                <table className="table w-full divide-y divide-slate-500 flex justify-center items-center">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Products</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                    <UpdateProduct {...product} />
                                    <DeleteProduct {...product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
