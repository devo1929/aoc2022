import { InputReader } from '../services/input-reader';

const inputReader = new InputReader();

/**
 * day1
 */
export function main(): void {
    inputReader.readInput().then((calories: string[]) => {
        const elves = toElves(calories);
        part1(elves);
        part2(elves);
    });
}

function part1(elves: Elf[]): void {
    const mostCalories = Math.max(...elves.map(e => e.totalCalories));
    const fattestElf = elves.find(e => e.totalCalories === mostCalories);
    console.log(fattestElf.totalCalories);
}

function part2(elves: Elf[]): void {
    const orderedElves = elves.sort((a, b) => {
        return a.totalCalories > b.totalCalories ? -1 : 1;
    });
    const topThreeElves = orderedElves.slice(0, 3);
    const totalCalories = topThreeElves.reduce((sum, e) => sum + e.totalCalories, 0);
    console.log(totalCalories);
}

function toElves(calories: string[]): Elf[] {
    if (!calories.length)
        return [];
    const allElves: Elf[] = [new Elf()];
    return calories.reduce((elves, calorie) => {
        const elf = elves[elves.length - 1] as Elf;
        if (calorie == '')
            elves.push(new Elf());
        else
            elf.addCalories(parseInt(calorie));

        return elves;

    }, allElves)
}

class Elf {
    calories: number[] = [];

    addCalories(calorie: number): void {
        this.calories.push(calorie);
    }

    get totalCalories(): number {
        return this.calories.reduce((all, current) => {
            return all + current;
        }, 0);
    }
}

main();
