import React, { useState } from "react";
import Axios from "axios";
import Search from "./Search";
import List from "./List";
import "./SearchItem.scss";
import Helmet from "react-helmet";
import { BACK_URL } from "../config";

const SearchAuc = () => {
	// API 호출하여 아이템 검색
	const [items, setItems] = useState([]);
	const onSearch = name => {
		try {
			Axios.get(
				`https://api.neople.co.kr/df/items?itemName=${name}&wordType=full&q=trade:true&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
			).then(response => {
				if (response.data.rows.length === 0) {
				} else {
					var list = [];
					response.data.rows.map(row => list.push({ id: row.itemId, name: row.itemName }));
					setItems(list);
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="SearchItem">
			<Helmet>
				<title>경매장 검색</title>
			</Helmet>
			<div className="app-title">경매장 검색</div>
			<Search onSearch={onSearch} type="아이템" />
			<List items={items} trade={true} />
		</div>
	);
};

export default SearchAuc;
