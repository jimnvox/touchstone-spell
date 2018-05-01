import { expect } from 'chai';
import { jam as freeze } from './skills';
import states from './../unitFactory/unitStates';
import { createStatus, createTestUnit } from './../unitFactory/unitFactory';

describe('freeze', () => {
    const activeUnit = { state: states.active };
    const almostActiveUnit = { state: states.activeNextTurn };
    const inactiveUnit = { state: states.inactive };
    const frozenUnit = { state: states.frozen };
    const deadUnit = { state: states.dead };
    const weakenedUnit = { state: states.weakened };

    const allUnits = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, deadUnit, weakenedUnit];

    const skill = { all: true };

    describe('targetting', () => {
        it('should ONLY target units that will be active on their next turn', () => {
            let actualTargets = freeze.getTargets(skill, allUnits);
            let expectedTargets = [activeUnit, almostActiveUnit, weakenedUnit];

            expect(actualTargets).to.deep.equal(expectedTargets);
        });
    });

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT invisible', () => {
            let target;
            let affected;
            
            beforeEach(() => {
                target = createTestUnit({ healthLeft: 5, timer: 0 });
                affected = freeze.affectTarget(skill, null, target, null);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should NOT modify any status fields', () => {
                let expectedStatus = Object.assign({}, baseStatus);

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });

            it('should change state to frozen', () => {
                expect(target.state, "target.state").to.equal(states.frozen);
            });
        });

        describe('when targetting units that are invisible', () => {
            let target;
            let affected;
            let originalState;
            
            beforeEach(() => {
                target = createTestUnit({ healthLeft: 5, timer: 0, invisible: 5 });
                originalState = target.state;
                affected = freeze.affectTarget(skill, null, target, null);
            });

            it('should NOT affect them', () => {
                expect(affected).to.equal(false);
                expect(target.state, "target.state").to.equal(originalState);
            });

            it('should decrement invisible', () => {
                expect(target.status.invisible, "invisible").to.equal(4);
            });

            it('should ONLY modify invisible', () => {
                let expectedStatus = Object.assign({}, baseStatus, { invisible: 4 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });
    });
});