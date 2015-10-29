var drinks = require('./drink');
var _ = require('lodash');

var CoffeeMachine = function () {
};

var validDrink = function (drink) {
	return _.find(drinks, function (t) { 
		return drink.label === t.label;
	}) !== undefined;
};

CoffeeMachine.prototype.process = function (padCommand) {
	if (!validDrink(padCommand.drink)) {
		throw new Error;
	}

	if(padCommand.money < padCommand.drink.price) {
		throw new Error;
	}

	var drink = this.getDrink(padCommand);
	var sugar = this.getSugar(padCommand);
	var spoon = this.getSpoon(padCommand);

	return [drink, sugar, spoon].join(':');
};

CoffeeMachine.prototype.getDrink = function (padCommand) {
	if (!padCommand.drink.canBeHot) {
		return padCommand.drink.label;
	}

	return padCommand.extraHot ? padCommand.drink.label + 'h' : padCommand.drink.label;
};

CoffeeMachine.prototype.getSugar = function (padCommand) {
	if (!padCommand.drink.canAddSugar) {
		return '';
	}

	return padCommand.sugar === 0 ? '' : padCommand.sugar;
};

CoffeeMachine.prototype.getSpoon = function (padCommand) {
	if (!padCommand.drink.canAddSugar) {
		return '';
	}

	return padCommand.sugar === 0 ? '' : '0';	
};

module.exports = CoffeeMachine;
