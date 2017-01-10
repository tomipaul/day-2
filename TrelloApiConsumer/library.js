const readline = require('readline');
const request = require('request');

const Interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'SCLIA> '
});

Interface.on('line', (input) => {
	switch(input.trim()) {
		case 'getAccess': 
			consumer.getAccess();
			break;
		case 'getBoards':
			consumer.getBoards();
			break;
		case 'getBoard':
			consumer.getBoard();
			break;
		case 'createBoard':
			consumer.createBoard();
			break;
		case 'getList':
			consumer.getList();
			break;
		case 'addList':
			consumer.addList();
			break;
		case 'getCard':
			consumer.getCard();
			break;
		case 'addCard':
			consumer.addCard();
			break;
		case 'selectList':
			consumer.selectList();
			break;
		case 'selectBoard':
			consumer.selectBoard();
			break;
		case 'getSelectedBoard':
			consumer.getSelectedBoard();
			break;
		case 'getBoardLists':
			consumer.getBoardLists();
			break;
		case 'getBoardCards':
			consume.getBoardCards();
		default:
			console.log("Invalid command!");
			break;
	}
	Interface.prompt();
});

class TrelloApiConsumer {

	constructor(apiKey) {
		this.key = apiKey;
	}

	welcomeClient() {
		console.log("Welcome to the simple Trello CLIA! Enter `getAccess` on the CLI to begin");
	}

	getAccess() {
		var link = `https://trello.com/1/authorize?key=${this.key}&name=SimpleCIA&expiration=1day&response_type=token&scope=read,write,account`
		console.log(`Visit this link to obtain a token: ${link}`);
		Interface.question("Enter your token:", (token) => {
			var uri = `https://api.trello.com/1/members/me/?fields=username,fullName,url&key=${this.key}&token=${token}`;
			request(uri, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body);
				}
			});
			this.token = token;
		});
	}

	selectList() {
		Interface.question("Enter a card id: ", (listId) => {
			this.listId = listId;
		})
	}

	selectBoard() {
		Interface.question("Enter a board id: ", (boardId) => {
			this.boardId = boardId;
		})
	}

	getSelectedBoard() {
		if (typeof this.boardId == 'undefined') {
			console.log("No board selected, Please select a board");
		}
		else {
			var uri = `https://api.trello.com/1/boards/${this.boardId}?lists=all&list_fields=name&key=${this.key}&token=${this.token}`;
			request(uri, function(error, response, body) {
				if(!error && response.statusCode==200) {
					var boardInfo = JSON.parse(body);
					for (var info in boardInfo) {
						if (typeof boardInfo[info] == 'object') {
							console.log(`${info}:`,JSON.stringify(boardInfo[info]));
						}
						else {
							console.log(`${info}: ${boardInfo[info]}`);
						}
					}
				}
			});
		}
	}

	getBoardLists() {
		if (typeof this.boardId == 'undefined') {
			console.log("No board selected, Please select a board with the selectBoard command");
		}
		else {
			let uri = `https://api.trello.com/1/boards/${this.boardId}/lists?cards=open&card_fields=name&fields=name&key=${this.key}&token=${this.token}`
			request(uri, function(error, response, body) {
				if(!error && statusCode==200) {
					console.log(body);
				}
			});
		}
	}

	getBoardCards() {
		if (typeof this.boardId=='undefined') {
			console.log("No board selected, Please select a board with the selectBoard command")
		}
		else {
			let uri = `https://api.trello.com/1/boards/${this.boardId}/cards?fields=name,idList,url&key=${this.key}&token=${this.token}`;
			request(uri, function(error, response, body) {
				if(!error && response.statusCode==200) {
					console.log(body);
				}
			});
		}
	}

	getBoards() {
		let uri = `https://api.trello.com/1/members/me/boards?fields=name&key=${this.key}&token=${this.token}`;
		request(uri, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				for (var board of JSON.parse(body)) {
					console.log(`name: ${board.name}`);
					console.log(`id: ${board.id}`);
					console.log('\n');
				}
			}
		});
	}

	getBoard() {
		Interface.question('Enter Board id: ', (boardId) => {
			let uri = `https://api.trello.com/1/boards/${boardId}?lists=all&list_fields=name&key=${this.key}&token=${this.token}`;
			request(uri, function(error, response, body) {
				if(!error && response.statusCode==200) {
					var boardInfo = JSON.parse(body);
					for (var info in boardInfo) {
						if (typeof boardInfo[info] == 'object') {
							console.log(`${info}:`,JSON.stringify(boardInfo[info]));
						}
						else {
							console.log(`${info}: ${boardInfo[info]}`);
						}
					}
				}
			});
		});
	}

	createBoard() {
		Interface.question("Enter Board name: ", (boardName) => {
			let uri = `https://api.trello.com/1/boards?name=${boardName}&key=${this.key}&token=${this.token}`;
			request({url: uri, method: "POST"}, function(error, response, body) {
				if(!error && response.statusCode==200) {
					console.log(body);
					console.log('\n'+`Board ${boardName} created succesfully!`);
				}
			});
		});
	}

	getList() {
		Interface.question("Enter List id: ", (listId) => {
			let uri = `https://api.trello.com/1/lists/${listId}?fields=name&cards=open&card_fields=name&key=${this.key}&token=${this.token}`;
			request(uri, function(error, response, body) {
				if(!error && response.statusCode==200) {
					console.log(body);
				}
			});
		});
	}

	addList() {
		Interface.question("Enter List Name: ", (listName) => {
			let uri = `https://api.trello.com/1/lists?name=${listName}&idBoard=${this.boardId}&key=${this.key}&token=${this.token}`;
			request({url:uri, method:'POST'}, function(error, response, body) {
				if(!error && response.statusCode==200) {
					console.log(body);
					console.log('\n'+`List ${listName} created succesfully!`);
				}
			});
		});
	}

	getCard() {
		Interface.question("Enter Card id: ", (cardId) => {
			let uri = `https://api.trello.com/1/cards/${cardId}?fields=name,idList&member_fields=fullName&key=${this.key}&token=$(this.token}`;
			request(uri, function(error, response, body) {
				if(!error && response.statusCode==200) {
					console.log(body);
				}
			});
		});
	}

	addCard() {
		Interface.question("Enter Card name: ", (cardName) => {
			let uri = `https://api.trello.com/1/cards?name=${cardName}&idList=${this.listId}`;
			request({url: uri, method: "POST"}, function(error, response, body) {
				if(!error && response.statusCode==200) {
					console.log(body);
					console.log('\n'+`Card ${cardName} created succesfully!`);
				}
			});
		});
	}
}

let consumer = new TrelloApiConsumer('c8ace7931717ae2fb456773699e88205');
consumer.welcomeClient();
Interface.prompt();