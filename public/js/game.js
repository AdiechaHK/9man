const vueConf = {
	el: '#nineManApp',
	data: {
		greet: "Hey !",
		board: [],
		manLeft: 9,
		color: "blue",
		opColor: "green",
		status: "waiting",
		moves: []
	},
	mounted() {
		let data = JSON.parse($(this.$refs.boardHolder).attr('data'));
		this.board = data.hasOwnProperty('board') ? data.board: [];
		this.color = data.hasOwnProperty('color') ? data.color: "blue";
		this.opColor = data.hasOwnProperty('opColor') ? data.color: "green";
	},
	methods: {
		markSpot(x, y) {
			if(this.hasSpot(x, y)) {
				/* Check if man left */
				if(this.manLeft > 0) {
					this.occupySpot(x, y);
				}
				console.log("Yes, it's spot")
				return;
			}
			console.error("Oops it's not a spot !");
		},
		occupySpot(x, y) {
			let cur = this.getBoardCell(x, y);
			cur += " " + this.color;
			console.log(cur);
			this.setBoardCell(x, y, cur);
		},
		computePoints(x, y){
			let lineCoordinates = {
				right: "50,50 100,50 50,50",
				left: "50,50 0,50 50,50",
				up: "50,50 50,0 50,50",
				down: "50,50 50,100 50,50"
			}
			let cell = this.getBoardCell(x, y);
			let points = cell.split(" ")
				.filter(type => lineCoordinates.hasOwnProperty(type))
				.map(type => {
					return lineCoordinates[type];
				}).join(" ");
			return points.trim() == ""? "": points.trim();
		},
		hasSpot(x, y) {
			let cell = this.getBoardCell(x, y);
			return cell.indexOf('spot') != -1;
		},
		getSpotRadius(x, y) {
			return this.hasSpot(x, y)? 10: 0;
		},
		getSpotColor(x, y) {
			let cell = this.getBoardCell(x, y);
			let colors = [this.color, this.opColor].filter(c => cell.indexOf(c) != -1);
			if (colors.length > 0) return colors[0];
			return "white";
		},
		getBoardCell(x, y) {
			let row = this.board.length > x ? this.board[x]: [];
			return row.length > y ? row[y]: "";
		},
		setBoardCell(x, y, val) {
			this.board[x][y] = val;
		}
	}
};

var app = new Vue(vueConf);