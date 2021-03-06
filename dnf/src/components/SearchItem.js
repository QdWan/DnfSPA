import React, { useState } from "react";
import "./SearchItem.scss";
import Search from "./Search";
import List from "./List";
import axios from "axios";
import Helmet from "react-helmet";
import styled from "styled-components";

const Message = styled.div`
	height: 4rem;
	text-align: center;
	font-size: 1.125rem;
	padding: 0.5rem;
`;

const SearchItem = () => {
	// API 호출하여 아이템 검색
	const [items, setItems] = useState([]);
	const onSearch = name => {
		setItems([]);
		try {
			axios
				.get(
					`https://api.neople.co.kr/df/items?itemName=${name}&wordType=front&limit=30&apikey=nJeolB5EWc0nUNTYk62nFcPH3e9L9WJG`
				)
				.then(response => {
					if (response.data.rows.length === 0) {
						setItems(-1);
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
				<title>아이템 검색</title>
			</Helmet>
			<div className="app-title">아이템 검색</div>
			<Search onSearch={onSearch} type="아이템" />
			{items === -1 ? (
				<Message>
					<u>검색 결과가 없습니다.</u>
				</Message>
			) : (
				<List items={items} />
			)}
		</div>
	);
};

export default SearchItem;
