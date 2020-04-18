
const home = (req, res) => {
	res.render("home")
}

const game = (req, res) => {
	let {gameId} = req.params
	let board = require('../statics/board');
	res.render("game", {gameId, board})
}

exports = module.exports = {
	home,
	game
}