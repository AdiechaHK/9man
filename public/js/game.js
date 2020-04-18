const vueConf = {
	el: '#nineManApp',
	data: {
		greet: "Hey !",
		board: [],
		status: "waiting"
	},
	mounted() {
		let data = JSON.parse($(this.$refs.boardHolder).attr('data'));
		this.board = data.hasOwnProperty('board') ? data.board: [];
	},
	methods: {
		markSpot(x, y) {
			if(this.hasSpot(x, y)) {

			}
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
			return "white";
		},
		getBoardCell(x, y) {
			let row = this.board.length > x ? this.board[x]: [];
			return row.length > y ? row[y]: "";
		}
	}
};

var app = new Vue(vueConf);