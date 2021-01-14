import React, { useEffect, useState } from "react";
import "./App.scss";
import Quote from "./components/quote/Quote";
import axios from "axios";
import moment from "moment";

const fetchProducts = () => {
    return axios.get("https://api.pro.coinbase.com/products");
};

const now = moment().toISOString();

const interval = moment().subtract(24, "hours").toISOString();

export let ws: WebSocket;

const App = () => {
    const [products, setProducts] = useState<any>([]);
    
    useEffect(() => {
        fetchProducts().then((response) => {
            const data = response.data.filter((product: any) => product.quote_currency === "USD");
            setProducts(data);
            ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: "subscribe",
                    product_ids: data.map((product: any) => product.id),
                    channels: ["ticker"],
                }));
            };
        });
    }, []);

    return (
        <div className="App">
            {products.map((product: any, index: number) => <Quote product={product} now={now} interval={interval} index={index} />)}
        </div>
    );
}

export default App;
