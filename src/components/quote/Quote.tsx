import React, { useEffect, useState } from "react";
import "./Quote.scss";
import axios from "axios";
import { ws } from "../../App";
import LineChart from "../line-chart/LineChart";

const Quote = ({ product, now, interval, index }: any) => {
    const [price, setPrice] = useState(0);
    const [variation, setVariation] = useState(0);
    const [values, setValues] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ws.addEventListener("message", (res: any) => {
            const data = JSON.parse(res.data);
            if (data.product_id === product.id) {
                const actualPrice = Number(data.price);
                const openPrice = Number(data.open_24h);
                setPrice(actualPrice);
                setVariation(Number((((actualPrice / openPrice) - 1) * 100).toFixed(2)));
            }
        });
        setTimeout(() => {
            axios.get(`https://api.pro.coinbase.com/products/${product.id}/candles?granularity=3600&start=${interval}&end=${now}`).then(({ data }) => {
                setValues(data.reverse());
                setLoading(false);
            });
        }, index * 500);
    }, []);

    return (
        <div className="Quote">
            <LineChart id={product.id} values={values} variation={variation} loading={loading} />
            <div className="data">
                <p className="title">{product.display_name}</p>
                {variation < 0 ? <p className="price red">{"$ " + price}</p> : <p className="price green">{"$ " + price}</p>}
                {variation < 0 ? <p className="variation red">{"↓ " + variation + "%"}</p> : <p className="variation green">{"↑ " + variation + "%"}</p>}
            </div>
        </div>
    );
};

export default Quote;
