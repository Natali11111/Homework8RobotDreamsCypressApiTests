import {
    createGoal, createGoalWithInvalidTeamId,
    createGoalWithMissingToken,
    deleteGoal,
    deleteGoalWithInvalidToken,
    getGoal,
    getGoalsWithInvalidTeamId, getGoalsWithoutAuthorization, getGoalWithoutAuthorization,
    updateGoal,
    updateGoalWithNotExistedToken
} from "../models_of_endpoints/goals/Methods";

import { faker } from '@faker-js/faker';

describe('Tests for goals', () => {

    //Positive Tests
    it('Positive test on deleting goal', () => {
        const goalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
            getGoal(goalId).then((response) => {
                expect(response.status).to.equal(404);
            });
        });
    });

    it('Positive test on creating goal with required fields', () => {
        const expectedNameOfGoal = faker.string.uuid();
        createGoal(expectedNameOfGoal).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            getGoal(goalId).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.goal.name).to.be.eql(expectedNameOfGoal);
            });
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    it('Positive test on updating goal', () => {
        const goalName = faker.string.uuid();
        const updatedGoalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            updateGoal(goalId, updatedGoalName).then((response) => {
                expect(response.status).to.equal(200);
                getGoal(goalId).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.goal.name).to.be.eql(updatedGoalName);
                });
                deleteGoal(goalId).then(response => {
                    expect(response.status).to.equal(200);
                });
            });
        });
    });

    // --- Negative Tests ---

    it('Negative test on getting all goals with invalid team id', () => {
        getGoalsWithInvalidTeamId('*(&****$($($($($(($').then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.include('Invalid workspace id');
        });
    });

    it('Negative test on getting all goals with not existed team id', () => {
        getGoalsWithInvalidTeamId(111111111111111111111111111).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.include('Invalid workspace id');
        });
    });

    it('Negative test on getting goal with empty team id', () => {
        getGoalsWithInvalidTeamId('').then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.include('Invalid workspace id');
        });
    });

    it('Negative test on getting all goals without authorization', () => {
        const goalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            getGoalsWithoutAuthorization('').then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.err).to.eq('Authorization header required');
            });
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    it('Negative test on getting goal with invalid goal id', () => {
        getGoal('*(&****$($($($($(($').then((response) => {
            expect(response.status).to.equal(500);
            expect(response.body.err).to.eq('Internal Server Error');
        });
    });

    it('Negative test on getting goal with not existed goal id', () => {
        getGoal('0000000000000').then((response) => {
            expect(response.status).to.equal(500);
            expect(response.body.err).to.eq('Internal Server Error');
        });
    });

    it('Negative test on getting goal with empty goal id', () => {
        getGoal('').then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body.err).to.eq('Route not found');
        });
    });

    it('Negative test on getting goal without authorization', () => {
        const goalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            getGoalWithoutAuthorization(goalId, '').then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.err).to.eq('Authorization header required');
            });
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    it('Negative test on updating goal with not existed token', () => {
        const goalName = faker.string.uuid();
        const updatedGoalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            updateGoalWithNotExistedToken(goalId, updatedGoalName, '0000000000000').then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.err).to.eq('Authorization header required');
            });
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    it('Negative test on updating goal with invalid goal id', () => {
        const updatedGoalName = faker.string.uuid();
        updateGoal('%&&$$*@(@(@(@', updatedGoalName).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.include('Bad request');
        });
    });

    it('Negative test on updating goal with empty body', () => {
        const goalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            updateGoal(goalId).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.err).to.eq('No updates were passed');
            });
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    it('Negative test on deleting goal double times', () => {
        const goalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
                deleteGoal(goalId).then(response => {
                    expect(response.status).to.equal(404);
                    expect(response.body.err).to.eq('Goal Not Found');
                });
            });
        });
    });

    it('Negative test on deleting goal with empty goal id', () => {
        deleteGoal('').then(response => {
            expect(response.status).to.equal(404);
            expect(response.body).to.include('Cannot DELETE /api/v2/goal/');
        });
    });

    it('Negative test on deleting goal with invalid token', () => {
        const goalName = faker.string.uuid();
        createGoal(goalName).then((response) => {
            const goalId = response.body.goal.id;
            expect(response.status).to.equal(200);
            deleteGoalWithInvalidToken(goalId, '*&$*&@)!*!&*#!*)').then(response => {
                expect(response.status).to.equal(400);
                expect(response.body.err).to.include('Unexpected token');
            });
            deleteGoal(goalId).then(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    it('Negative test on creating goal with missing token', () => {
        const nameOfGoal = faker.string.uuid();
        createGoalWithMissingToken(nameOfGoal, '').then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.eq('Authorization header required');
        });
    });

    it('Negative test on creating goal with not existed team id', () => {
        const nameOfGoal = faker.string.uuid();
        createGoalWithInvalidTeamId(nameOfGoal, 11111111111111111111111).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.include('Invalid workspace id');
        });
    });

    it('Negative test on creating goal with empty body', () => {
        createGoal().then((response) => {
            expect(response.status).to.equal(500);
            expect(response.body.err).to.eq('Internal Server Error');
        });
    });

});