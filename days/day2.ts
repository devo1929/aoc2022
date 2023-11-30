import { InputReader } from '../services/input-reader';

const inputReader = new InputReader();

/**
 * day2
 */
function main(): void {
    inputReader.readInput().then(inputLines => {
        part1(inputLines as string[]);
        part2(inputLines as string[]);
    });
}

function part1(inputLines: string[]): void {
    const rounds = toRounds(inputLines as string[]);
    const score = rounds.reduce((_score, round) => _score + round.score, 0);
    console.log(score);
}

function part2(inputLines: string[]): void {
    const rounds = toRounds(inputLines as string[], false);
    const score = rounds.reduce((_score, round) => _score + round.score, 0);
    console.log(score);
}

function toRounds(inputLines: string[], part1 = true): Round[] {
    return inputLines.map(line => {
        const plays = line.split(' ');
        return part1 ? Round.fromPlays(plays[0], plays[1]) : Round.fromOutcome(plays[0], plays[1]);
    })
}

function toPlay(play: string): Play {
    switch (play) {
        case 'A':
        case 'X':
            return Play.Rock;
        case 'B':
        case 'Y':
            return Play.Paper
        case 'C':
        case 'Z':
            return Play.Scissors;
    }
}

function toOutcome(outcome: string): Outcome {
    switch (outcome) {
        case 'X':
            return Outcome.Loss;
        case 'Y':
            return Outcome.Draw
        case 'Z':
            return Outcome.Win;
    }
}

function getCounterPlay(away: Play, outcome: Outcome): Play {
    if (outcome === Outcome.Draw)
        return away;
    
    switch (away) {
        case Play.Rock:
            return outcome === Outcome.Win ? Play.Paper : Play.Scissors;
        case Play.Paper:
            return outcome === Outcome.Win ? Play.Scissors : Play.Rock;
        case Play.Scissors:
            return outcome === Outcome.Win ? Play.Rock : Play.Paper;
    }
}


class Round {
    away: Play;
    home: Play;

    constructor(away: Play, home: Play) {
        this.away = away;
        this.home = home;
    }

    static fromPlays(away: string, home: string): Round {
        return new Round(toPlay(away), toPlay(home));
    }

    static fromOutcome(rawAway: string, rawOutcome: string): Round {
        const away = toPlay(rawAway);
        const outcome = toOutcome(rawOutcome);
        const home = getCounterPlay(away, outcome);
        return new Round(away, home);
    }

    get outcome(): Outcome {
        if (this.home === this.away)
            return Outcome.Draw;

        switch (this.home) {
            case Play.Paper:
                return this.away === Play.Rock ? Outcome.Win : Outcome.Loss;
            case Play.Rock:
                return this.away === Play.Scissors ? Outcome.Win : Outcome.Loss;
            case Play.Scissors:
                return this.away === Play.Paper ? Outcome.Win : Outcome.Loss;
        }
    }

    get score(): number {
        return this.outcome as number + this.home as number;
    }

}

enum Play {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

enum Outcome {
    Loss = 0,
    Draw = 3,
    Win = 6
}

main();
