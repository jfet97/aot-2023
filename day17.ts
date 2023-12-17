type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type Win = ['👊🏻', '✌🏽'] | ['✌🏽', '🖐🏾'] | ['🖐🏾', '👊🏻']

type WhoWins<S, F> = [F, S] extends Win
	? 'win'
	: [S, F] extends Win
		? 'lose'
		: 'draw';
