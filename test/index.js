var assert = require('assert');
require('chai');
require('should');

var CoffeeMachine = require('../lib/coffee_machine');
var Command = require('../lib/command');
var drink = require('../lib/drink');

describe('Coffe machine', function () {
	var coffeMachine;

	before(function () {
		coffeMachine = new CoffeeMachine();
	});

	it('should return the right drink', function () {
		var padCommand = new Command(drink.TEA, 0);
		var command = coffeMachine.process(padCommand);
		
		assert.equal(command, drink.TEA.label + '::');
	});

	it('should throw an error when unknown drink is asked', function () {
		(function() {
			var unknownDrinkCommand = new Command('NA', 0);
			coffeMachine.process(unknownDrinkCommand);
		}).should.throw();
	});

	it('should return the right amound of sugar', function () {
		var padCommand = new Command(drink.COFFEE, 1);
		var command = coffeMachine.process(padCommand);

		assert.equal(command, 'C:1:0');
	});

	it('should add a spoon when sugar is added', function () {
		var padCommand = new Command(drink.COFFEE, 1);
		var command = coffeMachine.process(padCommand);

		assert.equal(command, 'C:1:0');
	});

	it('should make a drink if there is enough money', function() {
		var padCommand = new Command(drink.COFFEE, 1, 1);
		var command = coffeMachine.process(padCommand);

		assert.equal(command, 'C:1:0');
	});

	it('should throw if there is not enough money', function() {
		(function () {
			var padCommand = new Command(drink.COFFEE, 1, .1);
			var command = coffeMachine.process(padCommand);

			assert.equal(command, 'C:1:0');		
		}).should.throw();
	});

	it('should be able to buy oragne juice', function () {
		var padCommand = new Command(drink.OJ, 0, 1);
		var command = coffeMachine.process(padCommand);
		assert.equal(command, 'O::');
	});

	it('should be able to make extra hot coffee, tea or orange', function () {
		var padCommand = new Command(drink.COFFEE, 0, 1, true);
		var command = coffeMachine.process(padCommand);
		
		assert.equal(command, 'Ch::');
	});

	it('should not be able to serve hot orange juice', function () {
		var padCommand = new Command(drink.OJ, 0, 1, true);
		var command = coffeMachine.process(padCommand);
		
		assert.equal(command, 'O::');
	});	

	it('should not be able to serve sugary orange juice', function () {
		var padCommand = new Command(drink.OJ, 1, 1, true);
		var command = coffeMachine.process(padCommand);
		
		assert.equal(command, 'O::');
	});
});
