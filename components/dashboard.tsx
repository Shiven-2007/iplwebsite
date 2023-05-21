"use client";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Dashboard = ({ datarec }: { datarec: any }) => {
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	const [activePlayer, setActivePlayer] = useState({
		playerName: "",
		season: "",
	});
	const [searchPlayer, setSearchPlayer] = useState("");
	useEffect(() => {
		if (activePlayer) {
			console.log(activePlayer);
		}
	}, [activePlayer]);
	const change = (e: any) => {
		setSearchPlayer(e.target.value);
	};
	const data = datarec.filter((item: any) => {
		if (searchPlayer == "") {
			return item;
		} else if (item.name.toLowerCase().includes(searchPlayer.toLowerCase())) {
			return item;
		}
	});
	let chartLabels: string[] = [];
	let chartDataPoints: number[] = [];
	data.forEach((element: any) => {
		if (element.name == activePlayer.playerName) {
			chartLabels.push(element.season.toString());
			chartDataPoints.push(element.economyRate);
		}
	});
	const chartData = {
		labels: chartLabels,
		datasets: [
			{
				label: "Data",
				data: chartDataPoints,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
				borderWidth: 2,
			},
		],
	};
	return (
		<div className="w-full p-6">
			<input
				type="text"
				placeholder="Search for players"
				value={searchPlayer}
				onChange={(e) => change(e)}
				className="w-1/6 px-2 py-1 rounded-sm border-2 border-gray-400"
			></input>
			<div className="w-full flex">
				<div className="w-1/2 px-4 hahaparent">
					{hydrated &&
						data
							.sort((a: any, b: any) => {
								return a.economyRate - b.economyRate;
							})
							.slice(0, 20)
							.filter((item: any) =>
								searchPlayer == ""
									? item.economyRate == data[0].economyRate
									: item
							)
							.sort((a: any, b: any) => {
								return -a.wickets + b.wickets;
							})
							.map((item: any, index: any) => (
								<div
									className={`hahamagic flex w-full justify-around my-2 px-2 hover:bg-[#89b1c5] rounded-sm ${
										activePlayer.playerName == item.name &&
										activePlayer.season == item.season
											? "bg-[#89b1c5]"
											: ""
									}
                                    `}
								>
									<input
										type="radio"
										value={[item.name, item.season]}
										onChange={(e) => {
											setActivePlayer({
												playerName: e.target.value.split(",")[0],
												season: e.target.value.split(",")[1],
											});
										}}
										name="player"
										id={index}
									></input>
									<div className="flex w-full justify-around">
										<label
											htmlFor={index}
											className="w-full flex justify-evenly py-4"
										>
											<p className="w-1/4 text-center">{item.name}</p>
											<p className="w-1/6 text-center">{item.economyRate}</p>
											<p className="w-1/6 text-center">{item.wickets}</p>
											<p className="w-1/6 text-center">{item.season}</p>
										</label>
									</div>
								</div>
							))}
				</div>
				<div className="w-1/2">
					<Line datasetIdKey="id" data={chartData} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
