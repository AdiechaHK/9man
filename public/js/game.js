const vueConf = {
	el: '#nineManApp',
	data: {
		greet: "Hey !",
		board: [],
		manLeft: 9,
		color: "blue",
		opColor: "green",
		status: "waiting",
		moves: [],
		dices: [],
		indexes: 0,
		p1_dice: 9,
		p2_dice: 9,
		current_turn: ''
	},
	mounted() {
		( localStorage.getItem('dices') ? this.dices = JSON.parse(localStorage.getItem('dices')) : '');
		( localStorage.getItem('p1_dice') ? this.p1_dice = JSON.parse(localStorage.getItem('p1_dice')) : '');
		( localStorage.getItem('p2_dice') ? this.p2_dice = JSON.parse(localStorage.getItem('p2_dice')) : '');
		( localStorage.getItem('current_turn') ? this.current_turn = JSON.parse(localStorage.getItem('current_turn')) : '');
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
				// console.log("Yes, it's spot")
				return;
			}
			// console.error("Oops it's not a spot !");
		},
		occupySpot(x, y) {
			let cur = this.getBoardCell(x, y);
			cur += " " + this.color;
			// console.log(cur);
			this.setBoardCell(x, y, cur);
		},
		computePoints(x, y){
			let lineCoordinates = {
				right: "40,40 80,40 40,40",
				left: "40,40 0,40 40,40",
				up: "40,40 40,0 40,40",
				down: "40,40 40,80 40,40"
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
			// let cell = this.getBoardCell(x, y);
			// let colors = [this.color, this.opColor].filter(c => cell.indexOf(c) != -1);
			// if (colors.length > 0) return colors[0];
			return "white";
		},
		getBoardCell(x, y) {
			let row = this.board.length > x ? this.board[x]: [];
			return row.length > y ? row[y]: "";
		},
		setBoardCell(x, y, val) {
			this.board[x][y] = val;
		},
		placeADice(e, c, r) {
			this.current_turn == 'p1' ? this.current_turn = 'p2' : this.current_turn = 'p1';
			this.dices.push({ id: e.target.id, player: this.current_turn });
			// Set localstorageItems
			localStorage.setItem('dices', JSON.stringify(this.dices));
			localStorage.setItem('current_turn', JSON.stringify(this.current_turn));
			const curr_dice = 'dice_'+this.current_turn+'_'+( ( this.current_turn == 'p1' ? this.p1_dice : this.p2_dice ) - 1);
			document.getElementById(curr_dice).classList.add('disappear');
			setTimeout(()=> {
				this.current_turn == 'p1' ? this.p1_dice-- : this.p2_dice--;
				if( this.current_turn == 'p1' )
					localStorage.setItem('p1_dice', JSON.stringify(this.p1_dice));
				else
					localStorage.setItem('p2_dice', JSON.stringify(this.p2_dice));
			}, 250);
			console.log(this.dices);
		},
		removeDice(e, c, r) {
			this.dices = this.dices.filter(dice => dice.id != 'index'+c+r );
		}
	},
	computed: {
		current_cls() {
			return this.current_turn;
		}
	}
};

var app = new Vue(vueConf);