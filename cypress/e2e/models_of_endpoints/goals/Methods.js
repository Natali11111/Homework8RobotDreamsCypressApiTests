
export const createGoal = (goalName) => {
    return cy.sendRequest('team/90151253599/goal', 'POST', {name: goalName});
}

export const createGoalWithInvalidTeamId = (goalName, teamId) => {
    return cy.sendRequest('team/' + teamId + '/goal', 'POST', {name: goalName});
}

export const createGoalWithMissingToken = (goalName, token) => {
    return cy.sendRequestWithoutAuthorization('team/90151253599/goal', 'POST', {name: goalName}, token);
}

export const updateGoalWithNotExistedToken = (goalId, updatedGoalName, token) => {
    return cy.sendRequestWithoutAuthorization('goal/' + goalId, 'PUT', {name: updatedGoalName});
}

export const deleteGoalWithInvalidToken = (goalId, token) => {
    return cy.sendRequestWithoutAuthorization('goal/' + goalId, 'DELETE', token);
}

export const getGoalWithoutAuthorization = (goalId, token) => {
    return cy.sendRequestWithoutAuthorization('goal/' + goalId, 'GET', token);
}

export const getGoal = (goalId) => {
    return cy.sendRequest('goal/' + goalId, 'GET');
}

export const updateGoal = (goalId, updatedGoalName) => {
    return cy.sendRequest('goal/' + goalId, 'PUT', {name: updatedGoalName});
}

export const deleteGoal = (goalId) => {
    return cy.sendRequest('goal/' + goalId, 'DELETE');
}

export const getGoals = () => {
    return cy.sendRequest('team/90151253599/goal', 'GET');
}

export const getGoalsWithInvalidTeamId = (teamId) => {
    return cy.sendRequest('team/' + teamId + '/goal', 'GET');
}

export const getGoalsWithoutAuthorization = (token) => {
    return cy.sendRequestWithoutAuthorization('team/90151253599/goal', 'GET', token);
}

